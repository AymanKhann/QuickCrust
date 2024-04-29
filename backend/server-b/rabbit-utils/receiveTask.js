const receiveTask = (channel, queue1, queue2, delay, sendTask) => {
  channel.consume(queue1, (msg) => {
      if (msg) {
          const { orderId, order } = JSON.parse(msg.content.toString());
          console.log(`Received order ID ${orderId} from Server A`);

          // Simulate sandwich preparation with a fixed delay
          setTimeout(() => {
              sendTask(channel, queue2, orderId, 'Ready');
              console.log(`Order ID ${orderId} is ready, sent to Queue 2`);
              channel.ack(msg);
          }, delay);
      }
  });
};

module.exports = receiveTask;
