// frontend/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo/Home Link */}
      <Link to="/" className="text-xl font-bold">
        MyApp
      </Link>

      {/* Navigation Links */}
      <div className="space-x-4">
      <Link to="/home" className="hover:underline">
              Home
            </Link>
        <Link to="/shop" className="hover:underline">

          Shop
        </Link>
        {user ? (
          <>

            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <LogoutButton />
          </>
        ) : (
          <Link to="/auth" className="hover:underline">
            Login/Signup
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
