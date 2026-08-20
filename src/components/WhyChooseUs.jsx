import React from 'react';
import { ShieldCheck, CheckCircle2, Users, Grid, Smile, PhoneCall, Wrench, ThumbsUp, Sparkles } from 'lucide-react';
import { statisticsData } from '../data/servicesData';

const iconMap = {
  CheckCircle2, Smile, Users, Grid
};

const processSteps = [
  {
    step: "01",
    title: "Call or Request Online",
    desc: "Reach out via our website or call any of our 4 hotline numbers (+91 6362917433, etc.)",
    icon: PhoneCall
  },
  {
    step: "02",
    title: "Expert Site Assessment",
    desc: "A verified specialist visits your location for physical inspection & transparent quotation.",
    icon: Wrench
  },
  {
    step: "03",
    title: "Precision Execution",
    desc: "Our skilled team carries out the work using top-grade materials & safety standards.",
    icon: ShieldCheck
  },
  {
    step: "04",
    title: "Quality Check & Handover",
    desc: "Final walkthrough with customer satisfaction sign-off and warranty coverage.",
    icon: ThumbsUp
  }
];

export default function WhyChooseUs({ onOpenBooking }) {
  return (
    <section id="why-us" style={{ padding: '5rem 0', background: '#070d19' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-gold">
            <Sparkles size={14} />
            <span>Proven Track Record</span>
          </div>
          <h2>Why Choose Nityashree Enterprises?</h2>
          <p>
            We eliminate the hassle of dealing with multiple unverified contractors by bringing all 12 key engineering and maintenance disciplines under one trusted roof.
          </p>
        </div>

        {/* Counter Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          {statisticsData.map((stat, i) => {
            const IconComp = iconMap[stat.icon] || CheckCircle2;
            return (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: '2.2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(13, 26, 45, 0.9) 0%, rgba(7, 13, 25, 0.9) 100%)'
                }}
              >
                <div style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'rgba(255, 183, 3, 0.15)',
                  border: '1.5px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  margin: '0 auto 1.25rem auto',
                  boxShadow: '0 0 20px rgba(255, 183, 3, 0.3)',
                  flexShrink: 0
                }}>
                  <IconComp size={28} style={{ display: 'block', margin: '0 auto', flexShrink: 0 }} />
                </div>

                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  color: 'var(--accent-gold)',
                  lineHeight: 1,
                  textAlign: 'center',
                  width: '100%'
                }}>
                  {stat.value}
                </div>

                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#FFF',
                  marginTop: '0.5rem',
                  textAlign: 'center',
                  width: '100%'
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4-Step Process Section */}
        <div style={{
          background: 'rgba(13, 26, 45, 0.5)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem 2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF' }}>
              How We Work - Simple 4-Step Process
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              From initial call to project completion in guaranteed time.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem'
          }}>
            {processSteps.map((p, idx) => {
              const StepIcon = p.icon;
              return (
                <div key={idx} style={{ position: 'relative', textAlign: 'center' }}>
                  <div style={{
                    width: 62,
                    height: 62,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1E3E62 0%, #0B192C 100%)',
                    border: '1.5px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    margin: '0 auto 1.25rem auto',
                    boxShadow: 'var(--shadow-gold)',
                    flexShrink: 0
                  }}>
                    <StepIcon size={26} style={{ display: 'block', margin: '0 auto' }} />
                  </div>

                  <span style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '30%',
                    background: 'var(--accent-gold)',
                    color: '#070d19',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '10px'
                  }}>
                    STEP {p.step}
                  </span>

                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', marginBottom: '0.5rem' }}>
                    {p.title}
                  </h4>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button onClick={onOpenBooking} className="btn btn-gold">
              <span>Experience Premium Service Now</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
