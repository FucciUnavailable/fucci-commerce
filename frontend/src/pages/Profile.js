import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import UserData from '../components/UserData';

const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showUserData, setShowUserData] = useState(false);
  
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/orders/history/${user.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
        });
    }
  }, [showHistory, user]);

  const toggleUserData = () => {
    setShowUserData(!showUserData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    // Handle profile edit (e.g., save changes to the backend)
    console.log('Profile updated:', formData);
    setEditMode(false);
  };

  const viewOrderDetails = (orderId) => {
    console.log(`View details for order: ${orderId}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome, {user ? user.name : 'Loading...'}
        </h1>

        {/* Dashboard Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <button
            onClick={toggleUserData}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
          >
            {showUserData ? 'Hide User Data' : 'Show User Data'}
          </button>
          {showUserData && <UserData />}
        </div>

        {/* Profile Edit Section */}
        <div className="mb-6">
          {editMode ? (
            <div className="border p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
              <form onSubmit={handleProfileEdit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="bg-gray-400 text-white px-6 py-2 rounded-md"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>

        {/* Order History Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="bg-blue-500 text-white px-6 py-2 rounded-md"
          >
            {showHistory ? 'Hide History' : 'Show History'}
          </button>

          {showHistory && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              {orders.length === 0 ? (
                <p className="text-gray-700">You have no previous orders.</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-50">
                      <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
                      <p className="text-gray-700">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-700">Total: ${order.total}</p>
                      <p className={`status ${order.status}`}>Status: {order.status}</p>
                      <button
                        onClick={() => viewOrderDetails(order._id)}
                        className="mt-2 text-blue-500"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Dashboard Stats Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="font-semibold">Total Orders</h3>
              <p>{orders.length}</p>
            </div>
            <div className="p-4 bg-blue-100 rounded-lg shadow-md">
              <h3 className="font-semibold">Total Spending</h3>
              <p>${orders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
