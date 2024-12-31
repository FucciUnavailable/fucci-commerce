// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importing AuthContext to check user state
import ParticlesBackground from '../services/ParticlesBackground'; // Importing particles background component
import { motion } from 'framer-motion'; // Importing framer-motion for animations
import { FaShoppingCart, FaSignInAlt, FaUserAlt } from 'react-icons/fa'; // Importing React Icons

const Home = () => {
  const { user } = useAuth() || {}; // Safely access `user` from context

  return (
    <div className="home relative">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Hero Section */}
      <header className="hero bg-blue-500 text-white p-12 text-center relative z-10 rounded-b-3xl shadow-lg">
        <motion.h1
          className="text-5xl font-bold mb-6 leading-tight tracking-wide"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our Shop
        </motion.h1>

        <motion.p
          className="text-lg mb-6 font-light"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Explore our amazing range of products with unbeatable prices.
        </motion.p>

        {user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-lg mb-6">Hello, {user.name}! Ready to shop?</p>
            <Link
              to="/shop"
              className="btn btn-primary bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Go to Shop
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-lg mb-6">Browse through our collection of amazing products!</p>
            <Link
              to="/shop"
              className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg shadow-lg flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              Shop Now
            </Link>
            <div className="mt-6">
              <Link
                to="/auth"
                className="btn btn-secondary mr-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-center"
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Features Section */}
      <section className="features py-16 bg-gray-100 text-center">
        <motion.h2
          className="text-4xl font-semibold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Why Choose Us?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
          <motion.div
            className="feature-card bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaUserAlt className="text-6xl text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Personalized Experience</h3>
            <p className="text-gray-600">
              Tailored shopping experience based on your preferences and needs.
            </p>
          </motion.div>

          <motion.div
            className="feature-card bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaShoppingCart className="text-6xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Fast and Easy Checkout</h3>
            <p className="text-gray-600">
              With multiple payment methods and quick checkout, shopping has never been easier.
            </p>
          </motion.div>

          <motion.div
            className="feature-card bg-white p-6 rounded-lg shadow-xl transform hover:scale-105 transition-all"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FaUserAlt className="text-6xl text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">24/7 Customer Support</h3>
            <p className="text-gray-600">
              Our support team is available round the clock to assist with any issues.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta py-16 bg-blue-500 text-white text-center">
        <motion.h2
          className="text-3xl font-semibold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Ready to take the next step?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Link
            to="/shop"
            className="btn btn-primary bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg shadow-lg"
          >
            Start Shopping Now
          </Link>
        </motion.div>
      </section>

      {/* Footer Section */}
      <footer className="footer bg-gray-900 text-white py-8 text-center">
        <p>&copy; 2024 Fucci Commerce. All Rights Reserved.</p>
        <p className="mt-2">Your favorite place to shop with ease and style!</p>
      </footer>
    </div>
  );
};

export default Home;
