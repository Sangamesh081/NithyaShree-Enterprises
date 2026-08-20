import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import ServicesGrid from './components/ServicesGrid';
import QuoteCalculator from './components/QuoteCalculator';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import ServiceModal from './components/ServiceModal';
import BookingModal from './components/BookingModal';
import { phoneNumbers } from './data/servicesData';
import { X, Phone } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [detailModalService, setDetailModalService] = useState(null);
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenBooking = (service = null) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleBookWithQuote = (quoteData) => {
    setSelectedService(quoteData.service);
    setQuoteDetails(quoteData);
    setBookingModalOpen(true);
  };

  return (
    <div className="app-container">
      {/* Header Navigation */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenCallModal={() => setCallModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={() => handleOpenBooking()}
        onOpenCallModal={() => setCallModalOpen(true)}
        setSearchQuery={setSearchQuery}
      />

      {/* 5 Core Value Pillars Bar */}
      <ValuePillars />

      {/* Services Grid (12 Services) */}
      <ServicesGrid
        onSelectService={(service) => setDetailModalService(service)}
        onBookService={(service) => handleOpenBooking(service)}
        searchQuery={searchQuery}
      />

      {/* Interactive Instant Quote Calculator */}
      <QuoteCalculator
        onBookWithQuote={handleBookWithQuote}
      />

      {/* Why Choose Us & Process Workflow */}
      <WhyChooseUs
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FAQ />

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Service Specification Modal */}
      {detailModalService && (
        <ServiceModal
          service={detailModalService}
          onClose={() => setDetailModalService(null)}
          onBookNow={(service) => handleOpenBooking(service)}
        />
      )}

      {/* Service Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          initialService={selectedService}
          quoteDetails={quoteDetails}
          onClose={() => {
            setBookingModalOpen(false);
            setQuoteDetails(null);
          }}
        />
      )}

      {/* Phone Call Hotlines Modal */}
      {callModalOpen && (
        <div className="modal-overlay" onClick={() => setCallModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <button className="modal-close" onClick={() => setCallModalOpen(false)}>
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: 'rgba(255,183,3,0.15)',
                color: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                margin: '0 auto 0.75rem auto'
              }}>
                <Phone size={26} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
                Nityashree Hotline Numbers
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                Tap any number below for instant call connection:
              </p>
            </div>

            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {phoneNumbers.map((p, idx) => (
                <a
                  key={idx}
                  href={`tel:${p.raw}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    padding: '0.85rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,183,3,0.3)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'var(--transition)'
                  }}
                  className="hero-phone-card"
                >
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                      {p.display}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {p.label}
                    </div>
                  </div>
                  <span style={{ fontSize: '0.82rem', background: 'var(--accent-gold)', color: '#070d19', padding: '0.3rem 0.75rem', borderRadius: '15px', fontWeight: 800 }}>
                    Call Now
                  </span>
                </a>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
