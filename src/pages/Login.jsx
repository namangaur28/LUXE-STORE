import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import '../styles/Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, signup } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = isSignup
      ? signup(name, email, password)
      : login(email, password);
    if (success) navigate('/');
  };

  return (
    <div className="login-page page-transition">
      <div className="login-card glass">
        <h1>{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
        <p className="login-subtitle">
          {isSignup ? 'Sign up to start shopping' : 'Login to your account'}
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          {isSignup && (
            <div className="input-group">
              <FiUser className="input-icon" />
              <input type="text" placeholder="Full Name" value={name}
                onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <FiMail className="input-icon" />
            <input type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" className="login-btn bg-gradient-primary">
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="toggle-text">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
