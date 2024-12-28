import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // useNavigate for page redirection
import { clearCart } from '../redux/actions/cartActions';
import axios from 'axios';
import PayPalButton from '../components/PaypalButton.js';  // Import the PayPal button component

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

  const userId = localStorage.getItem('userId');

  // Mapped cart for better data structure to send to backend
  const mappedCart = cart.map(item => ({
    productId: item._id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      cart: mappedCart,
      shippingDetails,
      total: getTotal(),
      user: userId, // User's ID
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201) {
        // After the shipping info is saved, show the PayPal button
        navigate('/order-confirmation', { state: { orderId: response.data.data.orderId } });
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

  // Handle PayPal payment success
  const handlePaymentSuccess = () => {
    dispatch(clearCart());
    navigate('/order-confirmation');
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
        <PayPalButton totalPrice={getTotal()} onPaymentSuccess={handlePaymentSuccess} />
      </form>
    </div>
  );
};

export default Checkout;
