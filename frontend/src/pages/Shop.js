import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); 
  const [minProductPrice, setMinProductPrice] = useState(0);
  const [maxProductPrice, setMaxProductPrice] = useState(1000);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    // Fetch products
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data); 
        const allPrices = response.data.map(product => product.price);
        setMinProductPrice(Math.min(...allPrices));
        setMaxProductPrice(Math.max(...allPrices));
        setTotalPages(response.data.totalPages || 1);
      })
      .catch(error => console.error('Error fetching products:', error));

    // Fetch categories
    axios.get('http://localhost:5000/api/products/categories')
      .then(response => {
        setCategories(response.data); 
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [page]);

  // Filter products based on selected category, price range, and in-stock status
  const filteredProducts = products.filter(product => {
    const withinCategory = selectedCategory ? product.category === selectedCategory : true;
    const withinPrice = product.price >= minPrice && product.price <= maxPrice;
    const inStock = inStockOnly ? product.stock > 0 : true;
    return withinCategory && withinPrice && inStock;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!products || !categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shop flex">
      {/* Sidebar for Category Filters */}
      <div className="w-64 p-6 bg-gray-100 border-r">
        <h2 className="font-semibold text-xl mb-6">Filters</h2>

        {/* Category Filter Dropdown */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Price Range</h3>
          <div className="flex justify-between mb-4">
            <span>${minPrice} Min</span>
            <span>${maxPrice} Max</span>
          </div>
          <input
            type="range"
            min={minProductPrice}
            max={maxProductPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full mb-2"
          />
          <input
            type="range"
            min={minProductPrice}
            max={maxProductPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* In Stock Only Checkbox */}
        <div className="mb-6">
          <label className="text-sm font-medium">In Stock Only</label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
            className="ml-2"
          />
        </div>
      </div>

      {/* Product List Section */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
            <div key={product._id} className="product-card bg-white p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
              <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded-md" />
              </Link>
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <p className="font-bold text-lg mb-4">${product.price}</p>
              <p className="text-sm text-gray-600 mb-4">Stock: {product.stock}</p>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart">
                <button className="bg-green-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-700 transition">
                  Buy Now
                </button>
              </Link>
            </div>
          )) : <div className="col-span-4 text-center">No products available</div>}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 text-gray-600 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 text-gray-600 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
