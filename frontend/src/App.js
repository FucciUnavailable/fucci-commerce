// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import ProductDetail from './pages/ProductDetail';
import Admin from './pages/Admin';
import EditProduct from './components/admin/EditProduct';

function App() {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        {/* Use PrivateRoute to protect the checkout route */}
        <Route path="/checkout" element={<PrivateRoute element={<Checkout />} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
