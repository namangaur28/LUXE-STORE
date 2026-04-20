import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-page page-transition empty-state-container">
        <div className="empty-cart glass">
          <FiShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary bg-gradient-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page page-transition">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.id} 
                className="cart-item glass"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Link to={`/products/${item.id}`} className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </Link>
                
                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="cart-item-title">{item.title}</h3>
                  </Link>
                  <p className="cart-item-category">{item.category}</p>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>

                <div className="cart-item-actions">
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}><FiPlus /></button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <FiTrash2 />
                  </button>
                </div>

                <div className="cart-item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <aside className="cart-summary glass">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row">
            <span>Tax (Estimated)</span>
            <span>${(cartTotal * 0.08).toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${(cartTotal * 1.08).toFixed(2)}</span>
          </div>

          <button 
            className="checkout-btn bg-gradient-primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout <FiArrowRight />
          </button>

          <Link to="/products" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
