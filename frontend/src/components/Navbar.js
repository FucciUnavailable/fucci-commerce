import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';
import CartIcon from './CartIcon'; // Import the CartIcon component

const Navbar = () => {
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartRef = useRef(null); // Create a ref for the cart dropdown

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  // Close the cart if the click is outside the cart area
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo/Home Link */}
      <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-all duration-200">
        Fucci-Shop
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 w-full bg-blue-600 md:static md:flex md:space-x-6 md:items-center`}
      >
        <Link
          to="/"
          className="block py-2 px-4 hover:text-blue-200 transition-all duration-200"
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="block py-2 px-4 hover:text-blue-200 transition-all duration-200"
        >
          Shop
        </Link>
        {user ? (
          <>
            <Link
              to="/profile"
              className="block py-2 px-4 hover:text-blue-200 transition-all duration-200"
            >
              Profile
            </Link>
            <div className="block py-2 px-4">
              <LogoutButton />
            </div>
          </>
        ) : (
          <Link
            to="/auth"
            className="block py-2 px-4 hover:text-blue-200 transition-all duration-200"
          >
            Login/Signup
          </Link>
        )}
      </div>

      {/* Admin Link */}
      {user?.isAdmin && (
        <div className="hidden md:block ml-6">
          <Link
            to="/admin"
            className="text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Admin Dashboard
          </Link>
        </div>
      )}

      {/* Cart Icon */}
      <div className="flex items-center space-x-4 ml-4">
        <CartIcon
          cart={cart}
          getTotalItems={getTotalItems}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          cartRef={cartRef} // Pass the ref to CartIcon
        />
      </div>
    </nav>
  );
};

export default Navbar;
