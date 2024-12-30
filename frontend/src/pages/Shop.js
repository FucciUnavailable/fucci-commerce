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
  const [maxPrice, setMaxPrice] = useState(1000); // Default max price
  const [minProductPrice, setMinProductPrice] = useState(0); // Dynamic min price from products
  const [maxProductPrice, setMaxProductPrice] = useState(1000); // Dynamic max price from products
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [inStockOnly, setInStockOnly] = useState(false); // stock filter
  // Fetch all products and categories
  useEffect(() => {
    // Fetch products
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data); // Assuming `products` is the key in response
        const allPrices = response.data.map(product => product.price);
        setMinProductPrice(Math.min(...allPrices));
        setMaxProductPrice(Math.max(...allPrices));
        setTotalPages(response.data.totalPages || 1);
      })
      .catch(error => console.error('Error fetching products:', error));

    // Fetch categories
    axios.get('http://localhost:5000/api/products/categories')
      .then(response => {
        setCategories(response.data); // Adjust based on the actual response format
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [page]);  // Only depends on page to prevent issues

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
    return <div>Loading...</div>;  // Display loading if the data is not fetched
  }

  return (
    <div className="shop flex">
      {/* Sidebar for Category Filters */}
      <div className="w-64 p-4 bg-gray-100">
        <h2 className="font-semibold text-lg mb-4">Filters</h2>

        {/* Category Filter Dropdown */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Dynamic Price Range Filter */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Price Range</h3>
          <div className="flex justify-between mb-2">
            <span>${minPrice} Minimum</span>
            <span>${maxPrice} Maximum</span>
          </div>
          <input
            type="range"
            min={minProductPrice}
            max={maxProductPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full"
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
        <div className="mb-4">
  <label className="text-sm">In Stock Only</label>
  <input
    type="checkbox"
    checked={inStockOnly}
    onChange={() => setInStockOnly(!inStockOnly)}
  />
</div>

      </div>

      {/* Product List Section */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-semibold mb-6">Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? filteredProducts.map(product => (
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
              {/* Added Buy button */}
              <Link to="/cart">
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4" onClick={() => handleAddToCart(product)}>
                  Buy Now
                </button>
              </Link>
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
