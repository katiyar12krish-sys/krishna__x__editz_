const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to SQLite database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database at', DB_PATH);
  }
});

// Initialize Tables
db.serialize(() => {
  // 1. Client Bookings & Project Inquiries
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_type TEXT NOT NULL,
      budget TEXT,
      project_brief TEXT,
      status TEXT DEFAULT 'Pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. VIP Newsletter Subscribers
  db.run(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 3. Quick Messages / Contact Inquiries
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      contact_info TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 4. Analytics / Event Tracking (Book opens, CTA clicks)
  db.run(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL,
      event_data TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Seed sample initial test data if table is empty
  db.get('SELECT COUNT(*) as count FROM bookings', (err, row) => {
    if (!err && row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT INTO bookings (client_name, email, phone, service_type, budget, project_brief, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now', '-2 days'))
      `);
      stmt.run('Aarav Mehta', 'aarav@creatorstudio.com', '+919876543210', 'Commercials & Ads', '$1,000 - $2,500', 'Luxury watch commercial 4K shoot and master cinematic color grade.', 'In Discussion');
      stmt.run('Rahul Sharma', 'rahul@apexmedia.in', '+919811223344', 'Viral Reels & Shorts', '$500 - $1,000', 'Monthly pack of 12 viral retention reels with custom SFX and motion blur.', 'Booked');
      stmt.finalize();
      console.log('📦 Initial sample bookings seeded.');
    }
  });

  db.get('SELECT COUNT(*) as count FROM newsletter_subscribers', (err, row) => {
    if (!err && row && row.count === 0) {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO newsletter_subscribers (email, created_at)
        VALUES (?, datetime('now', '-1 days'))
      `);
      stmt.run('vip.creator@youtube.com');
      stmt.run('director.film@gmail.com');
      stmt.finalize();
      console.log('📦 Initial VIP subscribers seeded.');
    }
  });
});

module.exports = db;
