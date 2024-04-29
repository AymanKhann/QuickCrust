# Server B

Server B is a part of the Sandwich Order App. It is responsible for receiving sandwich orders from Server A via a message queue (RabbitMQ), simulating sandwich preparation with a fixed delay, and then sending an order ready message back to Server A via a different message queue.

## Table of Contents

- [Functionality](#functionality)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Running Server B](#running-server-b)
- [Directory Structure](#directory-structure)

## Functionality

- **Receive Orders**: Server B consumes sandwich orders from Server A via a RabbitMQ queue (Queue 1).
- **Simulate Preparation**: After receiving an order, Server B simulates sandwich preparation with a fixed delay (7 seconds).
- **Send Order Ready Message**: After the delay, Server B sends an order ready message back to Server A via another RabbitMQ queue (Queue 2).

## Dependencies

- [Node.js](https://nodejs.org/): The runtime environment for Server B.
- [amqplib](https://github.com/amqp-node/amqplib): Library for connecting to RabbitMQ.

## Installation

1. **Change the directory to server-b**:

    ```shell
    cd server-b
    ```

2. **Install dependencies**:

    ```shell
    npm install
    ```

## Running Server B

1. **Ensure RabbitMQ is running**:

    Make sure RabbitMQ is running locally. By default, RabbitMQ listens on `amqp://localhost` and port 5672.

2. **Run the server**:

    ```shell
    npm start
    ```

    Server B will start running and listen for orders from Server A. It will consume orders from Queue 1, simulate preparation, and send order ready messages to Queue 2.


