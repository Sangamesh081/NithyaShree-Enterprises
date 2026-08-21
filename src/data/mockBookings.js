export const initialBookings = [];

// BroadcastChannel for instant zero-latency cross-tab sync
const broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('nityashree_booking_channel')
  : null;

if (broadcastChannel) {
  broadcastChannel.onmessage = (event) => {
    if (event.data && event.data.type === 'BOOKING_UPDATED') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('nityashree_booking_updated'));
      }
    }
  };
}

function notifyBroadcast() {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type: 'BOOKING_UPDATED', timestamp: Date.now() });
    } catch (e) {}
  }
}

// Get candidate API endpoints to ensure cross-device network connectivity
function getApiEndpoints(path) {
  if (typeof window === 'undefined') return [`/api${path}`];
  
  const host = window.location.hostname || 'localhost';
  const origin = window.location.origin;

  const endpoints = [];

  // 1. Relative path (works when proxied or hosted on same domain)
  endpoints.push(`/api${path}`);

  // 2. Direct HTTP connection to Express server port 3001
  if (host && host !== 'localhost' && host !== '127.0.0.1') {
    endpoints.push(`http://${host}:3001/api${path}`);
  }
  endpoints.push(`http://localhost:3001/api${path}`);

  // 3. Current origin API path
  if (origin && !origin.startsWith('file:')) {
    endpoints.push(`${origin}/api${path}`);
  }

  return Array.from(new Set(endpoints));
}

// Robust async fetch from server
export async function fetchRemoteBookings() {
  if (typeof window === 'undefined') return [];

  const endpoints = getApiEndpoints('/bookings');
  const bookingMap = new Map();

  // Populate from local storage cache first
  const local = getStoredBookings();
  local.forEach(b => { if (b && b.id) bookingMap.set(b.id, b); });

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { 
        cache: 'no-store',
        headers: { 'bypass-tunnel-reminder': 'true' }
      });
      if (res.ok) {
        const remoteData = await res.json();
        if (Array.isArray(remoteData)) {
          remoteData.forEach(b => {
            if (b && (b.id || b._id)) {
              const cleanId = b.id || `NY-${String(b._id).substring(0, 4)}`;
              bookingMap.set(cleanId, { ...b, id: cleanId });
            }
          });
        }
      }
    } catch (e) {
      // Continue fallback
    }
  }

  const combinedBookings = Array.from(bookingMap.values());
  if (combinedBookings.length > 0) {
    const currentLocal = getStoredBookings();
    if (JSON.stringify(combinedBookings) !== JSON.stringify(currentLocal)) {
      localStorage.setItem('nityashree_bookings', JSON.stringify(combinedBookings));
      window.dispatchEvent(new Event('nityashree_booking_updated'));
      notifyBroadcast();
    }
    return combinedBookings;
  }

  return getStoredBookings();
}

// Start auto-sync heartbeat every 1 second
if (typeof window !== 'undefined') {
  fetchRemoteBookings();
  setInterval(fetchRemoteBookings, 1000);
}

export function getStoredBookings() {
  try {
    const data = localStorage.getItem('nityashree_bookings');
    if (!data) {
      localStorage.setItem('nityashree_bookings', JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

export function saveBooking(newBooking) {
  const current = getStoredBookings();
  const updated = [newBooking, ...current.filter(b => b.id !== newBooking.id)];
  
  try {
    localStorage.setItem('nityashree_bookings', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_booking_updated'));
      notifyBroadcast();
    }
  } catch (e) {
    console.error("Storage error", e);
  }

  // Asynchronously send to API server endpoints
  const endpoints = getApiEndpoints('/bookings');
  (async () => {
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true'
          },
          body: JSON.stringify(newBooking)
        });
        if (res.ok) {
          console.log('[Sync] Live booking delivered to:', url);
        }
      } catch (err) {
        console.warn('[Sync] Sync failed for:', url);
      }
    }
    fetchRemoteBookings();
  })();

  return updated;
}

export function updateBookingStatus(id, newStatus, technicianName, technicianPhone) {
  const current = getStoredBookings();
  const updated = current.map(b => {
    if (b.id === id) {
      return { 
        ...b, 
        status: newStatus,
        technicianName: technicianName || b.technicianName,
        technicianPhone: technicianPhone || b.technicianPhone
      };
    }
    return b;
  });

  try {
    localStorage.setItem('nityashree_bookings', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_booking_updated'));
      notifyBroadcast();
    }
  } catch (e) {
    console.error("Storage error", e);
  }

  const endpoints = getApiEndpoints(`/bookings/${id}`);
  (async () => {
    for (const url of endpoints) {
      try {
        await fetch(url, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true'
          },
          body: JSON.stringify({ status: newStatus, technicianName, technicianPhone })
        });
      } catch (err) {}
    }
    fetchRemoteBookings();
  })();

  return updated;
}

export function deleteBooking(id) {
  const current = getStoredBookings();
  const updated = current.filter(b => b.id !== id);

  try {
    localStorage.setItem('nityashree_bookings', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_booking_updated'));
      notifyBroadcast();
    }
  } catch (e) {
    console.error("Storage error", e);
  }

  const endpoints = getApiEndpoints(`/bookings/${id}`);
  (async () => {
    for (const url of endpoints) {
      try {
        await fetch(url, { 
          method: 'DELETE',
          headers: { 'bypass-tunnel-reminder': 'true' }
        });
      } catch (err) {}
    }
    fetchRemoteBookings();
  })();

  return updated;
}

export function getRegisteredUsers() {
  try {
    const data = localStorage.getItem('nityashree_registered_users');
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

export function registerNewUser(userData) {
  const users = getRegisteredUsers();
  const cleanEmail = userData.email ? userData.email.trim().toLowerCase() : '';
  const cleanPhone = userData.phone ? userData.phone.replace(/[^0-9]/g, '') : '';

  if (cleanEmail === 'nityashreeenterprises2024@gmail.com') {
    return { success: false, error: 'This email address is reserved for Administrator access.' };
  }

  const existing = users.find(u => 
    (cleanEmail && u.email && u.email.trim().toLowerCase() === cleanEmail) ||
    (cleanPhone && cleanPhone.length > 5 && u.phone && u.phone.replace(/[^0-9]/g, '') === cleanPhone)
  );

  if (existing) {
    return { 
      success: false, 
      error: `An account with this email (${cleanEmail || userData.phone}) already exists! Please log in instead.` 
    };
  }

  users.push(userData);
  try {
    localStorage.setItem('nityashree_registered_users', JSON.stringify(users));
  } catch (e) {
    console.error("Storage error", e);
  }

  const endpoints = getApiEndpoints('/users');
  (async () => {
    for (const url of endpoints) {
      try {
        await fetch(url, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'bypass-tunnel-reminder': 'true'
          },
          body: JSON.stringify(userData)
        });
      } catch (err) {}
    }
  })();

  return { success: true, user: userData };
}

export function validateUserLogin(emailOrPhone, inputPassword) {
  const users = getRegisteredUsers();
  const cleanInput = emailOrPhone.trim().toLowerCase();
  const cleanPhoneInput = cleanInput.replace(/[^0-9]/g, '');
  
  const foundUser = users.find(u => 
    (u.email && u.email.trim().toLowerCase() === cleanInput) || 
    (cleanPhoneInput && cleanPhoneInput.length > 5 && u.phone && u.phone.replace(/[^0-9]/g, '') === cleanPhoneInput)
  );

  if (!foundUser) {
    return { 
      success: false, 
      error: 'No account found with this email or mobile number. Please click "Sign Up Free" below to create an account.' 
    };
  }

  if (foundUser.password && String(foundUser.password) !== String(inputPassword)) {
    return { 
      success: false, 
      error: 'Incorrect Password! The password entered does not match your registered password.' 
    };
  }

  return { success: true, user: foundUser };
}

const defaultTestimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Homeowner, Navanagar",
    service: "Electrical Installation",
    rating: 5,
    comment: "Nityashree Enterprises replaced our main distribution panel and fixed all tripping issues in record time. Professional work!",
    date: "2026-08-15"
  },
  {
    id: 2,
    name: "Sunitha Patil",
    role: "Apartment Owner, Vidyagiri",
    service: "Plumbing Services",
    rating: 5,
    comment: "Prompt plumbing emergency response! Their technician arrived within 30 minutes and resolved a major kitchen pipe leak.",
    date: "2026-08-17"
  },
  {
    id: 3,
    name: "Mahesh Deshmukh",
    role: "Commercial Manager, Bagalkot",
    service: "Interior & Exterior Painting",
    rating: 5,
    comment: "Excellent painting finish for our office building. Clean execution, top grade royal paint, and fair pricing.",
    date: "2026-08-18"
  }
];

export function getStoredFeedbacks() {
  try {
    const data = localStorage.getItem('nityashree_feedbacks');
    if (!data) return defaultTestimonials;
    return JSON.parse(data);
  } catch (e) {
    return defaultTestimonials;
  }
}

export function saveFeedback(newFeedback) {
  const current = getStoredFeedbacks();
  const updated = [newFeedback, ...current];
  try {
    localStorage.setItem('nityashree_feedbacks', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_feedback_updated'));
      notifyBroadcast();
    }
  } catch (e) {
    console.error("Storage error", e);
  }
  return updated;
}
