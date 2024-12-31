import React, { useState } from 'react';
import AddProduct from '../components/admin/AddProduct';
import AdminPage from '../components/admin/AdminPage';
import RevenueTracker from '../components/admin/RevenueTracker';
import ProductList from '../components/admin/ProductList';
import OrderManager from '../components/admin/OrderManager';

const Admin = () => {
  const [focusedComponent, setFocusedComponent] = useState(null);

  const handleFocus = (component) => setFocusedComponent(component);
  const handleCloseFocus = () => setFocusedComponent(null);

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8 px-6">
        {/* Modal */}
        {focusedComponent && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseFocus}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-2xl transform scale-95 hover:scale-100 transition-all duration-300 ease-in-out max-w-5xl w-[90%] sm:w-[80%] lg:w-[60%] h-[80%] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {focusedComponent}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={handleCloseFocus}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Admin Dashboard Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            onClick={() => handleFocus(<AdminPage />)}
          >
            <h3 className="text-xl font-semibold mb-3">Admin Panel</h3>
            <p className="text-gray-600">Manage overall admin settings and configurations.</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            onClick={() => handleFocus(<AddProduct />)}
          >
            <h3 className="text-xl font-semibold mb-3">Add Product</h3>
            <p className="text-gray-600">Add and manage products in your inventory.</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            onClick={() => handleFocus(<ProductList />)}
          >
            <h3 className="text-xl font-semibold mb-3">Product List</h3>
            <p className="text-gray-600">View and manage your list of products.</p>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition transform hover:scale-105"
            onClick={() => handleFocus(<RevenueTracker />)}
          >
            <h3 className="text-xl font-semibold mb-3">Revenue Tracker</h3>
            <p className="text-gray-600">Track and analyze your store's revenue.</p>
          </div>
        </div>

        {/* Order Manager Section (placed below the 4 main cards) */}
        <div className="mt-8">
          <OrderManager />
        </div>
      </div>
    </>
  );
};

export default Admin;
