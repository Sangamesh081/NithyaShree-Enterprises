import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, ShieldCheck, ChevronDown, Calendar, Menu, X, Sparkles } from 'lucide-react';
import { phoneNumbers, companyDetails } from '../data/servicesData';

export default function Header({ onOpenBooking, onOpenCallModal }) {
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

  return (
    <header className="header-wrapper" style={{ position: 'sticky', top: 0, zIndex: 900 }}>
      {/* Top Bar with All 4 Contact Numbers */}
      <div className="top-bar" style={{
        background: '#040914',
        borderBottom: '1px solid rgba(255,183,3,0.15)',
        padding: '0.45rem 0',
        fontSize: '0.85rem'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2ECC71', fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ECC71', boxShadow: '0 0 10px #2ECC71', display: 'inline-block' }}></span>
              <span>24/7 Service Available</span>
            </div>
            
            <a href={`mailto:${companyDetails.email}`} style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem' }} className="top-link">
              <Mail size={14} color="var(--accent-gold)" />
              <span>{companyDetails.email}</span>
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Quick Call Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                style={{
                  background: 'rgba(255,183,3,0.1)',
                  border: '1px solid rgba(255,183,3,0.3)',
                  color: 'var(--accent-gold)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <Phone size={13} />
                <span>Call Hotline (4 Lines)</span>
                <ChevronDown size={13} style={{ transform: phoneDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {phoneDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '120%',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-card)',
                  padding: '0.75rem',
                  minWidth: '240px',
                  zIndex: 1000
                }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
                    Direct Hotline Numbers:
                  </div>
                  {phoneNumbers.map((p, idx) => (
                    <a
                      key={idx}
                      href={`tel:${p.raw}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '0.5rem 0.6rem',
                        color: '#FFF',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,183,3,0.15)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <span style={{ color: 'var(--accent-gold)' }}>{p.display}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <nav style={{
        background: isScrolled ? 'rgba(7, 13, 25, 0.95)' : 'rgba(7, 13, 25, 0.85)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        transition: 'var(--transition)',
        padding: '0.8rem 0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              boxShadow: '0 4px 15px rgba(255, 183, 3, 0.4)',
              color: '#070d19',
              fontWeight: 900,
              fontSize: '1.4rem'
            }}>
              NY
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.25rem', color: '#FFF', letterSpacing: '0.03em', lineHeight: 1.1 }}>
                NITYASHREE
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                ENTERPRISES
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <a href="#services" className="nav-item">Services</a>
            <a href="#calculator" className="nav-item">Instant Quote</a>
            <a href="#why-us" className="nav-item">Why Us</a>
            <a href="#reviews" className="nav-item">Reviews</a>
            <a href="#faq" className="nav-item">FAQ</a>
            <a href="#contact" className="nav-item">Contact</a>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button 
              onClick={onOpenBooking}
              className="btn btn-gold"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
            >
              <Calendar size={16} />
              <span>Book Service</span>
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

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-glass)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>Services (12)</a>
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>Cost Calculator</a>
            <a href="#why-us" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>Why Choose Us</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>Customer Reviews</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>Contact Info</a>
            
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
        @media (max-width: 900px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
