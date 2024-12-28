// frontend/src/redux/reducers/cartReducer.js
const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        // Check if the product is already in the cart
        const productIndex = state.cart.findIndex(product => product._id === action.payload._id);
        if (productIndex !== -1) {
          // If the product is already in the cart, increase the quantity
          const updatedCart = [...state.cart];
          updatedCart[productIndex].quantity += 1;
          return {
            ...state,
            cart: updatedCart,
          };
        }
        return {
          ...state,
          cart: [...state.cart, action.payload], // Add the new product to the cart
        };
  
      case 'UPDATE_QUANTITY':
        // Update quantity based on product ID
        const updatedCart = state.cart.map(product =>
          product._id === action.payload.productId
            ? { ...product, quantity: action.payload.quantity }
            : product
        );
        return {
          ...state,
          cart: updatedCart,
        };
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cart: state.cart.filter(product => product._id !== action.payload),
        };
        case 'CLEAR_CART':
            return {
              ...state,
              cart: [], // Clear the cart
            };
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  