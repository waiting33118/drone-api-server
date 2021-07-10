import amqp from 'amqplib'
export let connection: amqp.Connection

const {
  RABBITMQ_HOSTNAME,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
  RABBITMQ_PORT = '5672'
} = process.env

export default async () => {
  try {
    connection = await amqp.connect({
      protocol: 'amqp',
      hostname: RABBITMQ_HOSTNAME,
      port: +RABBITMQ_PORT,
      username: RABBITMQ_USERNAME,
      password: RABBITMQ_PASSWORD
    })
    console.log('Connect to Rabbitmq successfully')
  } catch (error) {
    console.log(error)
  }
}
