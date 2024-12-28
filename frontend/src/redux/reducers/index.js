// frontend/src/redux/reducers/index.js

import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
