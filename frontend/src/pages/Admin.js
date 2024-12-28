import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/ProductService';
import { useHistory } from 'react-router-dom';



const Admin = () => {
  const history = useHistory();
  
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      history.push('/login');
    }
  }, [history]);
  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
    };
    getProducts();
  }, []);

// Adding functions for update and delete
const handleDelete = (productId) => {
  axios.delete(`http://localhost:5000/api/products/${productId}`)
    .then(response => {
      alert('Product deleted successfully!');
      setProducts(products.filter(product => product._id !== productId));
    })
    .catch(error => {
      console.error('Error deleting product', error);
    });
};

const handleUpdate = (productId) => {
  // Implement the update logic, maybe open a modal or navigate to a form page
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-blue-700 transition-colors duration-300">
        Add Product
      </button>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="flex justify-between items-center border p-4 rounded-lg shadow-lg">
            <div className="flex items-center">
              <img
                src={product.imageUrl || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(product._id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
