import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/actions/cartActions'; // Import your remove action

const CartIcon = ({ cart, getTotalItems, isCartOpen, setIsCartOpen, cartRef }) => {
  const dispatch = useDispatch();

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId)); // Dispatch the remove action
  };

  return (
    <div className="relative" ref={cartRef}>
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="relative focus:outline-none"
        aria-label="View Cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h18l-2.462 11.319a4 4 0 01-3.929 3.181H8.391a4 4 0 01-3.929-3.181L2 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 22h.01M17 22h.01"
          />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isCartOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-black shadow-lg rounded-lg">
          <div className="p-4">
            <h3 className="font-semibold text-lg">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <div>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover mr-2"
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold">
                      {item.quantity} × ${item.price}
                    </span>
                    <button
                      onClick={() => handleRemoveItem(item._id)} // Remove item when clicked
                        className="bg-red-600 text-white hover:bg-red-700"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <div className="mt-4">
                  <Link
                    to="/cart"
                    className="block text-center bg-blue-600 text-white rounded-lg py-2"
                    onClick={() => setIsCartOpen(false)}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/checkout"
                    className="block text-center bg-green-600 text-white rounded-lg py-2 mt-2"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartIcon;
