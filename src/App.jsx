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

import OnlineBookingSection from './components/OnlineBookingSection';
import UserPortal from './components/UserPortal';
import AdminPortal from './components/AdminPortal';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

export default function App() {
  const [activePage, setActivePage] = useState('home'); // 'home' | 'user' | 'admin' | 'login' | 'signup'
  const [currentUser, setCurrentUser] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [detailModalService, setDetailModalService] = useState(null);
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenBooking = (service = null) => {
    if (!currentUser) {
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const handleOpenDetailModal = (service) => {
    if (!currentUser) {
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setDetailModalService(service);
  };

  const handleBookWithQuote = (quoteData) => {
    if (!currentUser) {
      setActivePage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setSelectedService(quoteData.service);
    setQuoteDetails(quoteData);
    setBookingModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'admin') {
      setActivePage('admin');
    } else {
      setActivePage('home');
      setTimeout(() => {
        const bookingElem = document.getElementById('booking');
        if (bookingElem) {
          bookingElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage('home');
  };

  return (
    <div className="app-container">
      {/* Header Navigation */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenCallModal={() => setCallModalOpen(true)}
        activePage={activePage}
        currentUser={currentUser}
        onLogout={handleLogout}
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Page Router */}
      {activePage === 'login' ? (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigateHome={() => setActivePage('home')}
          onNavigateSignup={() => setActivePage('signup')}
        />
      ) : activePage === 'signup' ? (
        <SignupPage
          onNavigateLogin={() => setActivePage('login')}
        />
      ) : activePage === 'user' ? (
        <UserPortal 
          onBookNew={() => handleOpenBooking()} 
          onNavigateHome={() => setActivePage('home')} 
        />
      ) : activePage === 'admin' ? (
        <AdminPortal 
          onNavigateHome={() => setActivePage('home')} 
        />
      ) : (
        <>
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
            onSelectService={(service) => handleOpenDetailModal(service)}
            onBookService={(service) => handleOpenBooking(service)}
            searchQuery={searchQuery}
          />

          {/* Interactive Instant Quote Calculator */}
          <QuoteCalculator
            onBookWithQuote={handleBookWithQuote}
          />

          {/* Embedded Online Booking Section */}
          <OnlineBookingSection 
            currentUser={currentUser}
            onRequireLogin={() => {
              setActivePage('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Why Choose Us & Process Workflow */}
          <WhyChooseUs
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* Testimonials */}
          <Testimonials />

          {/* FAQ Accordion */}
          <FAQ />
        </>
      )}

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
          currentUser={currentUser}
          onRequireLogin={() => {
            setActivePage('login');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
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
                background: '#FFFFFF',
                padding: '0.4rem 1rem',
                borderRadius: '12px',
                display: 'inline-block',
                margin: '0 auto 0.85rem auto',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Nityashree Enterprises Logo" 
                  style={{ 
                    height: '55px', 
                    width: 'auto', 
                    maxWidth: '220px',
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
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
