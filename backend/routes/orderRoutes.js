// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware'); // Authentication middleware

const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const { cart, shippingDetails, total } = req.body;
  const userId = req.user.id; // Use userId from the decoded token

  try {
    const order = new Order({
      userId,
      cart,
      shippingDetails,
      total,
    });

    await order.save();
    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
      orderDetails: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

// GET /api/orders/:id - Get order details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ orderDetails: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});

module.exports = router;
