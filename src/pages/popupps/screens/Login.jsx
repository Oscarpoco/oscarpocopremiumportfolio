import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdLock, MdClose } from 'react-icons/md';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const LoginForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="login-overlay">
      <motion.div 
        className="login-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          damping: 18, 
          stiffness: 100 
        }}
      >
        <motion.div className="login-content">
          <div className="login-header">
            <h2>Welcome Back</h2>
            <motion.button 
              className="close-button"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MdClose />
            </motion.button>
          </div>
          
          <p className="login-subtitle">Sign in to access your portfolio</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-icon-wrapper">
                <MdEmail className="input-icon" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-icon-wrapper">
                <MdLock className="input-icon" />
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              
              <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            
            <motion.button
              className="login-button"
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FaSignInAlt className="button-icon" />
              Login
            </motion.button>
            
            <div className="form-footer">
              <p>Don't have an account?</p>
              <a href="#signup" className="signup-link">
                <FaUserPlus className="signup-icon" />
                Sign Up
              </a>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;