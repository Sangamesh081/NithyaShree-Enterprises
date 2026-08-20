import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, CheckCircle2, AlertCircle, Phone, MapPin, 
  Calendar, RefreshCw, Search, Plus, UserCheck, DollarSign, Filter, LogOut, Edit, Trash2, Eye, EyeOff
} from 'lucide-react';
import { getStoredBookings, saveBooking, updateBookingStatus, deleteBooking, fetchRemoteBookings } from '../data/mockBookings';
import { servicesData } from '../data/servicesData';

export default function AdminPortal({ onNavigateHome }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState('nityashreeenterprises2024@gmail.com');
  const [passcode, setPasscode] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Manual New Booking State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    phone: '',
    address: '',
    serviceId: servicesData[0].id,
    date: new Date().toISOString().split('T')[0],
    timeSlot: 'Morning (9 AM - 12 PM)',
    estimatedCost: '₹1,500',
    notes: ''
  });

  useEffect(() => {
    const refreshData = async () => {
      const liveData = await fetchRemoteBookings();
      setBookings(liveData && liveData.length > 0 ? liveData : getStoredBookings());
    };
    refreshData();

    window.addEventListener('nityashree_booking_updated', refreshData);
    window.addEventListener('storage', refreshData);
    const interval = setInterval(refreshData, 1500); // 1.5-second live refresh

    return () => {
      window.removeEventListener('nityashree_booking_updated', refreshData);
      window.removeEventListener('storage', refreshData);
      clearInterval(interval);
    };
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (adminEmail === 'nityashreeenterprises2024@gmail.com' || !adminEmail) &&
      (passcode === 'nitya@123' || passcode === 'admin123' || passcode === 'admin')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin Credentials. (Password: nitya@123)');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const current = bookings.find(b => b.id === id);
    const techName = current ? current.technicianName : 'Unassigned';
    const techPhone = current ? current.technicianPhone : '-';
    const updated = updateBookingStatus(id, newStatus, techName, techPhone);
    setBookings(updated);
  };

  const handleAssignTech = (id) => {
    const techName = prompt("Enter Technician Name:", "Specialist Engineer");
    if (!techName) return;
    const techPhone = prompt("Enter Technician Phone Number:", "+91 9876543210");
    const current = bookings.find(b => b.id === id);
    const status = current && current.status === 'Pending' ? 'Confirmed' : (current ? current.status : 'Confirmed');
    const updated = updateBookingStatus(id, status, techName, techPhone || '-');
    setBookings(updated);
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const serviceObj = servicesData.find(s => s.id === Number(newOrder.serviceId)) || servicesData[0];
    const orderObj = {
      id: `NY-${Math.floor(8000 + Math.random() * 1000)}`,
      customerName: newOrder.customerName,
      phone: newOrder.phone,
      address: newOrder.address,
      serviceTitle: serviceObj.title,
      serviceId: serviceObj.id,
      date: newOrder.date,
      timeSlot: newOrder.timeSlot,
      status: 'Confirmed',
      technicianName: 'Operations Assigned',
      technicianPhone: '+91 6362917433',
      estimatedCost: newOrder.estimatedCost || serviceObj.estimatedPrice,
      notes: newOrder.notes || 'Admin manual order creation.',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updated = saveBooking(orderObj);
    setBookings(updated);
    setShowAddModal(false);
    alert(`Order #${orderObj.id} logged successfully!`);
  };

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch = !searchQuery || 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Confirmed': return { bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', color: '#10B981' };
      case 'Dispatched': return { bg: 'rgba(0, 210, 254, 0.15)', border: '#00D2FE', color: '#00D2FE' };
      case 'Pending': return { bg: 'rgba(229, 178, 58, 0.15)', border: '#E5B23A', color: '#E5B23A' };
      case 'Completed': return { bg: 'rgba(59, 130, 246, 0.15)', border: '#3B82F6', color: '#3B82F6' };
      default: return { bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444', color: '#EF4444' };
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 30%, #0c1c33 0%, #030712 80%)', padding: '2rem' }}>
        <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem', textAlign: 'center' }}>
          
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(229, 178, 58, 0.15)',
            border: '1.5px solid var(--accent-gold)',
            color: 'var(--accent-gold)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <Lock size={30} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#FFF', marginBottom: '0.4rem' }}>
            Admin Portal Access
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
            Nityashree Enterprises Operations & Management Dashboard
          </p>

          <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                Admin Email Address
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="nityashreeenterprises2024@gmail.com"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem' }}>
                Admin Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter password (nitya@123)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{ paddingRight: '2.5rem' }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: 700, textAlign: 'center' }}>
                {loginError}
              </div>
            )}

            <button type="submit" className="btn btn-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
              <ShieldCheck size={18} />
              <span>Login to Dashboard</span>
            </button>
          </form>

          {/* Quick Login Helper */}
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Admin Password: <strong style={{ color: 'var(--accent-gold)', cursor: 'pointer' }} onClick={() => { setPasscode('nitya@123'); setAdminEmail('nityashreeenterprises2024@gmail.com'); setIsAuthenticated(true); }}>nitya@123 (Click to Quick Login)</strong>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '3.5rem 0 5rem 0', background: 'radial-gradient(circle at 50% 0%, #0c1c33 0%, #030712 70%)', minHeight: '85vh' }}>
      <div className="container">
        
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div className="badge-gold">
                <ShieldCheck size={14} />
                <span>Operations Management Console</span>
              </div>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10B981', color: '#10B981', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></span>
                <span>Live Cross-Device Sync Active</span>
              </div>
            </div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#FFF' }}>
              Nityashree Master Admin Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
            <button 
              onClick={async () => {
                const live = await fetchRemoteBookings();
                setBookings(live);
              }} 
              className="btn btn-outline"
              style={{ borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' }}
              title="Force sync live bookings from backend server"
            >
              <RefreshCw size={16} />
              <span>Sync Now</span>
            </button>

            <button onClick={() => setShowAddModal(true)} className="btn btn-gold">
              <Plus size={18} />
              <span>Add Manual Order</span>
            </button>

            <button onClick={() => setIsAuthenticated(false)} className="btn btn-outline" style={{ border: '1px solid #EF4444', color: '#EF4444' }}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>

            <button onClick={onNavigateHome} className="btn btn-outline">
              <span>Back to Site</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Counters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem'
        }}>
          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Total Bookings</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--accent-gold)', marginTop: '0.25rem' }}>{bookings.length}</div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Pending Approval</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#E5B23A', marginTop: '0.25rem' }}>
              {bookings.filter(b => b.status === 'Pending').length}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Active Dispatches</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#00D2FE', marginTop: '0.25rem' }}>
              {bookings.filter(b => ['Confirmed', 'Dispatched'].includes(b.status)).length}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Completed Jobs</div>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10B981', marginTop: '0.25rem' }}>
              {bookings.filter(b => b.status === 'Completed').length}
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Status Filter Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['All', 'Pending', 'Confirmed', 'Dispatched', 'Completed', 'Cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '0.45rem 0.95rem',
                  borderRadius: '20px',
                  border: statusFilter === st ? '1.5px solid var(--accent-gold)' : '1px solid rgba(255,255,255,0.1)',
                  background: statusFilter === st ? 'rgba(229, 178, 58, 0.18)' : 'rgba(12, 24, 44, 0.7)',
                  color: statusFilter === st ? 'var(--accent-gold)' : 'var(--text-main)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              placeholder="Filter by ID, name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ padding: '0.55rem 0.85rem 0.55rem 2.2rem', fontSize: '0.88rem' }}
            />
            <Search size={15} color="var(--accent-gold)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>

        {/* Orders Table */}
        <div className="glass-card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border-glass)', color: 'var(--accent-gold)', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                <th style={{ padding: '0.85rem 0.5rem' }}>Order ID</th>
                <th style={{ padding: '0.85rem 0.5rem' }}>Customer & Phone</th>
                <th style={{ padding: '0.85rem 0.5rem' }}>Service Discipline</th>
                <th style={{ padding: '0.85rem 0.5rem' }}>Date & Slot</th>
                <th style={{ padding: '0.85rem 0.5rem' }}>Specialist / Tech</th>
                <th style={{ padding: '0.85rem 0.5rem' }}>Status</th>
                <th style={{ padding: '0.85rem 0.5rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => {
                  const bStyle = getBadgeStyle(b.status);
                  return (
                    <tr key={b.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <td style={{ padding: '1rem 0.5rem', fontWeight: 900, color: 'var(--accent-gold)' }}>
                        #{b.id}
                      </td>
                      
                      <td style={{ padding: '1rem 0.5rem' }}>
                        <div style={{ color: '#FFF', fontWeight: 800 }}>{b.customerName}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>📞 {b.phone}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>📍 {b.address}</div>
                      </td>

                      <td style={{ padding: '1rem 0.5rem', color: '#FFF', fontWeight: 700 }}>
                        {b.serviceTitle}
                        <div style={{ color: 'var(--accent-gold)', fontSize: '0.78rem' }}>{b.estimatedCost}</div>
                      </td>

                      <td style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)' }}>
                        <div style={{ color: '#FFF', fontWeight: 600 }}>{b.date}</div>
                        <div style={{ fontSize: '0.75rem' }}>{b.timeSlot}</div>
                      </td>

                      <td style={{ padding: '1rem 0.5rem' }}>
                        <div style={{ color: '#00D2FE', fontWeight: 700 }}>{b.technicianName}</div>
                        <button
                          onClick={() => handleAssignTech(b.id)}
                          style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                        >
                          Change Tech
                        </button>
                      </td>

                      <td style={{ padding: '1rem 0.5rem' }}>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          style={{
                            background: bStyle.bg,
                            border: `1px solid ${bStyle.border}`,
                            color: bStyle.color,
                            fontWeight: 800,
                            padding: '0.3rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="Pending" style={{ background: '#0c182c', color: '#E5B23A' }}>Pending</option>
                          <option value="Confirmed" style={{ background: '#0c182c', color: '#10B981' }}>Confirmed</option>
                          <option value="Dispatched" style={{ background: '#0c182c', color: '#00D2FE' }}>Dispatched</option>
                          <option value="Completed" style={{ background: '#0c182c', color: '#3B82F6' }}>Completed</option>
                          <option value="Cancelled" style={{ background: '#0c182c', color: '#EF4444' }}>Cancelled</option>
                        </select>
                      </td>

                      <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {b.status === 'Pending' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'Confirmed')}
                              style={{
                                background: 'rgba(16, 185, 129, 0.2)',
                                border: '1px solid #10B981',
                                color: '#10B981',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                              title="Accept Order"
                            >
                              ✓ Accept
                            </button>
                          )}

                          {b.status !== 'Completed' && (
                            <button
                              onClick={() => handleStatusChange(b.id, 'Completed')}
                              style={{
                                background: 'rgba(59, 130, 246, 0.2)',
                                border: '1px solid #3B82F6',
                                color: '#3B82F6',
                                padding: '0.3rem 0.6rem',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                              title="Mark Completed"
                            >
                              ✓ Complete
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to delete Order #${b.id}?`)) {
                                const updated = deleteBooking(b.id);
                                setBookings(updated);
                              }
                            }}
                            style={{
                              background: 'rgba(239, 68, 68, 0.2)',
                              border: '1px solid #EF4444',
                              color: '#EF4444',
                              padding: '0.3rem 0.6rem',
                              borderRadius: '6px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              cursor: 'pointer'
                            }}
                            title="Delete Order"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No bookings found matching filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal: Admin Manual Add Order */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#FFF', marginBottom: '1.25rem' }}>
                Log New Order Manually
              </h3>

              <form onSubmit={handleCreateOrder} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Service Discipline</label>
                  <select
                    value={newOrder.serviceId}
                    onChange={(e) => setNewOrder({ ...newOrder, serviceId: e.target.value })}
                  >
                    {servicesData.map(s => (
                      <option key={s.id} value={s.id} style={{ background: '#0c182c' }}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={newOrder.customerName}
                    onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Customer Phone *</label>
                  <input
                    type="tel"
                    required
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({ ...newOrder, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-gold)' }}>Address *</label>
                  <input
                    type="text"
                    required
                    value={newOrder.address}
                    onChange={(e) => setNewOrder({ ...newOrder, address: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className="btn btn-gold" style={{ flex: 1 }}>Save & Dispatch</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline">Cancel</button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
