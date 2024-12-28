const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const productIndex = state.cart.findIndex(
        (product) => product._id === action.payload._id
      );

      if (productIndex !== -1) {
        // If the product is already in the cart, return a new array with updated quantity
        const updatedCart = state.cart.map((product, index) =>
          index === productIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );

        return {
          ...state,
          cart: updatedCart,
        };
      }

      // Add the new product to the cart
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cart.map((product) =>
        product._id === action.payload.productId
          ? { ...product, quantity: action.payload.quantity }
          : product
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default cartReducer;
