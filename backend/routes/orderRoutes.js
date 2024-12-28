// backend/routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create an order
router.post('/', async (req, res) => {
  const { products, totalPrice, userId } = req.body;

  const newOrder = new Order({
    products,
    totalPrice,
    userId,
    status: 'Pending',
    createdAt: new Date(),
  });

  try {
    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
