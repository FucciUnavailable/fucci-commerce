// frontend/src/pages/Checkout.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // useNavigate for page redirection
import { clearCart } from '../redux/actions/cartActions';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({
      ...shippingDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      cart,
      shippingDetails,
      total: getTotal(),
      userId: "userIdHere", // This should be the logged-in user's ID
    };

    try {
      const response = await fetch('http://127.0.0.1:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assuming token is saved in localStorage
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(clearCart());
        navigate('/OrderConfirmation', { state: { orderId: data.orderId } });
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  };

  const getTotal = () => {
    return cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>

      <div className="cart-summary">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((product) => (
            <li key={product._id} className="cart-item">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover" />
              <p>{product.name}</p>
              <p>${product.price} x {product.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="total">
          <p className="font-semibold">Total: ${getTotal()}</p>
        </div>
      </div>

      <h2 className="mt-6">Shipping Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={shippingDetails.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingDetails.country}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="btn btn-primary mt-4">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
