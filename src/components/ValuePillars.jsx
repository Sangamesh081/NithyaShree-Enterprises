import React from 'react';
import { ShieldCheck, Clock, IndianRupee, Award, Smile } from 'lucide-react';
import { valuePillars } from '../data/servicesData';

const iconMap = {
  ShieldCheck: ShieldCheck,
  Clock: Clock,
  IndianRupee: IndianRupee,
  Award: Award,
  Smile: Smile
};

export default function ValuePillars() {
  return (
    <section className="pillars-section" style={{
      background: 'linear-gradient(180deg, #070d19 0%, #0c182c 100%)',
      padding: '3rem 0',
      borderTop: '1px solid var(--border-glass)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '1.25rem'
        }}>
          {valuePillars.map((pillar) => {
            const IconComponent = iconMap[pillar.iconName] || ShieldCheck;
            return (
              <div
                key={pillar.id}
                style={{
                  background: 'rgba(13, 26, 45, 0.6)',
                  border: '1px solid rgba(255, 183, 3, 0.18)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                className="pillar-card"
              >
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: `rgba(255, 183, 3, 0.15)`,
                  border: `1.5px solid ${pillar.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginBottom: '1rem',
                  color: pillar.color,
                  boxShadow: `0 0 15px rgba(255, 183, 3, 0.2)`
                }}>
                  <IconComponent size={26} />
                </div>

                <h4 style={{
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                  marginBottom: '0.4rem',
                  textTransform: 'uppercase'
                }}>
                  {pillar.title}
                </h4>

                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.4
                }}>
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pillar-card:hover {
          background: rgba(19, 36, 63, 0.95) !important;
          border-color: var(--accent-gold) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}
