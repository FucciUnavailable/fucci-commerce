import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send product data as the body and headers as the config object
      const response = await axios.post(
        'http://localhost:5000/api/products/addProduct', 
        product,  // Sending product data as the body
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization header
          },
        }
      );

      console.log('Product added:', response.data);
      alert('Product added successfully!');
      setProduct({ name: '', description: '', price: '', image: '', category: '', stock: '' }); // Clear form
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Add New Product
      </h1>

      {[{ label: 'Product Name', name: 'name', type: 'text' },
        { label: 'Description', name: 'description', type: 'text' },
        { label: 'Price', name: 'price', type: 'number', min: '0' },
        { label: 'Image URL', name: 'image', type: 'text' },
        { label: 'Category', name: 'category', type: 'text' },
        { label: 'Stock', name: 'stock', type: 'number', min: '0' }]
        .map(({ label, name, type, min }, idx) => (
          <div className="mb-4" key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={product[name]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min={min || undefined}
            />
          </div>
        ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white text-lg py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
