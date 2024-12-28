// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext to check user state

const Home = () => {
  const { user } = useAuth() || {}; // Safely access `user` from context

  return (
    <div className="home">
      <header className="hero bg-blue-500 text-white p-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Shop</h1>
        {user ? (
          <div>
            <p className="text-lg mb-6">Hello, {user.name}! Ready to shop?</p>
            <Link to="/shop" className="btn btn-primary">Go to Shop</Link>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-6">Browse through our collection of amazing products!</p>
            <Link to="/shop" className="btn btn-primary">Shop Now</Link>
            <div className="mt-6">
              <Link to="/auth" className="btn btn-secondary mr-4">Auth Here</Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Home;
