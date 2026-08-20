import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle2, MessageSquare, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import { saveBooking } from '../data/mockBookings';

export default function OnlineBookingSection({ currentUser, onRequireLogin }) {
  const [selectedServiceId, setSelectedServiceId] = useState(servicesData[0].id);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (9 AM - 12 PM)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const activeService = servicesData.find(s => s.id === Number(selectedServiceId)) || servicesData[0];

  const saveToDashboard = () => {
    const newBookingObj = {
      id: `NY-${Math.floor(8000 + Math.random() * 1000)}`,
      customerName: formData.name || currentUser?.name || 'Customer User',
      phone: formData.phone || currentUser?.phone || '+91 9876543210',
      address: formData.address || currentUser?.address || 'Address provided via Web Form',
      serviceTitle: activeService.title,
      serviceId: activeService.id,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'Pending',
      technicianName: 'Technician Assignment Pending',
      technicianPhone: '-',
      estimatedCost: activeService.estimatedPrice,
      notes: formData.notes || 'Submitted via Online Web Section',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    saveBooking(newBookingObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please log in to your account before placing a service booking.");
      if (onRequireLogin) onRequireLogin();
      return;
    }
    saveToDashboard();
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    if (!currentUser) {
      alert("Please log in to your account before placing a service booking.");
      if (onRequireLogin) onRequireLogin();
      return;
    }
    saveToDashboard();
    const text = `*NEW ONLINE SERVICE BOOKING REQUEST*\n` +
      `-----------------------------------\n` +
      `*Service:* ${activeService.title}\n` +
      `*Name:* ${formData.name || currentUser?.name || 'Not provided'}\n` +
      `*Phone:* ${formData.phone || currentUser?.phone || 'Not provided'}\n` +
      `*Address:* ${formData.address || currentUser?.address || 'Not provided'}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Time Slot:* ${formData.timeSlot}\n` +
      `*Notes:* ${formData.notes || 'None'}\n` +
      `-----------------------------------\n` +
      `Please confirm my appointment.`;
    
    window.open(`https://wa.me/916362917433?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="booking" style={{
      padding: '5.5rem 0',
      background: 'radial-gradient(circle at 50% 30%, #0d1a2d 0%, #060d1a 80%)',
      borderTop: '1px solid var(--border-glass)',
      borderBottom: '1px solid var(--border-glass)'
    }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="badge-gold">
            <Calendar size={14} />
            <span>Fast Online Reservation</span>
          </div>
          <h2>Book Your Service Online</h2>
          <p>
            Schedule a verified specialist directly from your browser. Instant confirmation with zero advance deposit required.
          </p>
        </div>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          <div 
            className="glass-card" 
            onClickCapture={(e) => {
              if (!currentUser) {
                e.preventDefault();
                e.stopPropagation();
                alert("Please log in to your account before placing a service booking.");
                if (onRequireLogin) onRequireLogin();
              }
            }}
            style={{
              padding: '3rem 2.5rem',
              position: 'relative'
            }}
          >
            
            {/* Header Logo Badge */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{
                background: '#FFFFFF',
                padding: '0.45rem 1.1rem',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                justify: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.25)'
              }}>
                <img 
                  src="/logo.png" 
                  alt="Nityashree Enterprises Logo" 
                  style={{ 
                    height: '60px', 
                    width: 'auto', 
                    maxWidth: '230px',
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </div>

              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF' }}>
                Service Appointment Request Form
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
                Fill out the details below for instant technician assignment.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.4rem' }}>
                
                {/* Service Selection */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Select Service Discipline *
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.1rem',
                      background: 'rgba(6, 13, 26, 0.85)',
                      border: '1.5px solid var(--border-glass)',
                      borderRadius: 'var(--radius-md)',
                      color: '#FFF',
                      fontSize: '1rem',
                      outline: 'none'
                    }}
                    required
                  >
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.id} style={{ background: '#0c182c', color: '#FFF' }}>
                        {s.number}. {s.title} ({s.estimatedPrice})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Service Address */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Service Address / Location *
                  </label>
                  <input
                    type="text"
                    placeholder="House/Flat No., Street, Area/Locality, City (e.g. Indiranagar, Bengaluru)"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  />
                </div>

                {/* Date & Time Slot */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      required
                    >
                      <option style={{ background: '#0c182c', color: '#FFF' }}>Morning (9 AM - 12 PM)</option>
                      <option style={{ background: '#0c182c', color: '#FFF' }}>Afternoon (12 PM - 4 PM)</option>
                      <option style={{ background: '#0c182c', color: '#FFF' }}>Evening (4 PM - 8 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Additional Instructions */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Specific Work Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the issue or work required in detail..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {/* Submit Actions */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn btn-gold" style={{ flex: 1, minWidth: '220px', padding: '1rem' }}>
                    <Send size={18} />
                    <span>Confirm Booking Online</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppBooking}
                    className="btn btn-whatsapp"
                    style={{ flex: 1, minWidth: '220px', padding: '1rem' }}
                  >
                    <MessageSquare size={18} />
                    <span>Instant Booking via WhatsApp</span>
                  </button>
                </div>

                {/* Bottom Trust Indicators */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#2ECC71' }}>
                    <ShieldCheck size={16} />
                    <span>100% Service Guarantee</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" />
                    <span>Zero Advance Required</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" />
                    <span>Verified Specialists</span>
                  </div>
                </div>

              </form>
            ) : (
              /* Booking Success Screen */
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{
                  width: 76,
                  height: 76,
                  borderRadius: '50%',
                  background: 'rgba(46, 204, 113, 0.15)',
                  border: '2px solid #2ECC71',
                  color: '#2ECC71',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  margin: '0 auto 1.5rem auto'
                }}>
                  <CheckCircle2 size={42} />
                </div>

                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFF', marginBottom: '0.75rem' }}>
                  Booking Request Received!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '540px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
                  Thank you <strong>{formData.name}</strong>. Your request for <strong>{activeService.title}</strong> has been logged for <strong>{formData.date} ({formData.timeSlot})</strong>. Our operations team will call you shortly to confirm technician arrival.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                  <button onClick={handleWhatsAppBooking} className="btn btn-whatsapp">
                    <MessageSquare size={18} />
                    <span>Track on WhatsApp</span>
                  </button>

                  <button onClick={() => setSubmitted(false)} className="btn btn-outline">
                    <span>Book Another Service</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
