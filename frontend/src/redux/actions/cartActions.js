// src/redux/actions/cartActions.js

export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: {
        ...product, // Spread the product properties
        quantity: 1, // Set initial quantity to 1
      },
    };
  };
  
  export const removeFromCart = (productId) => {
    return {
      type: 'REMOVE_FROM_CART',
      payload: productId,
    };
  };
  
  export const updateQuantity = (productId, quantity) => {
    return {
      type: 'UPDATE_QUANTITY',
      payload: {
        productId,
        quantity,
      },
    };
  };

  export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };