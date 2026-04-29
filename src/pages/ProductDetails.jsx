import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';
import { FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { products } = useProducts();
  const { addToCart, addToCartWithQty, toggleWishlist, wishlist } = useApp();
  
  const [qty, setQty] = useState(1);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (loading) return <div className="loader-container"><div className="loader"></div></div>;
  if (error || !product) return <div className="error-container">Product not found</div>;

  return (
    <div className="product-details-page page-transition">
      <Link to="/products" className="back-link"><FiChevronLeft /> Back to Products</Link>

      <div className="product-details-container glass">
        <div className="product-gallery">
          <motion.div 
            className="main-image-wrapper"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <img src={product.image} alt={product.title} className="details-img" />
          </motion.div>
        </div>

        <div className="product-content">
          <span className="details-category">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>
          
          <div className="details-meta">
            <div className="details-rating">
              <FiStar className="star-icon" />
              <span>{product.rating?.rate}</span>
              <span className="details-count">({product.rating?.count} reviews)</span>
            </div>
          </div>

          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><FiMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><FiPlus /></button>
            </div>

            <button 
              className="details-add-btn bg-gradient-primary"
              onClick={() => addToCartWithQty(product, qty)}
            >
              <FiShoppingCart /> Add to Cart
            </button>

            <button 
              className={`details-wish-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
            >
              <FiHeart fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-section">
          <h2>Related Products</h2>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
