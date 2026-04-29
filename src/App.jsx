import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Login from './pages/Login';

import './styles/global.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <ErrorBoundary>
          <div className="app">
            <Navbar />
            <main className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={3000} />
          </div>
        </ErrorBoundary>
      </AppProvider>
    </Router>
  );
}

export default App;
