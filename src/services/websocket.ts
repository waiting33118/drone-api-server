import { io, logger } from '../server';
import { Replies } from 'amqplib';
import { Socket } from 'socket.io';
import { channel } from '../services/rabbitmq';
import { Command } from '../types/drone';

const RABBITMQ = {
  EXCHANGE_NAME: 'drone',
  EXCHANGE_TYPE: 'topic',
  QUEUE_TOPICS: ['drone', 'webrtc']
};

export default () => {
  io.on('connection', (socket: Socket) => {
    logger.info(`Websocket connected: ${socket.id}`);
    let droneId: string;
    let queues: Replies.AssertQueue[] = [];
    let consumers: Replies.Consume[] = [];

    socket.on('establish-rabbitmq-connection', async (receiveId: string) => {
      droneId = receiveId;
      try {
        await channel.assertExchange(
          RABBITMQ.EXCHANGE_NAME,
          RABBITMQ.EXCHANGE_TYPE,
          { durable: false }
        );

        await assertTopicQueue();
        await bindTopicQueue();
        await comsumeTopicQueue();

        queues.forEach((queue) => {
          socket.emit('queue-created', queue.queue);
        });
      } catch (error) {
        logger.error(error.message);
      }

      async function assertTopicQueue() {
        for (let topic of RABBITMQ.QUEUE_TOPICS) {
          const queue = await channel.assertQueue(
            `${socket.id}-${receiveId}-${topic}`,
            {
              autoDelete: true,
              durable: false
            }
          );
          queues.push(queue);
        }
      }

      async function bindTopicQueue() {
        for (let i = 0; i < queues.length; i++) {
          await channel.bindQueue(
            queues[i].queue,
            RABBITMQ.EXCHANGE_NAME,
            `${receiveId}.phone.${RABBITMQ.QUEUE_TOPICS[i]}`
          );
        }
      }

      async function comsumeTopicQueue() {
        for (let i = 0; i < queues.length; i++) {
          const consume = await channel.consume(
            queues[i].queue,
            (msg) => {
              if (msg) {
                socket.emit(
                  `${RABBITMQ.QUEUE_TOPICS[i]}-topic`,
                  JSON.parse(msg.content.toString())
                );
              }
            },
            { noAck: true }
          );
          consumers.push(consume);
        }
      }
    });

    socket.on('send-drone', (command: Command) => {
      channel.publish(
        RABBITMQ.EXCHANGE_NAME,
        `${droneId}.web.drone`,
        Buffer.from(JSON.stringify(command))
      );
    });

    socket.on('send-webrtc', (data) => {
      channel.publish(
        RABBITMQ.EXCHANGE_NAME,
        `${droneId}.web.webrtc`,
        Buffer.from(JSON.stringify(data))
      );
    });

    socket.on('cancel-consume', async () => {
      try {
        if (queues.length && consumers.length) {
          await cancelConsuming();
          queues = [];
          consumers = [];
          logger.info(`${socket.id} cancel consume message trigger by event`);
        }
      } catch (error) {
        logger.error(error.message);
      }
    });

    socket.on('disconnect', async (reason) => {
      logger.info(`Websocket disconnected:${socket.id} Reason:${reason}`);
      try {
        if (queues.length && consumers.length) {
          await cancelConsuming();
          queues = [];
          consumers = [];
          logger.info(
            `${socket.id} cancel consume message trigger by disconnection`
          );
        }
      } catch (error) {
        logger.error(error.message);
      }
    });

    async function cancelConsuming() {
      for (let consume of consumers) {
        await channel.cancel(consume.consumerTag);
      }
    }
  });
};
