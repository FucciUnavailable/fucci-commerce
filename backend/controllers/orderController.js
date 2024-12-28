const Order = require('../models/Order');

const createOrder = async (req, res) => {
    const { user, products, totalAmount } = req.body;

    try {
        const order = new Order({ user, products, totalAmount });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createOrder };
