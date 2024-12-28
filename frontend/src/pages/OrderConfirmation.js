// frontend/src/pages/OrderConfirmation.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const orderId = location.state?.orderId;

    if (orderId) {
      fetch(`/api/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setOrder(data.orderDetails))
        .catch((error) => console.error('Error fetching order:', error));
    }
  }, [location.state]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-confirmation">
      <h1>Order Confirmation</h1>
      <h2>Order ID: {order._id}</h2>
      <h3>Shipping Information:</h3>
      <p>{order.shippingDetails.name}</p>
      <p>{order.shippingDetails.address}</p>
      <p>{order.shippingDetails.city}, {order.shippingDetails.postalCode}</p>
      <p>{order.shippingDetails.country}</p>

      <h3>Order Items:</h3>
      <ul>
        {order.cart.map((item) => (
          <li key={item.productId}>
            <img src={item.image} alt={item.name} width={50} />
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>

      <h3>Total: ${order.total}</h3>
    </div>
  );
};

export default OrderConfirmation;
