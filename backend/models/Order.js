// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalPrice: Number,
  userId: String,
  status: {
    type: String,
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
