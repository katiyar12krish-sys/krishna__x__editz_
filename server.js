const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Additional explicit CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Promisified Database Helpers
const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

// ==========================================
// 1. BOOKINGS & PROJECT INQUIRIES API
// ==========================================

// Submit a new project booking
app.post('/api/bookings', async (req, res) => {
  try {
    const { client_name, email, phone, service_type, budget, project_brief } = req.body;

    if (!client_name || !email || !phone || !service_type) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Name, Email, Phone/WhatsApp, and Service package.'
      });
    }

    const query = `
      INSERT INTO bookings (client_name, email, phone, service_type, budget, project_brief, status)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending')
    `;

    const result = await dbRun(query, [
      client_name,
      email,
      phone,
      service_type,
      budget || 'Not Specified',
      project_brief || ''
    ]);

    // Generate Direct WhatsApp Chat & Notification Link for Krishna (+91 8449495147)
    const waText = encodeURIComponent(
      `🚨 *NEW CLIENT WORK BOOKING RECEIVED!* 🚨\n` +
      `----------------------------------------\n` +
      `👤 *Client Name:* ${client_name}\n` +
      `📱 *Phone / WhatsApp:* ${phone}\n` +
      `📧 *Email Address:* ${email}\n` +
      `🎬 *Service Package:* ${service_type}\n` +
      `💰 *Budget / Rate:* ${budget || 'Custom / Flexible'}\n` +
      `📝 *Project Brief / Vision:*\n${project_brief || 'None provided'}\n` +
      `----------------------------------------\n` +
      `🌐 *Source:* KRISHNA X EDITZ Portfolio`
    );
    const whatsappUrl = `https://wa.me/918449495147?text=${waText}`;

    // Track analytics event
    dbRun(`INSERT INTO analytics_events (event_type, event_data) VALUES ('booking_submitted', ?)`, [service_type]).catch(() => {});

    res.status(201).json({
      success: true,
      booking_id: result.lastID,
      message: '🎉 Project brief received! Krishna will get back to you within 2-4 hours.',
      whatsapp_url: whatsappUrl
    });
  } catch (err) {
    console.error('Error submitting booking:', err);
    res.status(500).json({ success: false, message: 'Server database error. Please try again.' });
  }
});

// Get all bookings (for Admin Dashboard)
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM bookings ORDER BY created_at DESC';
    const params = [];

    if (status && status !== 'All') {
      query = 'SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC';
      params.push(status);
    }

    const rows = await dbAll(query, params);
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update Booking Status
app.patch('/api/admin/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const result = await dbRun('UPDATE bookings SET status = ? WHERE id = ?', [status, id]);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.json({ success: true, message: `Booking status updated to "${status}".` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete Booking
app.delete('/api/admin/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun('DELETE FROM bookings WHERE id = ?', [id]);
    res.json({ success: true, message: 'Booking deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 2. VIP NEWSLETTER SUBSCRIPTIONS API
// ==========================================

// Subscribe to VIP club
app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    try {
      await dbRun('INSERT INTO newsletter_subscribers (email) VALUES (?)', [cleanEmail]);
    } catch (err) {
      if (err.message && err.message.includes('UNIQUE')) {
        return res.status(200).json({
          success: true,
          message: 'You are already on the VIP Creator list! Check your inbox for the latest LUT packs.'
        });
      }
      throw err;
    }

    dbRun(`INSERT INTO analytics_events (event_type, event_data) VALUES ('newsletter_signup', ?)`, [cleanEmail]).catch(() => {});

    res.status(201).json({
      success: true,
      message: '🎉 Welcome to the KRISHNA X EDITZ VIP Club! Free cinematic LUT pack sent to your email.'
    });
  } catch (err) {
    console.error('Error in subscription:', err);
    res.status(500).json({ success: false, message: 'Database error. Please try again.' });
  }
});

// Get all subscribers (for Admin)
app.get('/api/admin/subscribers', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete subscriber (for Admin)
app.delete('/api/admin/subscribers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await dbRun('DELETE FROM newsletter_subscribers WHERE id = ?', [id]);
    res.json({ success: true, message: 'Subscriber deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 3. CONTACT INQUIRIES API
// ==========================================

app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact_info, message } = req.body;

    if (!contact_info || !message) {
      return res.status(400).json({ success: false, message: 'Contact info and message are required.' });
    }

    await dbRun(
      'INSERT INTO contact_messages (name, contact_info, message) VALUES (?, ?, ?)',
      [name || 'Anonymous', contact_info, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully to Krishna.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 4. ANALYTICS & EVENT TRACKING API
// ==========================================

app.post('/api/analytics', async (req, res) => {
  try {
    const { event_type, event_data } = req.body;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    if (!event_type) {
      return res.status(400).json({ success: false });
    }

    await dbRun(
      'INSERT INTO analytics_events (event_type, event_data, user_agent) VALUES (?, ?, ?)',
      [event_type, event_data ? JSON.stringify(event_data) : '', userAgent]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ==========================================
// 5. ADMIN SUMMARY STATS API
// ==========================================

app.get('/api/admin/stats', async (req, res) => {
  try {
    const bookingsCount = await dbGet('SELECT COUNT(*) as count FROM bookings');
    const pendingCount = await dbGet("SELECT COUNT(*) as count FROM bookings WHERE status = 'Pending'");
    const subscribersCount = await dbGet('SELECT COUNT(*) as count FROM newsletter_subscribers');
    const eventsCount = await dbGet('SELECT COUNT(*) as count FROM analytics_events');
    const recentLeads = await dbAll('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5');

    res.json({
      success: true,
      data: {
        total_bookings: bookingsCount ? bookingsCount.count : 0,
        pending_bookings: pendingCount ? pendingCount.count : 0,
        total_subscribers: subscribersCount ? subscribersCount.count : 0,
        total_events: eventsCount ? eventsCount.count : 0,
        recent_leads: recentLeads || []
      }
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Static Files and Views
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Keep process active in background
setInterval(() => {}, 1000 * 60 * 60);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`⚡ KRISHNA X EDITZ Server running at http://localhost:${PORT}`);
  console.log(`👑 Admin Dashboard available at http://localhost:${PORT}/admin`);
  console.log(`======================================================\n`);
});
