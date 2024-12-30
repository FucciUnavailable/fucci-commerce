// frontend/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser({ ...response.data, token });
      })
      .catch((err) => {
        console.error('Error verifying token:', err);
        localStorage.removeItem('token');
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, userId, name, isAdmin } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      console.log(response.data);

      setUser({ userId, token, name, isAdmin });
    } catch (err) {
      console.error('Login error:', err);
      // Handle login error appropriately
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      const { token, userId, name: userName } = response.data;

      localStorage.setItem('token', token);
      setUser({ userId, token, name: userName });
    } catch (err) {
      console.error('Registration error:', err);
      // Handle registration error appropriately
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
