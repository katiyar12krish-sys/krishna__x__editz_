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

// Health check / Keep-Alive route for UptimeRobot / Pingers
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is active and awake' });
});
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
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

// Unique Daily Visitor Tracker API (Counts 1 unique visitor per day even if they open 10+ times)
app.post('/api/track-visit', async (req, res) => {
  try {
    const { visitor_token, screen, referrer } = req.body || {};
    const userAgent = req.headers['user-agent'] || 'Unknown';
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    if (ip === '::1' || ip === '::ffff:127.0.0.1') ip = '127.0.0.1 (Localhost)';

    // Detect Device & OS
    let device = '💻 Desktop';
    if (/mobile|android|iphone|ipad|ipod/i.test(userAgent)) device = '📱 Mobile';
    if (/tablet|ipad/i.test(userAgent)) device = '📱 Tablet';

    let os = 'Windows';
    if (/android/i.test(userAgent)) os = 'Android';
    else if (/iphone|ipad|ipod/i.test(userAgent)) os = 'iOS';
    else if (/macintosh|mac os x/i.test(userAgent)) os = 'macOS';
    else if (/linux/i.test(userAgent)) os = 'Linux';

    let browser = 'Chrome';
    if (/edg/i.test(userAgent)) browser = 'Edge';
    else if (/crios|chrome/i.test(userAgent)) browser = 'Chrome';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/firefox|fxios/i.test(userAgent)) browser = 'Firefox';

    // Today's date YYYY-MM-DD
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const token = visitor_token || `${ip}_${os}`;

    if (!db.data.visitors) db.data.visitors = [];

    // Find if this unique device/visitor was already recorded today
    const existing = db.data.visitors.find(v => 
      v.date === today && (v.visitor_token === token || (v.ip === ip && v.device_type.includes(os)))
    );

    if (existing) {
      existing.pageviews = (existing.pageviews || 1) + 1;
      existing.last_visit = now.toISOString();
    } else {
      const newId = (db.data.visitors.length ? Math.max(...db.data.visitors.map(v => v.id || 0)) : 0) + 1;
      db.data.visitors.push({
        id: newId,
        visitor_token: token,
        date: today,
        ip: ip,
        user_agent: userAgent,
        device_type: `${device} (${os})`,
        browser: browser,
        screen_res: screen || 'Unknown',
        referrer: referrer || 'Direct Visit',
        pageviews: 1,
        first_visit: now.toISOString(),
        last_visit: now.toISOString()
      });
    }

    db.save();
    res.json({ success: true, date: today });
  } catch (err) {
    console.error('Error tracking visit:', err);
    res.status(500).json({ success: false });
  }
});

// Admin Visitors Analytics API
app.get('/api/admin/visitors', (req, res) => {
  try {
    const range = req.query.range || 'all'; // 'today', 'week', 'month', 'all'
    const visitors = db.data.visitors || [];
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const todayVisitors = visitors.filter(v => v.date === todayStr);
    const weekVisitors = visitors.filter(v => v.date >= weekAgo);
    const monthVisitors = visitors.filter(v => v.date >= monthAgo);

    let filtered = [...visitors];
    if (range === 'today') filtered = todayVisitors;
    else if (range === 'week') filtered = weekVisitors;
    else if (range === 'month') filtered = monthVisitors;

    filtered.sort((a, b) => new Date(b.last_visit) - new Date(a.last_visit));

    res.json({
      success: true,
      stats: {
        today_unique: todayVisitors.length,
        week_unique: weekVisitors.length,
        month_unique: monthVisitors.length,
        total_all_time: visitors.length,
        total_pageviews_today: todayVisitors.reduce((acc, v) => acc + (v.pageviews || 1), 0)
      },
      range,
      count: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
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

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const visitors = db.data.visitors || [];

    const todayUnique = visitors.filter(v => v.date === todayStr).length;
    const weekUnique = visitors.filter(v => v.date >= weekAgo).length;
    const monthUnique = visitors.filter(v => v.date >= monthAgo).length;

    res.json({
      success: true,
      data: {
        total_bookings: bookingsCount ? bookingsCount.count : 0,
        pending_bookings: pendingCount ? pendingCount.count : 0,
        total_subscribers: subscribersCount ? subscribersCount.count : 0,
        total_events: eventsCount ? eventsCount.count : 0,
        today_unique_visitors: todayUnique,
        week_unique_visitors: weekUnique,
        month_unique_visitors: monthUnique,
        recent_leads: recentLeads || []
      }
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 6. CLIENT REVIEWS & TESTIMONIALS API (REAL-TIME DB)
// ==========================================

// Get all reviews (sorted latest first)
app.get('/api/reviews', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM reviews ORDER BY created_at DESC');
    res.json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Submit a new client review in real time
app.post('/api/reviews', async (req, res) => {
  try {
    const { client_name, role_or_brand, rating, review_text, service_type, client_website } = req.body;

    if (!client_name || !review_text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your name and review text.'
      });
    }

    const starRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));

    const result = await dbRun(
      'INSERT INTO reviews (client_name, role_or_brand, rating, review_text, service_type, client_website) VALUES (?, ?, ?, ?, ?, ?)',
      [
        client_name.trim(),
        (role_or_brand || 'Verified Client').trim(),
        starRating,
        review_text.trim(),
        (service_type || 'Custom Video Edit').trim(),
        (client_website || '').trim()
      ]
    );

    // Track analytics event
    dbRun(`INSERT INTO analytics_events (event_type, event_data) VALUES ('review_submitted', ?)`, [client_name]).catch(() => {});

    const newReview = {
      id: result.lastID,
      client_name: client_name.trim(),
      role_or_brand: (role_or_brand || 'Verified Client').trim(),
      rating: starRating,
      review_text: review_text.trim(),
      service_type: (service_type || 'Custom Video Edit').trim(),
      client_website: (client_website || '').trim(),
      created_at: new Date().toISOString()
    };

    res.status(201).json({
      success: true,
      message: '🎉 Thank you! Your review has been recorded in real-time.',
      data: newReview
    });
  } catch (err) {
    console.error('Error posting review:', err);
    res.status(500).json({ success: false, message: 'Server database error. Please try again.' });
  }
});

// Static Files and Views with HLS & Video Streaming Headers

// ==========================================
// 8. LOGO SWITCHER API (Instantly Apply Chosen Concept)
// ==========================================
app.post('/api/set-logo', (req, res) => {
  try {
    const { concept } = req.body;
    const validConcepts = [
      'logo_concept_1_mayur_iris.svg',
      'logo_concept_2_golden_neon_kx.svg',
      'logo_concept_3_directors_frame.svg',
      'logo_concept_4_infinity_cut.svg'
    ];
    if (!validConcepts.includes(concept)) {
      return res.status(400).json({ success: false, message: 'Invalid logo concept' });
    }
    const sourcePath = path.join(__dirname, 'assets', concept);
    const targetPath = path.join(__dirname, 'assets', 'logo.svg');
    if (!fs.existsSync(sourcePath)) {
      return res.status(404).json({ success: false, message: 'Source logo file not found' });
    }
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`[LOGO UPDATED] Successfully applied ${concept} as official website logo!`);
    res.status(200).json({ success: true, message: `Applied ${concept} as official logo!`, concept });
  } catch (err) {
    console.error('Error applying logo:', err);
    res.status(500).json({ success: false, message: 'Error applying logo' });
  }
});

app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.m3u8')) {
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.endsWith('.ts')) {
      res.setHeader('Content-Type', 'video/mp2t');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    }
  }
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// ==========================================
// 7. MULTI-PAGE CLEAN ROUTES (FULL-PAGE EXPERIENCES)
// ==========================================
const fs = require('fs');
const servePage = (pageName) => (req, res) => {
  const filePath = path.join(__dirname, 'pages', pageName);
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.sendFile(path.join(__dirname, 'index.html'));
  }
};

app.get('/services', servePage('services.html'));
app.get('/services/:slug', servePage('services.html'));
app.get('/portfolio', servePage('portfolio.html'));
app.get('/portfolio.html', servePage('portfolio.html'));
app.get('/my-work', servePage('my-work.html'));
app.get('/my-work.html', servePage('my-work.html'));
app.get('/my-works', servePage('my-work.html'));
app.get('/works', servePage('my-work.html'));
app.get('/work', servePage('my-work.html'));
app.get('/pricing', servePage('pricing.html'));
app.get('/about', servePage('about.html'));
app.get('/founder', servePage('founder.html'));
app.get('/skills', servePage('skills.html'));
app.get('/testimonials', servePage('testimonials.html'));
app.get('/reviews', servePage('testimonials.html'));
app.get('/contact', servePage('contact.html'));
app.get('/faq', servePage('faq.html'));

// 404 Fallback
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const p404 = path.join(__dirname, '404.html');
  if (fs.existsSync(p404)) {
    res.status(404).sendFile(p404);
  } else {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
  }
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
