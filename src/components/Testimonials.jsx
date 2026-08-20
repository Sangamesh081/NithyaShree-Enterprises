import React, { useState, useEffect } from 'react';
import { Star, Quote, Sparkles, MessageSquarePlus, X, Send, CheckCircle2 } from 'lucide-react';
import { getStoredFeedbacks, saveFeedback } from '../data/mockBookings';
import { servicesData } from '../data/servicesData';

export default function Testimonials({ currentUser, onRequireLogin }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedService, setSelectedService] = useState(servicesData[0].title);
  const [comment, setComment] = useState('');
  const [customerRole, setCustomerRole] = useState('Homeowner, Bagalkot');
  const [submitted, setSubmitted] = useState(false);

  const loadFeedbacks = () => {
    setFeedbacks(getStoredFeedbacks());
  };

  useEffect(() => {
    loadFeedbacks();
    window.addEventListener('nityashree_feedback_updated', loadFeedbacks);
    window.addEventListener('storage', loadFeedbacks);
    return () => {
      window.removeEventListener('nityashree_feedback_updated', loadFeedbacks);
      window.removeEventListener('storage', loadFeedbacks);
    };
  }, []);

  const handleOpenFeedbackModal = () => {
    if (!currentUser) {
      alert("Please log in to your account to submit a review/feedback.");
      if (onRequireLogin) onRequireLogin();
      return;
    }
    setShowModal(true);
    setSubmitted(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newFeedbackObj = {
      id: Date.now(),
      name: currentUser?.name || 'Valued Customer',
      role: customerRole || 'Verified Client, Bagalkot',
      service: selectedService,
      rating: rating,
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    saveFeedback(newFeedbackObj);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setComment('');
      setSubmitted(false);
    }, 1800);
  };

  return (
    <section id="reviews" style={{
      padding: '5rem 0',
      background: 'radial-gradient(circle at 50% 50%, #0d1a2d 0%, #070d19 100%)',
      borderTop: '1px solid var(--border-glass)',
      position: 'relative'
    }}>
      <div className="container">
        
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <div className="badge-gold" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>Verified Customer Feedback</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#FFF', marginBottom: '0.75rem' }}>
            What Our Clients Say
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '640px', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Trusted by homeowners, property managers, and corporate enterprises across Bagalkot and Karnataka.
          </p>

          {/* Submit Feedback Action Button */}
          <button
            onClick={handleOpenFeedbackModal}
            className="btn btn-gold"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.9rem', gap: '0.5rem' }}
          >
            <MessageSquarePlus size={18} />
            <span>Submit Your Feedback</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem'
        }}>
          {feedbacks.map((review) => (
            <div
              key={review.id}
              className="glass-card"
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative'
              }}
            >
              <Quote
                size={36}
                color="rgba(255, 183, 3, 0.2)"
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
              />

              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={16} 
                      fill={idx < review.rating ? "var(--accent-gold)" : "none"} 
                      color={idx < review.rating ? "var(--accent-gold)" : "rgba(255,255,255,0.2)"} 
                    />
                  ))}
                </div>

                <p style={{
                  color: '#E2E8F0',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  marginBottom: '1.5rem'
                }}>
                  "{review.comment}"
                </p>
              </div>

              <div style={{
                borderTop: '1px solid rgba(255,255,255,0.08)',
                paddingTop: '1rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 800, color: '#FFF', fontSize: '1rem' }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {review.role}
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  background: 'rgba(255,183,3,0.1)',
                  color: 'var(--accent-gold)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '12px',
                  fontWeight: 700
                }}>
                  {review.service}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Submitting Customer Feedback */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)} style={{ zIndex: 1100 }}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px', padding: '2.5rem' }}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <X size={20} />
            </button>

            {!submitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div className="badge-gold" style={{ marginBottom: '0.5rem' }}>
                    <MessageSquarePlus size={14} />
                    <span>Customer Review</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF' }}>
                    Share Your Feedback
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                    Help us serve you better by rating your experience with Nityashree Enterprises.
                  </p>
                </div>

                <form onSubmit={handleSubmitFeedback} style={{ display: 'grid', gap: '1.1rem' }}>
                  
                  {/* Rating Selector */}
                  <div style={{ textAlign: 'center' }}>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      Overall Star Rating *
                    </label>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}
                        >
                          <Star
                            size={28}
                            fill={(hoverRating || rating) >= star ? "var(--accent-gold)" : "none"}
                            color={(hoverRating || rating) >= star ? "var(--accent-gold)" : "rgba(255,255,255,0.3)"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Service Division */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Service Rendered *
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      {servicesData.map((s) => (
                        <option key={s.id} value={s.title} style={{ background: '#0c182c', color: '#FFF' }}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location / Role */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Location & Property Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Homeowner, Navanagar Bagalkot"
                      value={customerRole}
                      onChange={(e) => setCustomerRole(e.target.value)}
                    />
                  </div>

                  {/* Comment */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.35rem', textTransform: 'uppercase' }}>
                      Your Review & Experience *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the service quality, technician behavior, and overall experience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-gold"
                    style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', justifyContent: 'center' }}
                  >
                    <Send size={16} />
                    <span>Submit Feedback</span>
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle2 size={56} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', marginBottom: '0.5rem' }}>
                  Thank You for Your Feedback!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Your review has been published successfully on Nityashree Enterprises.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
