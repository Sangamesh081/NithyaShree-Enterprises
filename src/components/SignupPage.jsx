import React, { useState } from 'react';
import { User, Mail, Phone, Lock, MapPin, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { registerNewUser } from '../data/mockBookings';

export default function SignupPage({ onNavigateLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName || (!formData.phone && !formData.email)) {
      setErrorMessage('Please enter your name and phone number or email.');
      return;
    }

    if (!formData.password) {
      setErrorMessage('Please enter a password for your account.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match! Please enter matching passwords.');
      return;
    }

    const newUser = {
      role: 'user',
      name: formData.fullName,
      phone: formData.phone || formData.email,
      email: formData.email ? formData.email.trim().toLowerCase() : `${formData.phone}@user.com`,
      address: formData.address || 'Bengaluru, Karnataka',
      password: formData.password
    };

    const res = registerNewUser(newUser);
    if (!res.success) {
      setErrorMessage(res.error);
      return;
    }

    alert(`Account created successfully for ${newUser.name}! Please log in with your credentials.`);
    onNavigateLogin();
  };

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      background: 'radial-gradient(circle at 50% 30%, #0c1c33 0%, #030712 80%)',
      padding: '3rem 1rem'
    }}>
      <div className="glass-card" style={{
        maxWidth: '520px',
        width: '100%',
        padding: '2.75rem 2.25rem',
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
              style={{ height: '58px', width: 'auto', maxWidth: '220px', objectFit: 'contain' }} 
            />
          </div>

          <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
            <ShieldCheck size={14} />
            <span>Create New Customer Account</span>
          </div>

          <h2 style={{ fontSize: '1.9rem', fontWeight: 900, color: '#FFF' }}>
            Sign Up
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
            Sign up to book certified specialists, view instant rates, and manage service receipts.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.1rem' }}>
          
          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Full Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
            />
          </div>

          {/* Phone & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Email Address *
              </label>
              <input
                type="email"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
              Service Address / Location
            </label>
            <input
              type="text"
              placeholder="House No, Street, Locality (e.g. Indiranagar, Bengaluru)"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          {/* Passwords */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                Confirm Password *
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ paddingRight: '2.5rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, textAlign: 'center' }}>
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-gold"
            style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
          >
            <span>Sign Up Account</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Footer Toggle Login */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <span
            onClick={onNavigateLogin}
            style={{ color: 'var(--accent-gold)', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
          >
            Sign In Here
          </span>
        </div>

      </div>
    </div>
  );
}
