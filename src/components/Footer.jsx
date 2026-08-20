import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { phoneNumbers, companyDetails, servicesData } from '../data/servicesData';

export default function Footer({ onOpenBooking }) {
  return (
    <footer id="contact" style={{
      background: '#040914',
      borderTop: '1px solid rgba(255, 183, 3, 0.2)',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <a href="#" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
              <div style={{
                background: '#FFFFFF',
                padding: '0.45rem 1.1rem',
                borderRadius: '14px',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                justify: 'center'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Nityashree Enterprises Logo" 
                  style={{ 
                    height: '65px', 
                    width: 'auto', 
                    maxWidth: '240px',
                    objectFit: 'contain'
                  }} 
                />
              </div>
            </a>

            <div style={{ color: 'var(--accent-gold)', fontWeight: 800, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {companyDetails.tagline}
            </div>

            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem', maxWidth: '320px' }}>
              {companyDetails.subTagline}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#2ECC71' }}>
              <ShieldCheck size={16} />
              <span>Registered & Verified Enterprise</span>
            </div>
          </div>

          {/* Direct Phone Hotlines */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Hotline Phone Numbers
            </h4>
            <div style={{ display: 'grid', gap: '0.65rem' }}>
              {phoneNumbers.map((num, i) => (
                <a
                  key={i}
                  href={`tel:${num.raw}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    color: '#FFF',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    transition: 'color 0.2s'
                  }}
                  className="footer-link"
                >
                  <Phone size={15} color="var(--accent-gold)" />
                  <span>{num.display}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>({num.label})</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details & Hours */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Official Email & Location
            </h4>
            
            <div style={{ display: 'grid', gap: '1rem', fontSize: '0.9rem' }}>
              <a href={`mailto:${companyDetails.email}`} style={{ color: '#FFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }} className="footer-link">
                <Mail size={16} color="var(--accent-gold)" />
                <span>{companyDetails.email}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#FFF' }}>
                <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{companyDetails.address}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#FFF' }}>
                <Clock size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{companyDetails.workingHours}</span>
              </div>
            </div>
          </div>

          {/* 12 Services List */}
          <div>
            <h4 style={{ color: '#FFF', fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              Our 12 Services
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.82rem' }}>
              {servicesData.map((s) => (
                <a key={s.id} href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }} className="footer-link">
                  • {s.title}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1.5rem',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} <strong>Nityashree Enterprises</strong>. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span>Crafted for complete satisfaction</span>
            <Heart size={14} color="red" fill="red" />
          </div>
        </div>

      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent-gold) !important;
        }
      `}</style>
    </footer>
  );
}
