import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiCheckCircle, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '../styles/Checkout.css';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zipCode: yup.string().required('Zip code is required'),
  cardNumber: yup.string().matches(/^[0-9]{16}$/, 'Card number must be 16 digits').required('Card number is required'),
});

const Checkout = () => {
  const { cart, cartTotal, placeOrder } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    const order = placeOrder(data);
    setOrderId(order.id);
    setIsOrdered(true);
  };

  if (isOrdered) {
    return (
      <div className="checkout-page page-transition success-container">
        <motion.div 
          className="success-card glass"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <FiCheckCircle className="success-icon" />
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your order ID is #{orderId}</p>
          <p>We'll send a confirmation email shortly.</p>
          <button className="btn btn-primary bg-gradient-primary" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-page empty-state-container">
        <div className="empty-cart glass">
          <FiShoppingBag className="empty-icon" />
          <h2>Your cart is empty</h2>
          <Link to="/products" className="btn btn-primary bg-gradient-primary">Go to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page page-transition">
      <h1 className="page-title">Checkout</h1>
      
      <div className="checkout-layout">
        <div className="checkout-form-container">
          <form className="checkout-form glass" onSubmit={handleSubmit(onSubmit)}>
            <h3>Shipping Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name</label>
                <input {...register('fullName')} className={errors.fullName ? 'error' : ''} />
                {errors.fullName && <span className="error-msg">{errors.fullName.message}</span>}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input {...register('email')} className={errors.email ? 'error' : ''} />
                {errors.email && <span className="error-msg">{errors.email.message}</span>}
              </div>
              <div className="form-group full">
                <label>Address</label>
                <input {...register('address')} className={errors.address ? 'error' : ''} />
                {errors.address && <span className="error-msg">{errors.address.message}</span>}
              </div>
              <div className="form-group">
                <label>City</label>
                <input {...register('city')} className={errors.city ? 'error' : ''} />
                {errors.city && <span className="error-msg">{errors.city.message}</span>}
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input {...register('zipCode')} className={errors.zipCode ? 'error' : ''} />
                {errors.zipCode && <span className="error-msg">{errors.zipCode.message}</span>}
              </div>
            </div>

            <h3 style={{ marginTop: '2rem' }}>Payment Method</h3>
            <div className="form-grid">
              <div className="form-group full">
                <label>Card Number (16 digits)</label>
                <input 
                  type="text" 
                  placeholder="0000 0000 0000 0000" 
                  {...register('cardNumber')} 
                  className={errors.cardNumber ? 'error' : ''} 
                />
                {errors.cardNumber && <span className="error-msg">{errors.cardNumber.message}</span>}
              </div>
            </div>

            <button type="submit" className="complete-btn bg-gradient-primary">
              Place Order - ${(cartTotal * 1.08).toFixed(2)}
            </button>
          </form>
        </div>

        <aside className="order-summary-sidebar glass">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <p className="item-name">{item.title}</p>
                  <p className="item-price">{item.quantity} x ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-totals">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(cartTotal * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(cartTotal * 1.08).toFixed(2)}</span>
            </div>
          </div>
          <Link to="/cart" className="back-to-cart">
            <FiArrowLeft /> Edit Cart
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
