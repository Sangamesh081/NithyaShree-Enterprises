import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { testimonialsData } from '../data/servicesData';

export default function Testimonials() {
  return (
    <section id="reviews" style={{
      padding: '5rem 0',
      background: 'radial-gradient(circle at 50% 50%, #0d1a2d 0%, #070d19 100%)',
      borderTop: '1px solid var(--border-glass)'
    }}>
      <div className="container">
        
        <div className="section-header">
          <div className="badge-gold">
            <Sparkles size={14} />
            <span>Verified Customer Reviews</span>
          </div>
          <h2>What Our Clients Say</h2>
          <p>
            Trusted by over 5,000+ homeowners, property managers, and corporate offices across Bangalore and Karnataka.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.75rem'
        }}>
          {testimonialsData.map((review) => (
            <div
              key={review.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative'
              }}
            >
              <Quote
                size={36}
                color="rgba(255, 183, 3, 0.2)"
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
              />

              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>

                <p style={{
                  color: '#E2E8F0',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{review.comment}"
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1rem' }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {review.role}
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  background: 'rgba(255,183,3,0.1)',
                  color: 'var(--accent-gold)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '12px',
                  fontWeight: 700
                }}>
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
