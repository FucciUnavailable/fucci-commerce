// frontend/components/UserData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/getUserData', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUserData(response.data);  // Save fetched user data
        setLoading(false);            // Set loading to false
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();  // Fetch user data when the component is mounted
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Name:</strong> {userData?.name}</p>
      <p><strong>Email:</strong> {userData?.email}</p>
      <p><strong>Shipping Address:</strong> {userData?.shipping?.address}</p>
      <p><strong>City:</strong> {userData?.shipping?.city}</p>
      <p><strong>State:</strong> {userData?.shipping?.state}</p>
      <p><strong>Postal Code:</strong> {userData?.shipping?.postalCode}</p>
      <p><strong>Country:</strong> {userData?.shipping?.country}</p>
    </div>
  );
};

export default UserData;
