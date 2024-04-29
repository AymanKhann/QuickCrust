const rabbitmq = require('../rabbitmq');

const sendOrderToQueue = (orderId, order) => {
    const message = JSON.stringify({ orderId, order });
    rabbitmq.channel.sendToQueue(rabbitmq.QUEUE1, Buffer.from(message), { persistent: true });
};

module.exports = sendOrderToQueue;
