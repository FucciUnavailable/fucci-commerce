// frontend/src/components/LogoutButton.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data and token
    navigate('/'); // Redirect to homepage or login page
  };

  return (
    user ? (
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
      Logout
    </button>
    ) : null
  );
};

export default LogoutButton;
