import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Ensure data directory and db.json exist
function readDB() {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }
    if (!fs.existsSync(DB_PATH)) {
      const initialData = { bookings: [], users: [] };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading db.json", err);
    return { bookings: [], users: [] };
  }
}

function writeDB(data) {
  try {
    if (!fs.existsSync(path.dirname(DB_PATH))) {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing db.json", err);
  }
}

// ---------------- API ENDPOINTS ---------------- //

// GET all bookings
app.get('/api/bookings', (req, res) => {
  const db = readDB();
  res.json(db.bookings || []);
});

// POST new booking
app.post('/api/bookings', (req, res) => {
  const newBooking = req.body;
  if (!newBooking || !newBooking.id) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }

  const db = readDB();
  // Filter out any duplicate ID if exists, then prepend
  const updatedBookings = [newBooking, ...(db.bookings || []).filter(b => b.id !== newBooking.id)];
  db.bookings = updatedBookings;
  writeDB(db);

  console.log(`[API] New Booking Created: ${newBooking.id} (${newBooking.serviceTitle})`);
  res.status(201).json({ success: true, booking: newBooking, total: db.bookings.length });
});

// PUT update booking status / technician
app.put('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const { status, technicianName, technicianPhone } = req.body;

  const db = readDB();
  let found = false;

  db.bookings = (db.bookings || []).map(b => {
    if (b.id === id) {
      found = true;
      return {
        ...b,
        status: status || b.status,
        technicianName: technicianName || b.technicianName,
        technicianPhone: technicianPhone || b.technicianPhone
      };
    }
    return b;
  });

  if (!found) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  writeDB(db);
  console.log(`[API] Booking Updated: ${id} -> Status: ${status}`);
  res.json({ success: true, bookings: db.bookings });
});

// DELETE a booking
app.delete('/api/bookings/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();

  db.bookings = (db.bookings || []).filter(b => b.id !== id);
  writeDB(db);

  console.log(`[API] Booking Deleted: ${id}`);
  res.json({ success: true, bookings: db.bookings });
});

// GET users
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(db.users || []);
});

// POST register user
app.post('/api/users', (req, res) => {
  const userData = req.body;
  if (!userData) return res.status(400).json({ error: 'Invalid user data' });

  const db = readDB();
  const users = db.users || [];

  const existing = users.find(u => 
    (userData.email && u.email && u.email.trim().toLowerCase() === userData.email.trim().toLowerCase()) ||
    (userData.phone && u.phone && u.phone.replace(/[^0-9]/g, '') === userData.phone.replace(/[^0-9]/g, ''))
  );

  if (existing) {
    return res.status(400).json({ error: 'User already exists' });
  }

  users.push(userData);
  db.users = users;
  writeDB(db);

  console.log(`[API] User Registered: ${userData.name} (${userData.phone || userData.email})`);
  res.status(201).json({ success: true, user: userData });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Nityashree API Server running on http://0.0.0.0:${PORT}`);
});
