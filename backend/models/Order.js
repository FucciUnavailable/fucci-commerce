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
    name: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

