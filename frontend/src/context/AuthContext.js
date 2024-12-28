// frontend/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if token is stored in localStorage and automatically log in the user
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Token from localStorage:', token);

      axios.get('http://localhost:5000/api/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser({ ...response.data, token });
      })
      .catch((err) => {
        // Handle token verification failure (e.g., token expired)
        console.error('Error verifying token:', err);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token, userId, name } = response.data;
    localStorage.setItem('token', token);  // Save token in localStorage
    localStorage.setItem('userId', userId);  // Save token in localStorage

    setUser({ userId, token, name });
  };

  const register = async (name, email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
    const { token, userId, name: userName } = response.data;
    localStorage.setItem('token', token);  // Save token in localStorage
    setUser({ userId, token, name: userName });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
