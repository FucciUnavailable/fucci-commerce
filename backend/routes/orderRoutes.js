// from server file: app.use('/api/orders', orderRoutes);

const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const {getOrdersByUser} = require('../controllers/orderController')
const isAdmin = require('../middleware/isAdmin');


// Fetch all orders TEST FOR ADMIN MIDDLEWARE
router.get('/', isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('cart.productId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
// // POST /api/orders - Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const { cart, shippingDetails, total } = req.body;
  const userId = req.user.userId;  // Accessing the userId from the decoded JWT

  if (!cart || !shippingDetails || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Ensure each item in the cart has a productId
  const validCart = cart.every(item => item.productId);
  if (!validCart) {
    return res.status(400).json({ message: 'Each item in the cart must have a productId' });
  }

  try {
    const order = new Order({
      userId,
      cart,
      shippingDetails,
      total,
    });
    console.log(":order backend",order)

    await order.save();
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        orderId: order._id,
        orderDetails: order,
      },
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later' });
  }
});


// GET /api/orders/:id - Get order details
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized access to this order' });
    }

    res.json({
      success: true,
      data: {
        orderDetails: order,
      },
    });
  } catch (error) {
    console.error('Order retrieval error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later' });
  }
});


// GET /api/orders/history/:id - Get order details
router.get('/history/:id', authMiddleware, getOrdersByUser);
module.exports = router;
