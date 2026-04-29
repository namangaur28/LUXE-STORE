import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import '../../styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-content">
      <div className="footer-brand">
        <span className="text-gradient">◈</span>
        <span>LuxeStore</span>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
      </div>
      <p className="footer-copy">
        © 2026 LuxeStore. Made with <FiHeart className="heart-icon" /> by Naman Gaur
      </p>
    </div>
  </footer>
);

export default Footer;
