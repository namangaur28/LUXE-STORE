import React, { useState, useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/product/ProductCard';
import { FiFilter, FiSearch, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Product.css';

const Products = () => {
  const { products, categories, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState(1000);

  const debouncedSearch = useDebounce(searchQuery, 400);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search Filter
    if (debouncedSearch) {
      result = result.filter(p => 
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // Price Filter
    result = result.filter(p => p.price <= priceRange);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        // 'newest' - as proxy using ID descending
        result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, selectedCategory, debouncedSearch, sortBy, priceRange]);

  if (loading) return <div className="container loader-container"><div className="loader"></div></div>;

  return (
    <div className="products-page page-transition">
      <div className="products-header">
        <h1>Explore Products</h1>
        <p>{filteredProducts.length} items found</p>
      </div>

      <div className="category-tabs">
        <button 
          className={`category-tab ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          All Products
        </button>
        {categories.map(cat => (
          <button 
            key={cat}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="products-layout">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar glass">
          <div className="filter-section">
            <h4><FiSearch /> Search</h4>
            <div className="search-input-wrapper">
              <input 
                type="text" 
                placeholder="Find a product..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-section">
            <h4><FiFilter /> Price Range</h4>
            <div className="price-slider">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
              <div className="price-labels">
                <span>$0</span>
                <span>Up to ${priceRange}</span>
              </div>
            </div>
          </div>

          <div className="filter-section">
            <h4><FiChevronDown /> Sort By</h4>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-content">
          {filteredProducts.length === 0 ? (
            <div className="empty-state glass">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search query.</p>
              <button 
                className="btn btn-outline" 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceRange(1000);
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <motion.div layout className="product-grid">
              <AnimatePresence>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
