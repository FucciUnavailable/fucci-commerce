// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  // Check if the user is authenticated, otherwise navigate to login page
  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
