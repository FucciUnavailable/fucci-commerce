import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();

  // Fetch products and categories
  useEffect(() => {
    // Fetch products
    axios.get('http://localhost:5000/api/products', { params: { page, category: selectedCategory } })
      .then(response => {
        setProducts(response.data);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch(error => console.error('Error fetching products:', error));

    // Fetch categories
    axios.get('http://localhost:5000/api/products/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [page, selectedCategory]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!products || !categories) {
    return <div>Loading...</div>;  // Display loading if the data is not fetched
  }

  return (
    <div className="shop flex">
      {/* Sidebar for Category Filters */}
      <div className="w-64 p-4 bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Categories</h2>
        <ul>
  {categories.length > 0 ? categories.map((category, index) => (
    <li key={category._id || index} className="mb-2">
      <button
        className={`w-full text-left p-2 ${selectedCategory === category.name ? 'bg-blue-500 text-white' : ''}`}
        onClick={() => setSelectedCategory(category.name)}
      >
        {category.name}
      </button>
    </li>
  )) : <li>No categories available</li>}
</ul>

      </div>

      {/* Product List Section */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-6">Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? products.map(product => (
            <div key={product._id} className="product-card border p-4 rounded hover:shadow-lg transition">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
              </Link>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="font-bold mt-2">${product.price}</p>
              <p className="text-sm text-gray-600 mt-2">Stock: {product.stock}</p> {/* Added stock info */}
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          )) : <div>No products available</div>}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
