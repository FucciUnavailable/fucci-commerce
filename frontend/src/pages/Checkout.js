import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/cartActions'; // Import clearCart action
import axios from 'axios';
import PayPalButton from '../components/PaypalButton';

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

        // Dispatch the clearCart action to clear the cart after the order is placed
        dispatch(clearCart());
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
    <div className="checkout container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Checkout</h1>

      <div className="cart-summary bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {cart.map((product) => (
            <li key={product._id} className="flex items-center justify-between border-b pb-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              <div className="flex-1 ml-4">
                <p className="font-semibold text-gray-800">{product.name}</p>
                <p className="text-gray-500">${product.price} x {product.quantity}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="total mt-4 text-right">
          <p className="font-semibold text-xl text-gray-900">Total: ${getTotal()}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingDetails.fullName}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={shippingDetails.phone}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingDetails.state}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingDetails.country}
          onChange={handleInputChange}
          className="w-full p-4 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          required
        />

        <button
          type="button"
          className="w-full py-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onClick={handleSaveShipping}
        >
          Save Shipping Information
        </button>

        {modalVisible && (
          <div className="modal bg-gray-900 bg-opacity-50 fixed inset-0 flex items-center justify-center">
            <div className="modal-content bg-white p-8 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold">Your shipping information has been updated!</p>
              <button 
                onClick={() => setModalVisible(false)} 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 text-white bg-green-600 hover:bg-green-700 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 mt-6"
        >
          Complete Purchase (JUST FOR TESTING)
        </button>
      </form>
    </div>

  );
};

export default Checkout;
