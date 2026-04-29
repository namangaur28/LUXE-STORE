import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { sendLoginEmail, sendOrderEmail } from '../services/email';

const AppContext = createContext();

// Helper to read from localStorage
const getStored = (key, fallback = []) => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
};

export const AppProvider = ({ children }) => {
  // Theme
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Auth
  const [user, setUser] = useState(() => getStored('currentUser', null));

  // Cart, Wishlist, Orders
  const [cart, setCart] = useState(() => getStored('cart'));
  const [wishlist, setWishlist] = useState(() => getStored('wishlist'));
  const [orders, setOrders] = useState(() => getStored('orders'));

  // Persist to localStorage
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('orders', JSON.stringify(orders)); }, [orders]);

  useEffect(() => {
    if (user) localStorage.setItem('currentUser', JSON.stringify(user));
    else localStorage.removeItem('currentUser');
  }, [user]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // ── Auth ──
  const signup = (name, email, password) => {
    const users = getStored('users');
    if (users.find(u => u.email === email)) {
      toast.error('Email already registered');
      return false;
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));

    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    toast.success('Account created!');
    sendLoginEmail(name, email, 'signup');
    return true;
  };

  const login = (email, password) => {
    const users = getStored('users');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) {
      toast.error('Invalid email or password');
      return false;
    }
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    toast.success(`Welcome back, ${found.name}!`);
    sendLoginEmail(found.name, email, 'login');
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out');
  };

  // ── Cart ──
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast.info(`Increased ${product.title} quantity`);
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.success(`${product.title} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToCartWithQty = (product, qty) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    toast.success(`${product.title} added to cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    toast.warn('Item removed from cart');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  // ── Wishlist ──
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        toast.info('Removed from wishlist');
        return prev.filter(item => item.id !== product.id);
      }
      toast.success('Added to wishlist');
      return [...prev, product];
    });
  };

  // ── Orders ──
  const placeOrder = (shippingData) => {
    const order = {
      id: 'LUXE-' + Date.now(),
      items: [...cart],
      total: cartTotal * 1.08,
      shipping: shippingData,
      date: new Date().toISOString(),
      status: 'confirmed',
      userId: user?.id || 'guest',
    };
    setOrders(prev => [order, ...prev]);
    setCart([]);
    toast.success('Order placed successfully!');
    sendOrderEmail(order);
    return order;
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      user, login, signup, logout,
      cart, addToCart, addToCartWithQty, removeFromCart, updateQuantity, clearCart,
      wishlist, toggleWishlist,
      orders, placeOrder,
      cartTotal, cartCount,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
