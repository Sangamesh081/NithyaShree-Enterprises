import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ShieldCheck, ChevronDown, Calendar, Menu, X, Sparkles, User, Lock, LogIn, LogOut } from 'lucide-react';
import { phoneNumbers, companyDetails } from '../data/servicesData';

export default function Header({ onOpenBooking, activePage, onNavigate, currentUser, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGoToBooking = (e) => {
    if (e) e.preventDefault();
    if (!currentUser) {
      onNavigate('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (activePage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('booking');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header-wrapper" style={{ position: 'sticky', top: 0, zIndex: 900 }}>
      {/* Navigation Header */}
      <nav style={{
        background: isScrolled ? 'rgba(7, 13, 25, 0.95)' : 'rgba(7, 13, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'var(--transition)',
        padding: '0.6rem 0'
      }}>
        <div className="container header-container" style={{
          display: 'flex',
          alignItems: 'center',
          justify: 'space-between',
          gap: '1.25rem'
        }}>
          
          {/* 1. Logo First (Left Column) */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            className="header-logo-first"
            style={{ 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center'
            }}
          >
            <div style={{
              background: '#FFFFFF',
              padding: '0.35rem 0.85rem',
              borderRadius: '12px',
              boxShadow: '0 4px 18px rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center'
            }}>
              <img 
                src="/logo.png" 
                alt="Nityashree Enterprises Logo" 
                style={{
                  height: '50px',
                  width: 'auto',
                  maxWidth: '210px',
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </a>

          {/* 2. Desktop Nav Links (Middle Column) */}
          <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-item" style={{ color: activePage === 'home' ? 'var(--accent-gold)' : 'var(--text-main)' }}>Home</a>
            <a href="#services" onClick={() => onNavigate('home')} className="nav-item">Services</a>
            <a href="#booking" onClick={handleGoToBooking} className="nav-item" style={{ color: 'var(--accent-gold)', fontWeight: 800 }}>Book Online</a>
            
            {currentUser?.role === 'admin' ? (
              <button 
                onClick={() => onNavigate('admin')}
                className="nav-item"
                style={{ background: 'rgba(0, 210, 254, 0.15)', border: '1px solid #00D2FE', borderRadius: '20px', padding: '0.35rem 0.85rem', color: '#00D2FE', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
              >
                <Lock size={14} />
                <span>Admin Console</span>
              </button>
            ) : (
              <button 
                onClick={() => onNavigate('user')}
                className="nav-item"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: activePage === 'user' ? 'var(--accent-gold)' : '#00D2FE', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <User size={15} />
                <span>My Bookings</span>
              </button>
            )}
          </div>

          {/* 3. Action Buttons (Right Column) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-end' }}>
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  onClick={() => onNavigate(currentUser.role === 'admin' ? 'admin' : 'user')}
                  className="btn btn-outline"
                  style={{ padding: '0.55rem 0.95rem', fontSize: '0.82rem', borderColor: currentUser.role === 'admin' ? '#00D2FE' : 'var(--accent-gold)' }}
                >
                  <User size={14} />
                  <span>{currentUser.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Log out"
                  style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', padding: '0.55rem', borderRadius: '8px', cursor: 'pointer' }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button 
                  onClick={() => onNavigate('login')}
                  className="btn btn-outline"
                  style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <LogIn size={14} />
                  <span>Login</span>
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="btn btn-outline"
                  style={{ padding: '0.55rem 0.9rem', fontSize: '0.82rem', borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
                >
                  <User size={14} />
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            <button 
              onClick={handleGoToBooking}
              className="btn btn-gold"
              style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
            >
              <Calendar size={16} />
              <span className="btn-text-desktop">Book Service</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid var(--border-glass)',
                color: '#FFF',
                padding: '0.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'none'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '1.1rem'
          }}>
            {/* Centered Logo inside Mobile Drawer */}
            <div style={{
              background: '#FFFFFF',
              padding: '0.4rem 1rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              display: 'inline-block',
              marginBottom: '0.5rem'
            }}>
              <img 
                src="/logo.png" 
                alt="Nityashree Enterprises" 
                style={{ height: '55px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', width: '100%', alignItems: 'center' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('home'); }} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem' }}>🏠 Website Home</a>
              <a href="#services" onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600, fontSize: '1.05rem' }}>Services (12)</a>
              <a href="#booking" onClick={() => { setMobileMenuOpen(false); onNavigate('home'); }} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem' }}>📅 Book Online</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('user'); }} style={{ color: '#00D2FE', textDecoration: 'none', fontWeight: 800, fontSize: '1.05rem' }}>👤 User Portal (My Bookings)</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); onNavigate('admin'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 800, fontSize: '1.05rem' }}>🔒 Admin Console</a>
            </div>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>Direct Call Numbers:</div>
              {phoneNumbers.map((p, i) => (
                <a key={i} href={`tel:${p.raw}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
                  📞 {p.display} ({p.label})
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .nav-item {
          color: var(--text-main);
          text-decoration: none;
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s;
        }
        .nav-item:hover {
          color: var(--accent-gold);
        }
        @media (max-width: 990px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .header-logo-first img {
            height: 42px !important;
          }
        }
        @media (max-width: 580px) {
          .btn-call-quick span {
            display: none;
          }
          .btn-text-desktop {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
