import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { faqData } from '../data/servicesData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" style={{ padding: '5rem 0', background: '#070d19' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        
        <div className="section-header">
          <div className="badge-gold">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2>Frequently Asked Questions</h2>
          <p>
            Find quick answers about our service procedures, pricing clarity, and warranty standards.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  background: 'var(--bg-card)',
                  border: isOpen ? '1px solid var(--accent-gold)' : '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'var(--transition)'
                }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'transparent',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    gap: '1rem',
                    fontFamily: 'var(--font-heading)'
                  }}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    color="var(--accent-gold)"
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.5rem 1.25rem 1.5rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    paddingTop: '1rem'
                  }}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
