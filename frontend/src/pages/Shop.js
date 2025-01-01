import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import HideFilterButton from "../components/HideFilter"; // Import the button

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minProductPrice, setMinProductPrice] = useState(0);
  const [maxProductPrice, setMaxProductPrice] = useState(1000);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch();
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(true); // State to toggle the filter section

  useEffect(() => {
    // Fetch products
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        const allPrices = response.data.map((product) => product.price);
        setMinProductPrice(Math.min(...allPrices));
        setMaxProductPrice(Math.max(...allPrices));
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch categories
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [page]);

  const filteredProducts = products.filter((product) => {
    const withinCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const withinPrice =
      product.price >= minPrice && product.price <= maxPrice;
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
    <div className="shop flex min-h-screen">
      {/* Sidebar */}
      <aside className={`w-64 p-6 bg-gray-50 shadow-lg ${showFilters ? "" : "hidden"}`}>
        <h2 className="font-bold text-xl mb-6">Filters</h2>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Category</h3>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Price Range</h3>
          <div className="flex justify-between text-sm mb-4">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
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

        <div className="mb-6">
          <label className="text-sm font-medium">In Stock Only</label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={() => setInStockOnly(!inStockOnly)}
            className="ml-2"
          />
        </div>
      </aside>

      {/* Button to toggle filter visibility */}
      <div className="fixed top-28 left-0 z-10">
        <HideFilterButton onClick={() => setShowFilters(!showFilters)} />
      </div>

      {/* Product List */}
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <Link to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                </Link>
                <h2 className="font-bold text-lg mt-4">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                <button
                  className={`w-full mt-4 p-2 rounded-md ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                  disabled={product.stock === 0}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <Link to="/cart">
                  <button
                    className={`w-full mt-2 p-2 rounded-md ${
                      product.stock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center">No products available</div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Shop;
