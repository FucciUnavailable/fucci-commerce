import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });
  const [loading, setLoading] = useState(true); // State to manage loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the product details for editing
    axios.get(`http://localhost:5000/api/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        setProduct(response.data);
        setLoading(false); // Data is loaded, stop loading
      })
      .catch((error) => {
        console.error('Error fetching product details', error);
        setError('There was an error fetching the product details.');
        setLoading(false); // Stop loading in case of an error
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/products/${id}`, product, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        alert('Product updated successfully!');
        navigate('/admin'); // Redirect back to the admin page
      })
      .catch((error) => {
        console.error('Error updating product', error);
        alert('There was an error updating the product.');
      });
  };

  // Show loading or error message if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>
      <label className="block text-sm font-medium mb-2">Product Name</label>
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        required
      />
      <label className="block text-sm font-medium mb-2">Description</label>
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        required
      />
        <label className="block text-sm font-medium mb-2">Stock</label>
      <input
        type="number"
        name="stock"
        value={product.stock}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        min="0" // Enforce non-negative stock at the HTML level
        required
      />
      <label className="block text-sm font-medium mb-2">Price</label>
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        min="0" // Enforce non-negative stock at the HTML level
        required
      />
      <label className="block text-sm font-medium mb-2">Category</label>
      <input
        type="text"
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
