import React, { useState } from 'react';
import { Calculator, MessageSquare, Calendar, CheckCircle2, IndianRupee, Sparkles } from 'lucide-react';
import { servicesData, phoneNumbers } from '../data/servicesData';

export default function QuoteCalculator({ onBookWithQuote }) {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesData[2].id); // default Electrical
  const [propertyType, setPropertyType] = useState('2bhk');
  const [urgency, setUrgency] = useState('standard');
  const [areaSqFt, setAreaSqFt] = useState(1000);

  const activeService = servicesData.find(s => s.id === Number(selectedServiceId)) || servicesData[0];

  // Price Calculation Logic
  const calculateEstimate = () => {
    let base = activeService.basePrice || 500;

    let multiplier = 1;
    if (propertyType === '1bhk') multiplier = 0.8;
    if (propertyType === '2bhk') multiplier = 1.2;
    if (propertyType === '3bhk') multiplier = 1.6;
    if (propertyType === 'villa') multiplier = 2.5;
    if (propertyType === 'commercial') multiplier = 3.2;

    if (urgency === 'same_day') multiplier *= 1.25;

    let minEst = Math.round(base * multiplier);
    let maxEst = Math.round(minEst * 1.35);

    return { minEst, maxEst };
  };

  const { minEst, maxEst } = calculateEstimate();

  const handleWhatsAppQuote = () => {
    const text = `Hello Nityashree Enterprises!\nI generated an instant cost estimate on your website:\n- Service: ${activeService.title}\n- Property: ${propertyType.toUpperCase()}\n- Urgency: ${urgency.toUpperCase()}\n- Estimated Budget: ₹${minEst.toLocaleString()} - ₹${maxEst.toLocaleString()}\n\nPlease contact me to finalize the quote!`;
    window.open(`https://wa.me/916362917433?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="calculator" style={{
      padding: '5rem 0',
      background: 'radial-gradient(circle at 50% 50%, #0d1a2d 0%, #070d19 100%)',
      borderTop: '1px solid var(--border-glass)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container">

        <div className="section-header">
          <div className="badge-gold">
            <Calculator size={14} />
            <span>Instant Price Estimator</span>
          </div>
          <h2>Calculate Your Service Cost</h2>
          <p>
            Get a instant transparent estimate tailored to your property size and service urgency.
          </p>
        </div>

        <div className="glass-card" style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '2.5rem',
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '2.5rem'
        }} className="calculator-grid">

          {/* Controls */}
          <div>
            {/* Step 1: Service Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                1. Select Required Service
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFF',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              >
                {servicesData.map((s) => (
                  <option key={s.id} value={s.id} style={{ background: '#0d1a2d', color: '#FFF' }}>
                    {s.number}. {s.title} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Property Type */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                2. Property / Scope Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { id: '1bhk', label: '1 BHK / Studio' },
                  { id: '2bhk', label: '2 BHK Flat' },
                  { id: '3bhk', label: '3 BHK Flat' },
                  { id: 'villa', label: 'Villa / House' },
                  { id: 'commercial', label: 'Office / Shop' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPropertyType(type.id)}
                    style={{
                      padding: '0.65rem 0.5rem',
                      background: propertyType === type.id ? 'rgba(255,183,3,0.2)' : 'rgba(255,255,255,0.03)',
                      border: propertyType === type.id ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 'var(--radius-sm)',
                      color: propertyType === type.id ? 'var(--accent-gold)' : 'var(--text-main)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>
                3. Service Speed & Schedule
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  onClick={() => setUrgency('standard')}
                  style={{
                    padding: '0.75rem',
                    background: urgency === 'standard' ? 'rgba(255,183,3,0.2)' : 'rgba(255,255,255,0.03)',
                    border: urgency === 'standard' ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: urgency === 'standard' ? 'var(--accent-gold)' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Standard (Within 24 Hrs)
                </button>

                <button
                  onClick={() => setUrgency('same_day')}
                  style={{
                    padding: '0.75rem',
                    background: urgency === 'same_day' ? 'rgba(255,183,3,0.2)' : 'rgba(255,255,255,0.03)',
                    border: urgency === 'same_day' ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--radius-sm)',
                    color: urgency === 'same_day' ? 'var(--accent-gold)' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Express / Same Day
                </button>
              </div>
            </div>
          </div>

          {/* Estimate Display & Actions */}
          <div style={{
            background: 'rgba(7, 13, 25, 0.7)',
            border: '1px solid rgba(255, 183, 3, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                Estimated Service Investment
              </div>

              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'var(--accent-gold)',
                margin: '0.5rem 0'
              }}>
                ₹{minEst.toLocaleString()} - ₹{maxEst.toLocaleString()}
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                * Final quotation provided after free physical site inspection by certified technician.
              </div>

              <div style={{ textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'grid', gap: '0.5rem', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFF' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>Includes initial diagnostic check</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFF' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>Zero hidden inspection fees</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FFF' }}>
                  <CheckCircle2 size={16} color="var(--accent-gold)" />
                  <span>Post-service quality guarantee</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1.75rem' }}>
              <button
                onClick={handleWhatsAppQuote}
                className="btn btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageSquare size={18} />
                <span>Send Estimate via WhatsApp</span>
              </button>

              <button
                onClick={() => onBookWithQuote({ service: activeService, propertyType, minEst, maxEst })}
                className="btn btn-gold"
                style={{ width: '100%' }}
              >
                <Calendar size={18} />
                <span>Book Service with this Quote</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .calculator-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
