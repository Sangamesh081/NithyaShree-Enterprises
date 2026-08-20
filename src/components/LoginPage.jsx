import React, { useState } from 'react';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { validateUserLogin } from '../data/mockBookings';

export default function LoginPage({ onLoginSuccess, onNavigateHome, onNavigateSignup }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanInput = emailOrPhone.trim().toLowerCase();

    // 1. Master Admin Login Validation
    if (cleanInput === 'nityashreeenterprises2024@gmail.com') {
      if (password === 'nitya@123') {
        onLoginSuccess({
          role: 'admin',
          name: 'Nityashree Admin',
          email: 'nityashreeenterprises2024@gmail.com'
        });
        return;
      } else {
        setErrorMessage('Incorrect Admin Password. (Password: nitya@123)');
        return;
      }
    }

    if (!cleanInput || !password) {
      setErrorMessage('Please enter both email/phone and password.');
      return;
    }

    // 2. Strict Customer Validation against Registered Users Database ONLY!
    const result = validateUserLogin(cleanInput, password);
    if (!result.success) {
      setErrorMessage(result.error);
      return;
    }

    // Authenticated successfully with registered account!
    onLoginSuccess(result.user);
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      background: 'radial-gradient(circle at 50% 30%, #0c1c33 0%, #030712 80%)',
      padding: '2.5rem 1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '460px',
        width: '100%',
        padding: '2.75rem 2rem',
        position: 'relative'
      }}>
        
        {/* Header Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: '#FFFFFF',
            padding: '0.45rem 1.1rem',
            borderRadius: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 1.25rem auto',
            boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)'
          }}>
            <img 
              src="/logo.png" 
              alt="Nityashree Enterprises Logo" 
              style={{ height: '55px', width: 'auto', maxWidth: '210px', objectFit: 'contain' }} 
            />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 900, color: '#FFF' }}>
            Account Sign In
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Sign in with your registered email or mobile number and password.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.1rem' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
              Registered Email Address or Mobile Number *
            </label>
            <input
              type="text"
              placeholder="e.g. user@gmail.com or +91 9876543210"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '2.5rem' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
          >
            <span>Sign In to Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Toggle Signup Link */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <span
            onClick={onNavigateSignup}
            style={{ color: 'var(--accent-gold)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign Up Free
          </span>
        </div>

      </div>
    </div>
  );
}
