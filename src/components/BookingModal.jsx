import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, MessageSquare, Phone, Send } from 'lucide-react';
import { servicesData, phoneNumbers } from '../data/servicesData';
import { saveBooking } from '../data/mockBookings';

export default function BookingModal({ initialService, quoteDetails, onClose, currentUser, onRequireLogin }) {
  const [selectedServiceId, setSelectedServiceId] = useState(
    initialService ? initialService.id : servicesData[0].id
  );
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (9 AM - 12 PM)',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [lastBooking, setLastBooking] = useState(null);

  const activeService = servicesData.find(s => s.id === Number(selectedServiceId)) || servicesData[0];

  const saveToDashboard = () => {
    const newBookingObj = {
      id: `NY-${Math.floor(8000 + Math.random() * 1000)}`,
      customerName: formData.name.trim() || currentUser?.name || 'Guest Customer',
      phone: formData.phone.trim() || currentUser?.phone || 'Not provided',
      address: formData.address.trim() || currentUser?.address || 'Provided via Booking Modal',
      serviceTitle: activeService.title,
      serviceId: activeService.id,
      date: formData.date,
      timeSlot: formData.timeSlot,
      status: 'Pending',
      technicianName: 'Technician Assignment Pending',
      technicianPhone: '-',
      estimatedCost: quoteDetails ? `₹${quoteDetails.minEst} - ₹${quoteDetails.maxEst}` : activeService.estimatedPrice,
      notes: formData.notes || 'Submitted via Booking Modal',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    saveBooking(newBookingObj);
    setLastBooking(newBookingObj);
    return newBookingObj;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveToDashboard();
    setSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const booking = lastBooking || saveToDashboard();
    const text = `*NEW SERVICE BOOKING REQUEST*\n` +
      `-----------------------------------\n` +
      `*Booking Ref:* ${booking.id}\n` +
      `*Service:* ${activeService.title}\n` +
      `*Name:* ${formData.name || currentUser?.name || 'Not provided'}\n` +
      `*Phone:* ${formData.phone || currentUser?.phone || 'Not provided'}\n` +
      `*Address:* ${formData.address || currentUser?.address || 'Not provided'}\n` +
      `*Preferred Date:* ${formData.date}\n` +
      `*Time Slot:* ${formData.timeSlot}\n` +
      (quoteDetails ? `*Est. Budget:* ₹${quoteDetails.minEst} - ₹${quoteDetails.maxEst}\n` : '') +
      `*Notes:* ${formData.notes || 'None'}\n` +
      `-----------------------------------\n` +
      `Please confirm my appointment.`;
    
    window.open(`https://wa.me/916362917433?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
              <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
                <Calendar size={14} />
                <span>Fast Online Booking</span>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFF' }}>
                Book Your Service
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Fill out the details below for instant technician assignment.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.1rem' }}>
              
              {/* Service Choice */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                  Select Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#FFF',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  required
                >
                  {servicesData.map((s) => (
                    <option key={s.id} value={s.id} style={{ background: '#0d1a2d', color: '#FFF' }}>
                      {s.number}. {s.title} ({s.estimatedPrice})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name & Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                  Service Address / Location *
                </label>
                <input
                  type="text"
                  placeholder="Area, Flat No, Street, Landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#FFF',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              {/* Date & Time Slot */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#FFF',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Morning (9 AM - 12 PM)" style={{ background: '#0d1a2d' }}>Morning (9 AM - 12 PM)</option>
                    <option value="Afternoon (12 PM - 3 PM)" style={{ background: '#0d1a2d' }}>Afternoon (12 PM - 3 PM)</option>
                    <option value="Evening (3 PM - 7 PM)" style={{ background: '#0d1a2d' }}>Evening (3 PM - 7 PM)</option>
                    <option value="Urgent / Emergency Dispatch" style={{ background: '#0d1a2d' }}>⚡ Emergency Dispatch</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                  Additional Work Notes / Requirements
                </label>
                <textarea
                  rows="2"
                  placeholder="Describe issue or specific requirement..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-glass)',
                    borderRadius: 'var(--radius-sm)',
                    color: '#FFF',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-gold">
                  <Send size={16} />
                  <span>Confirm Booking</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="btn btn-whatsapp"
                >
                  <MessageSquare size={16} />
                  <span>Book via WhatsApp</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Submission Success View */
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
              width: 70,
              height: 70,
              borderRadius: '50%',
              background: 'rgba(46, 204, 113, 0.15)',
              border: '2px solid #2ECC71',
              color: '#2ECC71',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <CheckCircle2 size={38} />
            </div>

            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#FFF', marginBottom: '0.75rem' }}>
              Booking Received!
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '480px', margin: '0 auto 1.5rem auto' }}>
              Thank you <strong style={{ color: '#FFF' }}>{formData.name || 'valued customer'}</strong>. Our dispatch team for <strong style={{ color: 'var(--accent-gold)' }}>{activeService.title}</strong> has received your request and will call you at <strong style={{ color: '#FFF' }}>{formData.phone}</strong> shortly.
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.75rem',
              textAlign: 'left',
              fontSize: '0.88rem'
            }}>
              <div style={{ color: 'var(--accent-gold)', fontWeight: 800, marginBottom: '0.4rem' }}>Booking Summary:</div>
              <div>• Service: {activeService.title}</div>
              <div>• Scheduled Date: {formData.date} ({formData.timeSlot})</div>
              <div>• Address: {formData.address}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    const reviewsEl = document.getElementById('reviews');
                    if (reviewsEl) reviewsEl.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }} 
                className="btn btn-gold"
              >
                <span>⭐ View Customer Reviews</span>
              </button>

              <button onClick={handleWhatsAppBooking} className="btn btn-whatsapp">
                <MessageSquare size={18} />
                <span>Send to WhatsApp</span>
              </button>

              <button onClick={onClose} className="btn btn-outline">
                <span>Done / Close</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
