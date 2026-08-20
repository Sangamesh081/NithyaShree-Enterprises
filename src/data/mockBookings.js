export const initialBookings = [
  {
    id: "NY-8942",
    customerName: "Rahul Sharma",
    phone: "+91 9876543210",
    address: "#42, 10th Main, Indiranagar, Bengaluru",
    serviceTitle: "Electrical Services",
    serviceId: 3,
    date: "2026-08-21",
    timeSlot: "Morning (9 AM - 12 PM)",
    status: "Confirmed",
    technicianName: "Vikram Kumar (Master Electrician)",
    technicianPhone: "+91 9880506465",
    estimatedCost: "₹1,499",
    notes: "Short circuit in main MCB board, needs urgent replacement.",
    createdAt: "2026-08-20 09:30"
  },
  {
    id: "NY-8941",
    customerName: "Priya Sundaram",
    phone: "+91 9019935616",
    address: "Flat 402, Prestige Enclave, Whitefield, Bengaluru",
    serviceTitle: "Plumbing Services",
    serviceId: 5,
    date: "2026-08-20",
    timeSlot: "Afternoon (12 PM - 4 PM)",
    status: "Dispatched",
    technicianName: "Suresh Gowda (Plumbing Specialist)",
    technicianPhone: "+91 7676054977",
    estimatedCost: "₹999",
    notes: "Kitchen sink pipe leakage & RO filter connection.",
    createdAt: "2026-08-20 10:15"
  },
  {
    id: "NY-8940",
    customerName: "Anand Verma",
    phone: "+91 9741525049",
    address: "Plot 88, HSR Layout Sector 3, Bengaluru",
    serviceTitle: "Painting Services",
    serviceId: 10,
    date: "2026-08-22",
    timeSlot: "Morning (9 AM - 12 PM)",
    status: "Pending",
    technicianName: "Unassigned",
    technicianPhone: "-",
    estimatedCost: "₹18,500",
    notes: "3BHK full interior painting with Asian Paints Royal.",
    createdAt: "2026-08-20 11:00"
  },
  {
    id: "NY-8939",
    customerName: "Kavitha Reddy",
    phone: "+91 8884949433",
    address: "#105, JP Nagar 6th Phase, Bengaluru",
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
