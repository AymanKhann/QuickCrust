## Getting Started

To set up the frontend locally, follow these steps:

1. **Change directory to the frontend**:
    ```shell
    cd frontend
    ```

2. **Install dependencies**:
    ```shell
    npm install
    ```

3. **Run the app**:
    ```shell
    npm start
    ```

    The app will start running on [http://localhost:3000](http://localhost:3000).

## Features

- Place sandwich orders using an intuitive form.
- Check the status of existing orders.
- Clean and aesthetic UI using Material UI.

## Dependencies

- [React](https://reactjs.org/)
- [Material UI](https://mui.com/)
- [@emotion/react and @emotion/styled](https://emotion.sh/docs/introduction)

## Customization

### Theme

The app uses a custom theme defined in the `theme.js` file. You can customize the theme by adjusting the primary and secondary colors, background color, and typography.

### Background Image

The app uses a background image for the entire app. You can change the image by replacing the file in the `src` directory and updating the path in the `App.js` file.

## Backend Setup

The app communicates with a backend server for handling orders and status queries. Ensure your backend server is running and accessible at the provided endpoints:

- **POST** `/api/orders`: Submit a new order.
- **GET** `/api/orders/:orderId`: Query the status of an order.

## User Interface

![Alt text](./userinterface.jpg)


