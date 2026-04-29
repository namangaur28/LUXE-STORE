import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FiPackage } from 'react-icons/fi';
import '../styles/Orders.css';

const Orders = () => {
  const { orders, user } = useApp();
  const userOrders = user ? orders.filter(o => o.userId === user.id) : orders;

  if (userOrders.length === 0) {
    return (
      <div className="orders-page page-transition empty-state-container">
        <div className="empty-cart glass">
          <FiPackage className="empty-icon" />
          <h2>No orders yet</h2>
          <p>Your order history will appear here after checkout.</p>
          <Link to="/products" className="btn btn-primary bg-gradient-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page page-transition">
      <h1 className="page-title">My Orders</h1>
      <div className="orders-list">
        {userOrders.map(order => (
          <div key={order.id} className="order-card glass">
            <div className="order-header">
              <div>
                <p className="order-id">Order #{order.id}</p>
                <p className="order-date">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
              <span className={`order-status ${order.status}`}>{order.status}</span>
            </div>

            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.title} />
                  <div>
                    <p className="order-item-name">{item.title}</p>
                    <p className="order-item-qty">{item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <p className="order-total">Total: <strong>${order.total.toFixed(2)}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
