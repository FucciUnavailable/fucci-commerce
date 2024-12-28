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
      const response = await axios.post('http://localhost:5000/api/products', product);
      console.log('Product added:', response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('There was an error adding the product.');
    }
  };

  return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Product Name</label>
    <input
      type="text"
      name="name"
      value={product.name}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Description</label>
    <input
      type="text"
      name="description"
      value={product.description}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Price</label>
    <input
      type="number"
      name="price"
      value={product.price}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
      min="0"
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Image URL</label>
    <input
      type="text"
      name="image"
      value={product.image}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Category</label>
    <input
      type="text"
      name="category"
      value={product.category}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-sm font-medium mb-2">Stock</label>
    <input
      type="number"
      name="stock"
      value={product.stock}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      required
      min="0"
    />
  </div>

  <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add Product</button>
</form>

  );
};

export default AddProduct;
