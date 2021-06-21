import { io } from '../server'
import amqp from 'amqplib'
import { Command } from '../types/drone'
import { Socket } from 'socket.io'
import { ENV_VARIABLE } from '../types'

const {
  RABBITMQ_HOSTNAME,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_PORT = '5672'
}: ENV_VARIABLE = process.env

export default () => {
  io.on('connection', (socket: Socket) => {
    console.log('Websocket connected:', socket.id)
    let connection: amqp.Connection
    let channel: amqp.Channel
    let droneId: string

    socket.on('create-rabbitmq-connection', async (receiveId: string) => {
      droneId = receiveId
      try {
        connection = await amqp.connect({
          protocol: 'amqp',
          hostname: RABBITMQ_HOSTNAME,
          port: +RABBITMQ_PORT,
          username: RABBITMQ_USERNAME,
          password: RABBITMQ_PASSWORD
        })
        channel = await connection.createChannel()
        await channel.assertExchange('drone', 'topic', { durable: false })

        await bindTopicQueue('drone')
        await bindTopicQueue('webrtc')

        socket.emit('rabbitmq-queue-isReady')
      } catch (error) {
        console.log(error)
      }

      async function bindTopicQueue(topicName: string) {
        const queue = await channel.assertQueue('', { exclusive: true })
        await channel.bindQueue(
          queue.queue,
          'drone',
          `${droneId}.phone.${topicName}`
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
    })

    socket.on('send-drone', (command: Command) => {
      channel.publish(
        'drone',
        `${droneId}.web.drone`,
        Buffer.from(JSON.stringify(command))
      )
    })

    socket.on('send-webrtc', (data) => {
      channel.publish(
        'drone',
        `${droneId}.web.webrtc`,
        Buffer.from(JSON.stringify(data))
      )
    })

    socket.on('disconnect', async () => {
      console.log('Websocket disconnected:', socket.id)
      if (connection) await connection.close()
    })
  })
}
