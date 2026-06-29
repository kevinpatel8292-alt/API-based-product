import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLogin, showToast }) {
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      showToast('Please fill in all fields.');
      return;
    }
    
    // Mock successful authentication
    const user = {
      name: isLogin ? (email.split('@')[0] || 'User') : name,
      email: email,
      phone: '+91 98765 43210' // Mock phone
    };
    
    showToast(`Successfully ${isLogin ? 'logged in' : 'account created'}!`);
    onLogin(user);
    onClose();
    
    // Reset form
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="auth-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to access your profile and orders.' : 'Join SHOPX to get exclusive premium benefits.'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-input-group">
              <label>Full Name</label>
              <div className="auth-input-wrapper">
                <UserIcon size={18} className="auth-input-icon" />
                <input 
                  type="text" 
                  placeholder=""
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-input-wrapper">
              <Mail size={18} className="auth-input-icon" />
              <input 
                type="email" 
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-input-wrapper">
              <Lock size={18} className="auth-input-icon" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="hero-btn hero-btn--red auth-submit-btn">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              className="auth-toggle-btn"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Create one' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
