// Import necessary modules and CORS
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const orderRoutes = require('./orderRoutes');
const rabbitmq = require('./rabbitmq');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const path = require('path');
const swaggerPath = path.resolve(__dirname, 'swagger.yaml');
const swaggerDocument = yaml.load(swaggerPath);

const app = express();
const PORT = 4000;

// Middleware setup
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Swagger API documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define order routes
app.use('/order', orderRoutes);

// Start server
app.listen(PORT, async () => {
    console.log(`Server A running on port ${PORT}`);

    try {
        // Connect to RabbitMQ
        await rabbitmq.connectRabbitMQ();

        // Define a callback function for updating order status
        const updateOrderStatusCallback = async (orderId, status) => {
            try {
                // Call the updateOrderStatus function from orderRoutes
                await orderRoutes.updateOrderStatus(orderId, status);
                console.log(`Order status updated for order ID: ${orderId}`);
            } catch (error) {
                console.error(`Error updating order status for order ID ${orderId}:`, error);
            }
        };

        // Start receiving order status updates from the queue
        rabbitmq.receiveOrderStatusFromQueue(updateOrderStatusCallback);
        console.log('Listening for order status updates from the queue...');
    } catch (error) {
        console.error('Failed to initialize server:', error);
    }
});
