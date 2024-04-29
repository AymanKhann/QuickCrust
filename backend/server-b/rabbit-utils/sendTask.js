const sendTask = (channel, queue2, orderId, status) => {
  const message = JSON.stringify({ orderId, status });
  channel.sendToQueue(queue2, Buffer.from(message));
  console.log(`Order ID ${orderId} status sent to Queue 2`);
};

module.exports = sendTask;
