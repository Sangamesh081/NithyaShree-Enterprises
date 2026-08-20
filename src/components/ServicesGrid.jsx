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
                  padding: '2.2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justify: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Popular Choice Badge (Top Center) */}
                {service.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(229, 178, 58, 0.15)',
                    border: '1.5px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '0.22rem 0.65rem',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Popular Choice
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  {/* Centered Icon Box */}
                  <div style={{
                    width: 62,
                    height: 62,
                    borderRadius: '18px',
                    background: 'rgba(229, 178, 58, 0.14)',
                    border: '1.5px solid rgba(229, 178, 58, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    color: 'var(--accent-gold)',
                    margin: '0 auto 1.25rem auto',
                    boxShadow: '0 6px 20px rgba(229, 178, 58, 0.2)'
                  }}>
                    <IconComp size={30} />
                  </div>

                  {/* Category Tag & Title - Centered */}
                  <div style={{ 
                    fontSize: '0.78rem', 
                    color: 'var(--accent-gold)', 
                    fontWeight: 800, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em', 
                    marginBottom: '0.4rem',
                    textAlign: 'center'
                  }}>
                    {service.category}
                  </div>

                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', marginBottom: '0.75rem', textAlign: 'center' }}>
                    {service.title}
                  </h3>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '1.25rem', textAlign: 'center' }}>
                    {service.shortDesc}
                  </p>

                  {/* Centered Features Bullet List */}
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '0.55rem', 
                    marginBottom: '1.5rem',
                    width: '100%' 
                  }}>
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.86rem', color: '#CBD5E1', textAlign: 'center' }}>
                        <Check size={14} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Price & Action Buttons - Centered */}
                <div style={{
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '0.85rem',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Starting Price</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                      {service.estimatedPrice}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.6rem', width: '100%', justifyContent: 'center' }}>
                    <button
                      onClick={() => onSelectService(service)}
                      className="btn btn-outline"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', flex: 1, justifyContent: 'center' }}
                      title="View Service Details"
                    >
                      <Info size={15} />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onBookService(service)}
                      className="btn btn-gold"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', flex: 1, justifyContent: 'center' }}
                    >
                      <ArrowRight size={15} />
                      <span>Book</span>
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
