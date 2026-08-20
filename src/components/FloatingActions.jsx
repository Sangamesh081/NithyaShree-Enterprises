import React, { useState } from 'react';
import { Phone, MessageSquare, X, ChevronUp } from 'lucide-react';
import { phoneNumbers } from '../data/servicesData';

export default function FloatingActions() {
  const [callPopoverOpen, setCallPopoverOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
      
      {/* Quick Call Popover Menu */}
      {callPopoverOpen && (
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-gold)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-card)',
          padding: '1rem',
          minWidth: '260px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase' }}>
              Select Helpline Line:
            </span>
            <button onClick={() => setCallPopoverOpen(false)} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {phoneNumbers.map((num, idx) => (
              <a
                key={idx}
                href={`tel:${num.raw}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '0.6rem 0.75rem',
                  background: 'rgba(255,183,3,0.08)',
                  borderRadius: '6px',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={14} color="var(--accent-gold)" />
                  <span>{num.display}</span>
                </div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 400 }}>{num.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Floating Buttons Group */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        
        {/* Call Toggle Button */}
        <button
          onClick={() => setCallPopoverOpen(!callPopoverOpen)}
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            color: '#070d19',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255, 183, 3, 0.4)',
            transition: 'transform 0.2s'
          }}
          title="Call Hotline"
        >
          <Phone size={24} />
        </button>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/916362917433?text=${encodeURIComponent("Hello Nityashree Enterprises, I would like to inquire about your services.")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: 52,
            height: 52,
            borderRadius: '50%',
            background: '#25D366',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
            transition: 'transform 0.2s'
          }}
          title="Chat on WhatsApp"
        >
          <MessageSquare size={24} />
        </a>

      </div>

    </div>
  );
}
