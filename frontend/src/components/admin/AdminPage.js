import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetching products from the backend
    axios.get('http://localhost:5000/api/products', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products', error);
      });
  }, []);

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(() => {
          // Update the state to remove the deleted product from the list
          setProducts(products.filter(product => product._id !== productId));
          alert('Product deleted successfully!');
        })
        .catch((error) => {
          console.error('Error deleting product', error);
          alert('There was an error deleting the product.');
        });
    }
  };

  const handleEdit = (productId) => {
    // Redirect to the Edit Product page with the product ID
    navigate(`/edit-product/${productId}`); // Use navigate to redirect
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Panel</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4 text-gray-600 font-medium">Name</th>
                <th className="p-4 text-gray-600 font-medium">Description</th>
                <th className="p-4 text-gray-600 font-medium">Price</th>
                <th className="p-4 text-gray-600 font-medium">Category</th>
                <th className="p-4 text-gray-600 font-medium">Stock</th>
                <th className="p-4 text-gray-600 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="p-4 text-gray-800">{product.name}</td>
                  <td className="p-4 text-gray-800 truncate">{product.description}</td>
                  <td className="p-4 text-gray-800">${product.price}</td>
                  <td className="p-4 text-gray-800">{product.category}</td>
                  <td className="p-4 text-gray-800">{product.stock}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product._id)} // Trigger the handleEdit function
                        className="px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)} // Trigger the handleDelete function
                        className="px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
