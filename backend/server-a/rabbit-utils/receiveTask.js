const rabbitmq = require('../rabbitmq');

const receiveOrderStatusFromQueue = (updateOrderStatusCallback) => {
    rabbitmq.channel.consume(rabbitmq.QUEUE2, (msg) => {
        if (msg) {
            const { orderId, status } = JSON.parse(msg.content.toString());
            updateOrderStatusCallback(orderId, status);
            rabbitmq.channel.ack(msg);
        }
    });
};

module.exports = receiveOrderStatusFromQueue;
