import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import UserData from '../components/UserData';


const Profile = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State to control showing order history
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/orders/history/${user.userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((res) => {
          setOrders(res.data.orders);
        })
        .catch((err) => {
          console.error('Error fetching orders:', err);
        });
    }
  }, [showHistory, user]);
 
    const [showUserData, setShowUserData] = useState(false);
  
    const toggleUserData = () => {
      setShowUserData(!showUserData);
    };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleProfileEdit = async()=>{}
  // const handleProfileEdit= async () => {
  //   try {
  //     const response = await axios.post(
  //       'http://localhost:5000/api/user/updateAddress', 
  //       { shippingDetails, userId },
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       setModalVisible(true); // Show success modal with message
  //     } else {
  //       alert('Failed to update shipping information');
  //     }
  //   } catch (error) {
  //     console.error('Error saving shipping information:', error);
  //     alert('Failed to update shipping information');
  //   }
  // };

  const viewOrderDetails = (orderId) => {
    // Navigate to a detailed order page or show a modal with the order details
    console.log(`View details for order: ${orderId}`);
  };
  //user data
  
  return (
    <div className="profile-page">
      <h1>Welcome, {user ? user.name : 'Loading...'}</h1>
      <div>
      <h1>Dashboard</h1>

      <button onClick={toggleUserData}>
        {showUserData ? 'Hide User Data' : 'Show User Data'}
      </button>

      {showUserData && <UserData />}  {/* Conditionally render the UserData component */}
    </div>

      {/* Profile Edit Section */}
      <div className="profile-edit">
        {editMode ? (
          <div className="form-container">
            <h3>Edit Profile</h3>
            <form onSubmit={handleProfileEdit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="button-group">
                <button type="submit" className="primary-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-view">
            <button onClick={() => setEditMode(true)} className="primary-btn">
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Show History Button */}
      <div className="show-history">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="primary-btn"
        >
          {showHistory ? 'Hide History' : 'Show History'}
        </button>
      </div>

      {/* Order History Section */}
      {showHistory && (
        <div className="order-history">
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <p>You have no previous orders.</p>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <h3>Order ID: {order._id}</h3>
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Total: ${order.total}</p>
                  <p>
                    Status: <span className={`status ${order.status}`}>{order.status}</span>
                  </p>
                  <button onClick={() => viewOrderDetails(order._id)}>View Details</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Dashboard Stats Section */}
      <div className="dashboard">
        <h2>Your Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>{orders.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Spending</h3>
            <p>
              ${orders.reduce((acc, order) => acc + order.total, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Profile;
