import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';
import { FiHeart } from 'react-icons/fi';
import '../styles/Product.css'; // Reuse product grid styles

const Wishlist = () => {
  const { wishlist } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page page-transition empty-state-container">
        <div className="empty-cart glass">
          <FiHeart className="empty-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Save your favorite items to view them later.</p>
          <Link to="/products" className="btn btn-primary bg-gradient-primary">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page page-transition">
      <h1 className="page-title">My Wishlist</h1>
      <div className="product-grid">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
