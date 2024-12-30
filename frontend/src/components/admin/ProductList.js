import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products:', error);
      });
  }, []);

  return (
<div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {products.map((product) => (
    <div key={product._id} className="product-card p-4 border rounded-lg shadow-md">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-sm">{product.description}</p>
      <p className="text-lg font-semibold">Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Stock: {product.stock}</p>
    </div>
  ))}
</div>

  );
};

export default ProductList;
