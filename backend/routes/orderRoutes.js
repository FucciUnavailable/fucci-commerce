const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const router = express.Router();

// Fetch all orders with filters (status, price, user)
router.get('/', isAdmin, async (req, res) => {
  try {
    const { status, minPrice, maxPrice, userId } = req.query;

    let query = {};

    if (status) {
      query.status = status;
    }

    if (minPrice && maxPrice) {
      query.total = { $gte: minPrice, $lte: maxPrice };
    }

    if (userId) {
      query.userId = userId;
    }

    const orders = await Order.find(query).populate('userId', 'name email').populate('cart.productId', 'name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// Create a new order
router.post('/', authMiddleware, async (req, res) => {
  const { cart, shippingDetails, total } = req.body;
  const userId = req.user.userId;  // Accessing the userId from the decoded JWT

  if (!cart || !shippingDetails || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

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

// Update the order status (only accessible by admin)
router.patch('/:id', isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    console.error('Order update error:', error);
    res.status(500).json({ success: false, message: 'Server error, please try again later' });
  }
});

// Fetch a specific order by its ID
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

// Fetch order history for a specific user
router.get('/history/:id', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    
    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json(orders);
  } catch (error) {
    console.error('Order history error:', error);
    res.status(500).json({ message: 'Error fetching order history' });
  }
});

module.exports = router;
