import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiMoon, FiSun, FiUser, FiLogOut } from 'react-icons/fi';
import { useApp } from '../../context/AppContext';
import '../../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, wishlist, theme, toggleTheme, user, logout } = useApp();
  const navigate = useNavigate();

  return (
    <nav className="navbar glass">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <span className="logo-icon text-gradient">◈</span>
          <span className="logo-text">LuxeStore</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {user && <Link to="/orders" className="nav-link">Orders</Link>}
        </div>

        <div className="nav-actions">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              onClick={() => navigate('/products')}
              className="search-input"
            />
          </div>

          <button aria-label="Toggle theme" className="action-btn" onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          <Link to="/wishlist" className="action-btn" aria-label="Wishlist">
            <FiHeart />
            {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="action-btn cart-btn" aria-label="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          {user ? (
            <button aria-label="Logout" className="action-btn" onClick={logout}>
              <FiLogOut />
            </button>
          ) : (
            <Link to="/login" className="action-btn" aria-label="Login">
              <FiUser />
            </Link>
          )}

          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu glass">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
          {user && <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Orders</Link>}
          {user ? (
            <button onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</button>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
