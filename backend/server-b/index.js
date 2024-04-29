const amqp = require('amqplib');
const receiveTask = require('./rabbit-utils/receiveTask');
const sendTask = require('./rabbit-utils/sendTask');

const RABBITMQ_URL = 'amqp://localhost'; // Adjust as necessary
const QUEUE1 = 'orders_queue';
const QUEUE2 = 'status_queue';
const PREPARATION_DELAY = 7000; // 7 seconds fixed delay

// Connect to RabbitMQ
const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        // Create queues if they don't exist
        await channel.assertQueue(QUEUE1, { durable: true });
        await channel.assertQueue(QUEUE2, { durable: true });

        console.log('Connected to RabbitMQ and queues are ready');

        // Start consuming orders from Queue 1
        receiveTask(channel, QUEUE1, QUEUE2, PREPARATION_DELAY, sendTask);

        console.log('Waiting for orders...');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ or process orders:', error);
    }
};

// Start the server and connect to RabbitMQ
connectRabbitMQ();
