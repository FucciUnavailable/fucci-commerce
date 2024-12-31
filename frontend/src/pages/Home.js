import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext to check user state
import { Particles } from 'react-tsparticles'; // Correct import
import { motion } from 'framer-motion'; // Import framer-motion for animations

const Home = () => {
  const { user } = useAuth() || {}; // Safely access `user` from context

  return (
    <div className="home relative">
      {/* Particles Background */}
      <Particles
        options={{
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.5,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 5,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#fff',
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
            },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      
      {/* Main Content */}
      <header className="hero bg-blue-500 text-white p-12 text-center relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our Shop
        </motion.h1>

        {user ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg mb-6">Hello, {user.name}! Ready to shop?</p>
            <Link to="/shop" className="btn btn-primary bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
              Go to Shop
            </Link>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-lg mb-6">Browse through our collection of amazing products!</p>
            <Link to="/shop" className="btn btn-primary bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg">
              Shop Now
            </Link>
            <div className="mt-6">
              <Link to="/auth" className="btn btn-secondary mr-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-lg">
                Auth Here
              </Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Showcase Section */}
      <section className="showcase text-center py-16 bg-gray-100">
        <motion.h2
          className="text-4xl font-semibold mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Here’s what we’ve built!
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <div className="card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Beautiful User Interface</h3>
            <p className="text-gray-600 mb-4">
              We’ve designed a sleek and intuitive interface for a seamless shopping experience.
            </p>
          </div>

          <div className="card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Category Filters</h3>
            <p className="text-gray-600 mb-4">
              Easily find products with advanced filtering options like price range, categories, and availability.
            </p>
          </div>

          <div className="card bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Responsive Design</h3>
            <p className="text-gray-600 mb-4">
              Our site works seamlessly across all devices, from desktop to mobile.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
