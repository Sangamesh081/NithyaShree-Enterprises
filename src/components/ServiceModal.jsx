import React from 'react';
import { X, Check, Calendar, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { phoneNumbers } from '../data/servicesData';

export default function ServiceModal({ service, onClose, onBookNow }) {
  if (!service) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
            Service #{service.number} • {service.category}
          </span>
        </div>

        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', marginBottom: '1rem' }}>
          {service.title}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          {service.fullDesc}
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '0.75rem' }}>
            Key Inclusions & Capabilities:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {service.features.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#E2E8F0' }}>
                <Check size={16} color="var(--accent-gold)" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Estimated Rate</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
              {service.estimatedPrice}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => {
                onClose();
                onBookNow(service);
              }}
              className="btn btn-gold"
            >
              <Calendar size={18} />
              <span>Book Service</span>
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: 700 }}>
            Or call hotline for urgent dispatch:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {phoneNumbers.slice(0, 2).map((num, i) => (
              <a
                key={i}
                href={`tel:${num.raw}`}
                style={{
                  background: 'rgba(255,183,3,0.1)',
                  border: '1px solid rgba(255,183,3,0.3)',
                  color: 'var(--accent-gold)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                📞 {num.display}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
