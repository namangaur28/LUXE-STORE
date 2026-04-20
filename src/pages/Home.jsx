import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/product/ProductCard';
import { FiArrowRight, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="home-page page-transition">
      {/* Hero Section */}
      <section className="hero glass">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="hero-title">
            Discover the <span className="text-gradient">Luxe</span> Collection
          </h1>
          <p className="hero-subtitle">
            Premium products curated for your modern lifestyle. Quality meets elegance in every piece.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary bg-gradient-primary">
              Shop Now <FiArrowRight />
            </Link>
            <Link to="/products" className="btn btn-outline">
              View Catalog
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800" 
            alt="Premium Watch" 
            className="hero-img"
          />
          <div className="floating-card glass">
            <FiShield className="icon" />
            <span>Premium Quality</span>
          </div>
        </motion.div>
      </section>

      {/* Features Row */}
      <section className="features-row">
        <div className="feature-item">
          <FiTruck className="feature-icon" />
          <div>
            <h4>Free Shipping</h4>
            <p>On orders over $100</p>
          </div>
        </div>
        <div className="feature-item">
          <FiShield className="feature-icon" />
          <div>
            <h4>Secure Payment</h4>
            <p>100% secure checkout</p>
          </div>
        </div>
        <div className="feature-item">
          <FiRotateCcw className="feature-icon" />
          <div>
            <h4>Easy Returns</h4>
            <p>30-day money back</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="view-all">View All Products <FiArrowRight /></Link>
        </div>

        {loading ? (
          <div className="loader">Loading featured products...</div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
