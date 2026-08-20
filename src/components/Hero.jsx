import React from 'react';
import { Phone, Calendar, Search, ShieldCheck, CheckCircle2, ArrowRight, MessageSquare, Star } from 'lucide-react';
import { phoneNumbers, companyDetails } from '../data/servicesData';

export default function Hero({ onOpenBooking, onOpenCallModal, setSearchQuery }) {
  return (
    <section className="hero-section" style={{
      position: 'relative',
      padding: '4rem 0 5rem 0',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 20%, rgba(30, 62, 98, 0.4) 0%, rgba(7, 13, 25, 1) 70%)'
    }}>
      {/* Background Decorative Grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 183, 3, 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        opacity: 0.6,
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '3rem',
          alignItems: 'center'
        }} className="hero-grid">
          
          {/* Hero Left Text & Actions */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{
                background: '#FFFFFF',
                padding: '0.45rem 1.1rem',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 6px 25px rgba(255, 255, 255, 0.25)'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Nityashree Enterprises Logo" 
                  style={{ 
                    height: '65px', 
                    width: 'auto', 
                    maxWidth: '280px',
                    objectFit: 'contain'
                  }} 
                />
              </div>
            </div>

            <div className="badge-gold" style={{ marginBottom: '1.25rem' }}>
              <Star size={14} fill="var(--accent-gold)" />
              <span>A2Z SOLUTION FOR EVERY NEED</span>
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#FFFFFF'
            }}>
              ONE CALL. <span className="gradient-text">EVERY SOLUTION.</span><br />
              COMPLETE SATISFACTION.
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              maxWidth: '620px',
              lineHeight: 1.6
            }}>
              Your premier single-source partner for <strong style={{ color: '#FFF' }}>Engineering, Construction, Electrical, Plumbing, Carpentry, Painting, RO, Event Management, Packers & Movers,</strong> and <strong style={{ color: '#FFF' }}>Maintenance AMC</strong> across Karnataka.
            </p>

            {/* Hero Quick Search Bar */}
            <div style={{
              background: 'rgba(13, 26, 45, 0.9)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '0.5rem 0.5rem 0.5rem 1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              maxWidth: '560px',
              marginBottom: '2rem',
              boxShadow: 'var(--shadow-card)'
            }}>
              <Search size={20} color="var(--accent-gold)" />
              <input
                type="text"
                placeholder="What service do you need? (e.g. Plumbing, Painting, RO...)"
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFF',
                  fontSize: '0.95rem',
                  width: '100%',
                  fontFamily: 'var(--font-body)'
                }}
              />
              <a 
                href="#services"
                className="btn btn-gold"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}
              >
                Find
              </a>
            </div>

            {/* Hero Action CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button onClick={onOpenBooking} className="btn btn-gold">
                <Calendar size={18} />
                <span>Book Service Online</span>
              </button>

              <a
                href={`https://wa.me/916362917433?text=${encodeURIComponent("Hello Nityashree Enterprises, I would like to inquire about your services.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <MessageSquare size={18} />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Quick Guarantees Row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>Certified Experts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>Transparent Pricing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={16} color="var(--accent-gold)" />
                <span>100% Guaranteed Work</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Card with 4 Phone Numbers */}
          <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '1.5rem',
              background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))',
              color: '#070d19',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.3rem 0.8rem',
              borderRadius: '20px',
              textTransform: 'uppercase'
            }}>
              Direct Call Lines
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem', color: '#FFF' }}>
              Need Immediate Help?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Connect directly with our operations team across any of our 4 dedicated numbers:
            </p>

            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {phoneNumbers.map((num, idx) => (
                <a
                  key={idx}
                  href={`tel:${num.raw}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,183,3,0.2)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}
                  className="hero-phone-card"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: 'rgba(255,183,3,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      color: 'var(--accent-gold)'
                    }}>
                      <Phone size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#FFF', letterSpacing: '0.02em' }}>
                        {num.display}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {num.label}
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--accent-gold)" />
                </a>
              ))}
            </div>

            <div style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              background: 'rgba(46, 204, 113, 0.1)',
              border: '1px solid rgba(46, 204, 113, 0.3)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.82rem',
              color: '#2ECC71'
            }}>
              <ShieldCheck size={18} />
              <span>Email Support: <strong>{companyDetails.email}</strong></span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .hero-phone-card:hover {
          background: rgba(255,183,3,0.15) !important;
          border-color: var(--accent-gold) !important;
          transform: translateX(4px);
        }
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-section h1 {
            font-size: 2.3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
