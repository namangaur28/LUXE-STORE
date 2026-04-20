import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';
import '../../styles/Product.css';

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <motion.div 
      className="product-card glass hover-scale"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="product-image-container">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.title} className="product-image" />
        </Link>
        <button 
          className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
        >
          <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        <div className="category-tag">{product.category}</div>
      </div>

      <div className="product-info">
        <Link to={`/products/${product.id}`}>
          <h3 className="product-title" title={product.title}>{product.title}</h3>
        </Link>
        
        <div className="product-meta">
          <div className="rating">
            <FiStar className="star-icon" />
            <span>{product.rating?.rate || 0}</span>
            <span className="count">({product.rating?.count || 0})</span>
          </div>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>

        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
