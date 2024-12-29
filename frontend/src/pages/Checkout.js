import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/cartActions';
import axios from 'axios';

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });

  const [modalVisible, setModalVisible] = useState(false);  // For showing the modal

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

  // Handle submit to create an order
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
        dispatch(clearCart()) // Clear the cart
      } else {
        alert('Error placing order');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error placing order');
    }
  };

  const handleSaveShipping = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/updateAddress', 
        { shippingDetails, userId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setModalVisible(true); // Show success modal with message
      } else {
        alert('Failed to update shipping information');
      }
    } catch (error) {
      console.error('Error saving shipping information:', error);
      alert('Failed to update shipping information');
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
          name="fullName"
          placeholder="Full Name"
          value={shippingDetails.fullName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingDetails.phone}
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
          name="state"
          placeholder="State"
          value={shippingDetails.state}
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

        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={handleSaveShipping}  // Save Shipping Information Button
        >
          Save Shipping Information
        </button>

        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <p>Your shipping information has been updated!</p>
              <button onClick={() => setModalVisible(false)}>Close</button>
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-4">Complete Purchase</button>
      </form>
    </div>
  );
};

export default Checkout;
