import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity(productId, quantity));
  };

  const getTotal = () => {
    return cart.reduce((acc, product) => {
      const price = parseFloat(product.price); // Ensure it's a number
      const quantity = parseInt(product.quantity, 10); // Ensure quantity is an integer
      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + price * quantity;
      }
      return acc; // In case of invalid price or quantity, do not add it to the total
    }, 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');  // Navigate to the checkout page
  };

  return (
    <div className="cart">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map(product => (
            <div key={product._id} className="cart-item flex justify-between items-center border-b py-4">
              <div className="flex items-center">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <p>{product.name}</p>
              </div>
              <p className="font-bold">${parseFloat(product.price).toFixed(2)}</p>
              <div className="quantity">
                <button onClick={() => handleUpdateQuantity(product._id, product.quantity - 1)}>-</button>
                <span>{product.quantity}</span>
                <button onClick={() => handleUpdateQuantity(product._id, product.quantity + 1)}>+</button>
              </div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(product._id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="total mt-4">
            <p className="font-semibold">Total: ${getTotal()}</p>
            <button 
              className="btn btn-primary mt-4" 
              onClick={handleProceedToCheckout}  // Call handleProceedToCheckout
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
