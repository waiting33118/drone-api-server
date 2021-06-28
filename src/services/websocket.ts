import { io } from '../server'
import amqp from 'amqplib'
import { Command } from '../types/drone'
import { Socket } from 'socket.io'
import { connection } from '../services/rabbitmq'

export default () => {
  io.on('connection', (socket: Socket) => {
    console.log('Websocket connected:', socket.id)
    let channel: amqp.Channel | undefined
    let droneId: string

    socket.on('create-rabbitmq-connection', async (receiveId: string) => {
      droneId = receiveId
      try {
        channel = await connection.createChannel()
        await channel.assertExchange('drone', 'topic', { durable: false })

        await bindTopicQueue('drone')
        await bindTopicQueue('webrtc')

        socket.emit('rabbitmq-queue-isReady')
      } catch (error) {
        console.log(error)
      }

      async function bindTopicQueue(topicName: string) {
        if (channel) {
          const queue = await channel.assertQueue('', {
            exclusive: true,
            autoDelete: true
          })
          await channel.bindQueue(
            queue.queue,
            'drone',
            `${receiveId}.phone.${topicName}`
          )
          await channel.consume(
            queue.queue,
            (msg) => {
              if (msg) {
                socket.emit(
                  `${topicName}-topic`,
                  JSON.parse(msg.content.toString())
                )
              }
            },
            { noAck: true }
          )
        }
      }
    })

    socket.on('close-rabbitmq-channel', async () => {
      try {
        if (channel) {
          await channel.close()
          channel = undefined
        }
      } catch (error) {
        console.log(error)
      }
    })

    socket.on('send-drone', (command: Command) => {
      if (channel) {
        channel.publish(
          'drone',
          `${droneId}.web.drone`,
          Buffer.from(JSON.stringify(command))
        )
      }
    })

    socket.on('send-webrtc', (data) => {
      if (channel) {
        channel.publish(
          'drone',
          `${droneId}.web.webrtc`,
          Buffer.from(JSON.stringify(data))
        )
      }
    })

    socket.on('disconnect', async (reason) => {
      console.log(`Websocket disconnected:${socket.id} Reason:${reason}`)
      try {
        if (channel) {
          await channel.close()
        }
      } catch (error) {
        console.log(error)
      }
    })
  })
}
