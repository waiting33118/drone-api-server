import { io } from '../server'
import amqp from 'amqplib'
import { Command } from '../types/drone'
import { Socket } from 'socket.io'
import { connection } from '../services/rabbitmq'

export default () => {
  io.on('connection', (socket: Socket) => {
    console.log(new Date().toLocaleString(), 'Websocket connected:', socket.id)
    let channel: amqp.Channel | null = null
    let droneId: string

    socket.on('establish-rabbitmq-connection', async (receiveId: string) => {
      droneId = receiveId
      try {
        channel = await connection.createChannel()
        await channel.assertExchange('drone', 'topic', { durable: false })

        await bindTopicQueue('drone')
        await bindTopicQueue('webrtc')
      } catch (error) {
        console.log(error)
      }

      async function bindTopicQueue(topicName: string) {
        if (channel) {
          const queue = await channel.assertQueue(`${receiveId}-${topicName}`, {
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
          socket.emit('queue-created', queue.queue)
        }
      }
    })

    socket.on('close-rabbitmq-channel', async () => {
      try {
        if (channel) {
          await channel.close()
          channel = null
          console.log(`${socket.id} close rabbitmq channel`)
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
      console.log(
        new Date().toLocaleString(),
        `Websocket disconnected:${socket.id} Reason:${reason}`
      )
      try {
        if (channel) {
          await channel.close()
          console.log(`${socket.id} close rabbitmq channel`)
        }
      } catch (error) {
        console.log(error)
      }
    })
  })
}
