const orders = {};
const length = 10; // Define length of the ID

// Function to generate a unique order ID
const generateOrderId = () => {
    const randomString = Math.random().toString().slice(2); // Simplified random string
    return randomString.slice(0, length);
};

// Function to add an order
const addOrder = async (order) => {
    const orderId = generateOrderId();
    orders[orderId] = { order, status: 'Pending' };
    return orderId;
};

// Function to retrieve the status of an order
const getOrderStatus = async (orderId) => {
    const order = orders[orderId];
    if (order) {
        return order.status;
    } else {
        return 'Order with ID ${orderId} not found';
    }
};

// Function to update the status of an order
const updateOrderStatus = async (orderId, status) => {
    const order = orders[orderId];
    if (order) {
        order.status = status;
    } else {
        return 'Order with ID ${orderId} not found';
    }
};

module.exports = {
    addOrder,
    getOrderStatus,
    updateOrderStatus,
};
