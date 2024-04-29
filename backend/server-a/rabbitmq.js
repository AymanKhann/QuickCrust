const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost'; // Update with correct RabbitMQ URL and port if needed
const QUEUE1 = 'orders_queue';
const QUEUE2 = 'status_queue';

let channel = null;
let connection = null;

// Connect to RabbitMQ
const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        // Create queues if they don't exist
        await channel.assertQueue(QUEUE1, { durable: true });
        await channel.assertQueue(QUEUE2, { durable: true });

        console.log('Connected to RabbitMQ and queues are ready');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
    }
};

// Send orders to Queue 1
const sendOrderToQueue = async (orderId, order) => {
    if (!channel) {
        console.error('RabbitMQ channel is not available');
        return;
    }

    try {
        const orderMessage = JSON.stringify({ orderId, order });
        channel.sendToQueue(QUEUE1, Buffer.from(orderMessage), { persistent: true });
        console.log(`Order ID ${orderId} sent to Queue 1`);
    } catch (error) {
        console.error('Failed to send order to Queue 1:', error);
    }
};

// Receive messages from Queue 2 and update order status
const receiveOrderStatusFromQueue = (updateOrderStatusCallback) => {
    if (!channel) {
        console.error('RabbitMQ channel is not available');
        return;
    }

    try {
        channel.consume(QUEUE2, (msg) => {
            if (msg) {
                const { orderId, status } = JSON.parse(msg.content.toString());
                updateOrderStatusCallback(orderId, status);
                channel.ack(msg);
                console.log(`Order ID ${orderId} status updated to '${status}'`);
            }
        });
    } catch (error) {
        console.error('Failed to receive order status from Queue 2:', error);
    }
};

module.exports = {
    connectRabbitMQ,
    sendOrderToQueue,
    receiveOrderStatusFromQueue,
};
