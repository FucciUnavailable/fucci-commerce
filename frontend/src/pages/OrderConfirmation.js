import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const orderId = location.state?.orderId;
    if (orderId) {
      axios
        .get(`http://localhost:5000/api/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .then((response) => {
          setOrder(response.data.data.orderDetails);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
        });
    }
  }, [location.state]);

  if (!order) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-semibold text-gray-900">Order Confirmation</h1>
        <p className="text-lg text-gray-600 mt-2">Thank you for your order! We’ve received it and will process it shortly.</p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Order ID: {order._id}</h2>
          <p className="text-xl text-gray-500">Total: ${order.total}</p>
        </div>

        {/* Shipping Details */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Shipping Information</h3>
          <div className="mt-2 text-gray-600">
            <p>{order.shippingDetails.name}</p>
            <p>{order.shippingDetails.address}</p>
            <p>{order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
            <p>{order.shippingDetails.country}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Order Items</h3>
          <ul className="space-y-4 mt-4">
            {order.cart.map((item) => (
              <li key={item.productId} className="flex items-center space-x-4">
                <img
                  src={item.image || 'path/to/placeholder-image.jpg'}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <p className="text-gray-600">${item.price} x {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Date */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Order Date:</h3>
          <p className="text-gray-600">{new Date(order.createdAt).toLocaleString()}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            to="/shop"
            className="text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-6 py-3 text-lg font-semibold"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-lg px-6 py-3 text-lg font-semibold"
          >
            Track Your Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
