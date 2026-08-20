import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, User, Phone, CheckCircle2, 
  AlertCircle, ShieldCheck, Download, Plus, MessageSquare, Search, ArrowRight 
} from 'lucide-react';
import { getStoredBookings } from '../data/mockBookings';

export default function UserPortal({ onBookNew, onNavigateHome }) {
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const refreshData = () => {
      setBookings(getStoredBookings());
    };
    refreshData();

    window.addEventListener('nityashree_booking_updated', refreshData);
    window.addEventListener('storage', refreshData);
    const interval = setInterval(refreshData, 2000);

    return () => {
      window.removeEventListener('nityashree_booking_updated', refreshData);
      window.removeEventListener('storage', refreshData);
      clearInterval(interval);
    };
  }, []);

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'All' || 
      (statusFilter === 'Active' && ['Pending', 'Confirmed', 'Dispatched'].includes(b.status)) ||
      (statusFilter === 'Completed' && b.status === 'Completed');
    const matchesSearch = !searchQuery || 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return { bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', color: '#10B981' };
      case 'Dispatched':
        return { bg: 'rgba(0, 210, 254, 0.15)', border: '#00D2FE', color: '#00D2FE' };
      case 'Pending':
        return { bg: 'rgba(229, 178, 58, 0.15)', border: '#E5B23A', color: '#E5B23A' };
      case 'Completed':
        return { bg: 'rgba(59, 130, 246, 0.15)', border: '#3B82F6', color: '#3B82F6' };
      default:
        return { bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444', color: '#EF4444' };
    }
  };

  const totalBookingsCount = bookings.length;
  const activeCount = bookings.filter(b => ['Pending', 'Confirmed', 'Dispatched'].includes(b.status)).length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  return (
    <div style={{ padding: '3.5rem 0 5rem 0', background: 'radial-gradient(circle at 50% 0%, #0c1c33 0%, #030712 70%)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Page Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
              <User size={14} />
              <span>Customer Service Portal</span>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>
              My Service Appointments
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Track live technician dispatch, appointment dates, and booking receipts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button onClick={onBookNew} className="btn btn-gold">
              <Plus size={18} />
              <span>Book New Service</span>
            </button>
            <button 
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                setTimeout(() => {
                  const reviewsEl = document.getElementById('reviews');
                  if (reviewsEl) reviewsEl.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }} 
              className="btn btn-outline"
              style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
            >
              <MessageSquare size={16} />
              <span>Submit Feedback</span>
            </button>
            <button onClick={onNavigateHome} className="btn btn-outline">
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* 3 Summary Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Total Orders
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
              {totalBookingsCount}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Active Appointments
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#00D2FE' }}>
              {activeCount}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Completed Services
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10B981' }}>
              {completedCount}
            </div>
          </div>
        </div>

        {/* Search & Status Filters */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['All', 'Active', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '20px',
                  border: statusFilter === tab ? '1.5px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                  background: statusFilter === tab ? 'rgba(229, 178, 58, 0.18)' : 'rgba(12, 24, 44, 0.7)',
                  color: statusFilter === tab ? 'var(--accent-gold)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Search by ID or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '0.55rem 0.85rem 0.55rem 2.2rem', fontSize: '0.88rem' }}
            />
            <Search size={15} color="var(--accent-gold)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Bookings List Cards */}
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b) => {
              const badgeStyle = getStatusBadgeClass(b.status);
              return (
                <div key={b.id} className="glass-card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.15rem', color: 'var(--accent-gold)' }}>
                          #{b.id}
                        </span>
                        <span style={{
                          background: badgeStyle.bg,
                          border: `1px solid ${badgeStyle.border}`,
                          color: badgeStyle.color,
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '12px',
                          textTransform: 'uppercase'
                        }}>
                          {b.status}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF' }}>
                        {b.serviceTitle}
                      </h3>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Est. Cost</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                        {b.estimatedCost}
                      </div>
                    </div>
                  </div>

                  {/* Booking Details Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1rem',
                    background: 'rgba(3, 7, 18, 0.5)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    marginBottom: '1.25rem',
                    fontSize: '0.88rem'
                  }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>Date & Time Slot:</div>
                      <div style={{ color: '#FFF', fontWeight: 700, marginTop: '0.2rem' }}>
                        📅 {b.date} ({b.timeSlot})
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>Customer Name:</div>
                      <div style={{ color: '#FFF', fontWeight: 700, marginTop: '0.2rem' }}>
                        👤 {b.customerName} ({b.phone})
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>Assigned Specialist:</div>
                      <div style={{ color: '#00D2FE', fontWeight: 700, marginTop: '0.2rem' }}>
                        🛠️ {b.technicianName}
                      </div>
                    </div>

                    <div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 700 }}>Service Location:</div>
                      <div style={{ color: '#FFF', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        📍 {b.address}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Logged on: {b.createdAt}
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <a
                        href={`https://wa.me/916362917433?text=${encodeURIComponent(`Hello Nityashree, checking status of booking #${b.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                      >
                        <MessageSquare size={14} />
                        <span>Track WhatsApp</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })
          ) : (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
              <AlertCircle size={40} color="var(--accent-gold)" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>No Bookings Found</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                You haven't logged any service appointments matching this filter yet.
              </p>
              <button onClick={onBookNew} className="btn btn-gold" style={{ marginTop: '1.5rem' }}>
                <Plus size={16} />
                <span>Book Service Now</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
