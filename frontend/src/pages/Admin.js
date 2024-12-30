import React, { useState } from 'react';
import AddProduct from '../components/admin/AddProduct';
import AdminPage from '../components/admin/AdminPage';
import OrderTracker from '../components/admin/OrderTracker';
import ProductList from '../components/admin/ProductList';

const Admin = () => {
  const [focusedComponent, setFocusedComponent] = useState(null);

  const handleFocus = (component) => setFocusedComponent(component);
  const handleCloseFocus = () => setFocusedComponent(null);

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      {focusedComponent && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseFocus}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-2xl transform scale-95 hover:scale-100 transition-all duration-300 ease-in-out max-w-5xl w-[80%] h-[80%] overflow-auto"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => handleFocus(<AdminPage />)}
        >
          <h3 className="text-lg font-bold mb-2">Admin Panel</h3>
        </div>
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => handleFocus(<AddProduct />)}
        >
          <h3 className="text-lg font-bold mb-2">Add Product</h3>
        </div>
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => handleFocus(<ProductList />)}
        >
          <h3 className="text-lg font-bold mb-2">Product List</h3>
        </div>
        <div
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
          onClick={() => handleFocus(<OrderTracker />)}
        >
          <h3 className="text-lg font-bold mb-2">Order Tracker</h3>
        </div>
      </div>
    </div>
  );
};

export default Admin;
