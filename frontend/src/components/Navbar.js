import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user } = useAuth();
  const cart = useSelector((state) => state.cart.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo/Home Link */}
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      {/* Hamburger Menu Button */}
      <button
        className="md:hidden text-white"
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
        } absolute top-16 left-0 w-full bg-blue-600 md:static md:flex md:space-x-4 md:items-center`}
      >
        <Link to="/home" className="block py-2 px-4 hover:underline">
          Home
        </Link>
        <Link to="/shop" className="block py-2 px-4 hover:underline">
          Shop
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="block py-2 px-4 hover:underline">
              Profile
            </Link>
            <div className="block py-2 px-4">
              <LogoutButton />
            </div>
          </>
        ) : (
          <Link to="/auth" className="block py-2 px-4 hover:underline">
            Login/Signup
          </Link>
        )}
      </div>
                {user?.isAdmin && (
          <li><Link to="/admin">Admin Dashboard</Link></li>
        )}
      {/* Cart Icon */}
      <div className="relative">
        <button
          onClick={toggleCart}
          className="relative focus:outline-none"
          aria-label="View Cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18l-2.462 11.319a4 4 0 01-3.929 3.181H8.391a4 4 0 01-3.929-3.181L2 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 22h.01M17 22h.01"
            />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
              {getTotalItems()}
            </span>
          )}
        </button>

        {/* Cart Dropdown */}
        {isCartOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg">
            <div className="p-4">
              <h3 className="font-semibold text-lg">Your Cart</h3>
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div>
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between py-2 border-b"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover mr-2"
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold">
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  ))}
                  <div className="mt-4">
                    <Link
                      to="/cart"
                      className="block text-center bg-blue-600 text-white rounded-lg py-2"
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      className="block text-center bg-green-600 text-white rounded-lg py-2 mt-2"
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
