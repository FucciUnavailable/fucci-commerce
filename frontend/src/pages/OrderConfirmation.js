// frontend/src/pages/OrderConfirmation.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions/cartActions';

const OrderConfirmation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear the cart when the order confirmation page is loaded
    dispatch(clearCart());
  }, [dispatch]);

  const orderId = "12345"; // Replace with the actual order ID

  return (
    <div className="order-confirmation">
      <h1 className="text-3xl font-semibold mb-6">Thank you for your order!</h1>
      <p>Your order has been successfully placed. Your order number is <strong>{orderId}</strong>.</p>
      <p>We will send a confirmation email shortly with the details of your order.</p>
      <Link to="/" className="btn btn-primary mt-4">Back to Shop</Link>
    </div>
  );
};

export default OrderConfirmation;
