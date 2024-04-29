const express = require('express');
const router = express.Router();
const orderService = require('./orderService');
const rabbitUtils = require('./rabbitmq');

// POST /order: Adds a new sandwich order and publishes it to Queue 1 (RabbitMQ)
router.post('', async (req, res) => {
    try {
        const order = req.body;
        const orderId = await orderService.addOrder(order);
        rabbitUtils.sendOrderToQueue(orderId, order);
        res.status(201).json({ orderId });
    } catch (error) {
        console.error('Failed to add order:', error);
        res.status(500).json({ error: 'Failed to add order' });
    }
});

// GET /order/:orderId: Retrieves the status of an order
router.get('/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const status = await orderService.getOrderStatus(orderId);
        res.status(200).json({ status });
    } catch (error) {
        console.error('Failed to fetch order status:', error);
        res.status(500).json({ error: 'Failed to fetch order status' });
    }
});

module.exports = router;
