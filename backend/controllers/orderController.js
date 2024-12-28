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

// Fetch all orders for a specific user
const getOrdersByUser = async (req, res) => {
    try {
      const userId = req.params.id; // Get userId from the route params
      // Find all orders for the given userId
     
      const orders = await Order.find({ userId }).populate('cart.productId'); // Populate product details if needed
        console.log("orders:", orders)
      if (orders.length === 0) {
        return res.status(404).json({ success: false, message: 'No orders found' });
      }
  
      res.json({ success: true, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
module.exports = { createOrder, getOrdersByUser };
