export const initialBookings = [
  {
    id: "NY-8942",
    customerName: "Rahul Sharma",
    phone: "+91 9876543210",
    address: "#42, Sector 10, Navanagar, Bagalkot",
    serviceTitle: "Electrical Installation & Repairs",
    serviceId: 2,
    date: "2026-08-20",
    timeSlot: "Morning (9 AM - 12 PM)",
    status: "Confirmed",
    technicianName: "Ramesh Kumar (Electrician)",
    technicianPhone: "+91 9880506465",
    estimatedCost: "₹499 - ₹2,500",
    notes: "MCB Tripping and main switchboard rewire required.",
    createdAt: "2026-08-19 14:30"
  },
  {
    id: "NY-8002",
    customerName: "Priya Sundaram",
    phone: "+91 9019935616",
    address: "Flat 402, Vidyagiri, Bagalkot",
    serviceTitle: "Plumbing Services & Fitting",
    serviceId: 1,
    date: "2026-08-21",
    timeSlot: "Afternoon (12 PM - 4 PM)",
    status: "Pending",
    technicianName: "Technician Assignment Pending",
    technicianPhone: "-",
    estimatedCost: "₹349 - ₹1,800",
    notes: "Kitchen sink leakage & bathroom tap replacement.",
    createdAt: "2026-08-20 09:15"
  },
  {
    id: "NY-8003",
    customerName: "Vikram Reddy",
    phone: "+91 9880506465",
    address: "Plot 88, Old City, Bagalkot",
    serviceTitle: "Interior & Exterior Painting",
    serviceId: 5,
    date: "2026-08-22",
    timeSlot: "Morning (9 AM - 12 PM)",
    status: "Completed",
    technicianName: "Suresh Gowda (Master Painter)",
    technicianPhone: "+91 7676054977",
    estimatedCost: "₹12,000 - ₹45,000",
    notes: "3BHK Royal Emulsion painting with damp proofing.",
    createdAt: "2026-08-18 11:00"
  },
  {
    id: "NY-8004",
    customerName: "Ananya Hegde",
    phone: "+91 7676054977",
    address: "#105, BVVS Campus Road, Bagalkot",
    serviceTitle: "Packers & Movers",
    serviceId: 11,
    date: "2026-08-19",
    timeSlot: "Morning (9 AM - 12 PM)",
    status: "Completed",
    technicianName: "Nityashree Logistics Team A",
    technicianPhone: "+91 6362917433",
    estimatedCost: "₹9,500",
    notes: "Moved 2BHK household items from JP Nagar to Yelahanka.",
    createdAt: "2026-08-18 14:00"
  }
];

export function getStoredBookings() {
  try {
    const data = localStorage.getItem('nityashree_bookings');
    if (!data) {
      localStorage.setItem('nityashree_bookings', JSON.stringify(initialBookings));
      return initialBookings;
    }
    return JSON.parse(data);
  } catch (err) {
    return initialBookings;
  }
}

export function saveBooking(newBooking) {
  const current = getStoredBookings();
  const updated = [newBooking, ...current];
  try {
    localStorage.setItem('nityashree_bookings', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_booking_updated'));
    }
  } catch (e) {
    console.error("Storage error", e);
  }
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
    }
  } catch (e) {
    console.error("Storage error", e);
  }
  return updated;
}

export function deleteBooking(id) {
  const current = getStoredBookings();
  const updated = current.filter(b => b.id !== id);
  try {
    localStorage.setItem('nityashree_bookings', JSON.stringify(updated));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('nityashree_booking_updated'));
    }
  } catch (e) {
    console.error("Storage error", e);
  }
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

  // Check if admin email or duplicate registered email/phone
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
    }
  } catch (e) {
    console.error("Storage error", e);
  }
  return updated;
}
