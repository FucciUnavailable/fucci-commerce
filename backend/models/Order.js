// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  cart: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Ensures that productId is present for each item
      ref: 'Product', // Assuming you have a Product model to reference
    },
    name: String,
    description: String,
    price: Number,
    quantity: Number,
  }],
  shippingDetails: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

