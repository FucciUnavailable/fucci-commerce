import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();  // Get the product ID from URL params
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    setLoading(true);  // Start loading when useEffect runs
    setError(null);  // Reset error state

    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);  // Stop loading when data is fetched
      })
      .catch(error => {
        setError('Error fetching product details');
        setLoading(false);  // Stop loading even on error
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;  // Display loading message while fetching data
  if (error) return <div>{error}</div>;  // Display error message if there's an issue fetching the product

  return (
    <div className="product-detail p-6">
      <div className="flex">
        <img src={product.image} alt={product.name} className="w-64 h-64 object-cover mr-8" />
        <div className="product-info">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="font-bold text-lg mt-4">${product.price}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl">Product Details</h3>
        <p>{product.details}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
