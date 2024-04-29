# Server A

Server A is a part of the Sandwich Order App. It serves as the main server responsible for managing sandwich orders and communicating with Server B using RabbitMQ for message brokering. Server A handles incoming orders from the frontend and queries order status.

## Table of Contents

- [Dependencies](#dependencies)
- [Installation and Setup](#installation-and-setup)
- [Running Server A](#running-server-a)
- [RabbitMQ Integration](#rabbitmq-integration)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Order Persistence](#order-persistence)
- [Directory Structure](#directory-structure)

## Dependencies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) (for building the server)
- [body-parser](https://github.com/expressjs/body-parser) (for parsing JSON request bodies)
- [amqplib](https://github.com/amqp-node/amqplib) (for RabbitMQ integration)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) (for serving Swagger API documentation)
- [yamljs](https://github.com/jeremyfa/yaml.js) (for loading the Swagger API definition)
- [swagger.yaml](https://app.swaggerhub.com/apis/minimalistIndustries/make-me-a-sandwich/1.1.0) (API definition file)
- Docker (for building and running Server A in a container)

## Installation and Setup

1. Change the directory to backend/server-a:

    ```shell
    git clone https://github.com/your-repo/server-a.git
    cd server-a
    ```

2. Install dependencies:

    ```shell
    npm install
    ```

3. Ensure you have RabbitMQ running locally. If you want to use Docker for RabbitMQ, add it to a `docker-compose.yml` file in the project root.

## Running Server A

1. Run the server:

    ```shell
    npm start
    ```

    Server A will start running on port `4000` by default.

## RabbitMQ Integration

- **Connection**: Server A connects to RabbitMQ to interact with Queue 1 (orders to Server B) and Queue 2 (order status updates from Server B).
- **Queue 1**: When a new order is added, Server A publishes the order to Queue 1 for processing by Server B.
- **Queue 2**: Server A listens to Queue 2 for order status updates from Server B and updates order statuses accordingly.

## API Endpoints

- **POST /order**: Adds a new sandwich order.
    - Request: JSON object with sandwich order details.
    - Response: JSON object with order ID.
- **GET /order/:orderId**: Retrieves the status of an order.
    - Request: Order ID in the URL path.
    - Response: JSON object with order status.

## API Documentation

- Access Swagger API documentation at `/api-docs` when the server is running.
- Provides a user-friendly interface for exploring and understanding the API structure.

## Order Persistence

- **In-memory data store**: Server A uses an in-memory JavaScript object to persist orders and their statuses during the server's runtime.
- Functions for adding, retrieving, and updating orders are defined in `orderService.js`.


