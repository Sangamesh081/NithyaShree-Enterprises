import React, { useState } from 'react';
import { 
  HardHat, Building2, Zap, Users, Droplets, Headset, 
  PartyPopper, Wrench, Hammer, Paintbrush, Truck, Settings,
  ArrowRight, Check, Sparkles, PhoneCall, Info
} from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  HardHat, Building2, Zap, Users, Droplets, Headset,
  PartyPopper, Wrench, Hammer, Paintbrush, Truck, Settings
};

const categories = [
  "All Services",
  "Home Maintenance",
  "Technical & Construction",
  "Commercial & Staffing",
  "Specialized"
];

export default function ServicesGrid({ onSelectService, onBookService, searchQuery }) {
  const [activeCategory, setActiveCategory] = useState("All Services");

  const filteredServices = servicesData.filter(service => {
    const matchesCategory = activeCategory === "All Services" || service.category === activeCategory;
    const matchesSearch = !searchQuery || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" style={{ padding: '5rem 0', background: '#070d19' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-gold">
            <Sparkles size={14} />
            <span>Comprehensive Solutions</span>
          </div>
          <h2>Our 12 Core Service Divisions</h2>
          <p>
            Explore our end-to-end service capabilities designed for residential homeowners, commercial enterprises, and industrial clients.
          </p>
        </div>

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          justify: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '3rem'
        }}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '50px',
                border: activeCategory === cat ? '1px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                background: activeCategory === cat ? 'linear-gradient(135deg, var(--accent-gold), var(--accent-amber))' : 'rgba(13, 26, 45, 0.7)',
                color: activeCategory === cat ? '#070d19' : 'var(--text-main)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services 12-Card Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.75rem'
        }}>
          {filteredServices.map((service) => {
            const IconComp = iconMap[service.iconName] || Wrench;
            return (
              <div 
                key={service.id}
                className="glass-card"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Popular Tag */}
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(255, 183, 3, 0.15)',
                    border: '1px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '0.2rem 0.6rem',
                    borderRadius: '12px',
                    textTransform: 'uppercase'
                  }}>
                    Popular Choice
                  </div>
                )}

                <div>
                  {/* Icon & Number Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div style={{
                      width: 56,
                      height: 56,
                      borderRadius: '16px',
                      background: 'rgba(255, 183, 3, 0.12)',
                      border: '1.5px solid rgba(255, 183, 3, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'center',
                      color: 'var(--accent-gold)'
                    }}>
                      <IconComp size={28} />
                    </div>

                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      color: 'rgba(255,255,255,0.12)'
                    }}>
                      {service.number}
                    </span>
                  </div>

                  {/* Category Tag & Title */}
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                    {service.category}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF', marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {service.shortDesc}
                  </p>

                  {/* Features Bullet List */}
                  <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#CBD5E1' }}>
                        <Check size={14} color="var(--accent-gold)" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  gap: '0.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Starting Price</div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                      {service.estimatedPrice}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => onSelectService(service)}
                      className="btn btn-outline"
                      style={{ padding: '0.5rem 0.75rem', fontSize: '0.82rem' }}
                      title="View Service Details"
                    >
                      <Info size={15} />
                    </button>

                    <button
                      onClick={() => onBookService(service)}
                      className="btn btn-gold"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
                    >
                      <span>Book</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <h3>No services found matching your search.</h3>
            <p>Try searching for "Plumbing", "Electrical", "Painting", or "Construction".</p>
          </div>
        )}

      </div>
    </section>
  );
}
