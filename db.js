const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'database.json');

// In-Memory Data Store with JSON File Persistence (Zero Native C++ / Zero GLIBC Dependencies)
let data = {
  bookings: [],
  newsletter_subscribers: [],
  contact_messages: [],
  analytics_events: []
};

// Load persisted data if file exists
try {
  if (fs.existsSync(DB_FILE)) {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    data = { ...data, ...parsed };
    console.log('✅ Loaded database from database.json');
  } else {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Initialized database.json with empty store');
  }
} catch (e) {
  console.warn('⚠️ Note on database file:', e.message);
}

function save() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Database save error:', e);
  }
}

function normalizeParams(params, cb) {
  if (typeof params === 'function') {
    return { p: [], callback: params };
  }
  return { p: Array.isArray(params) ? params : (params ? [params] : []), callback: cb || (() => {}) };
}

const db = {
  serialize(fn) {
    if (typeof fn === 'function') fn();
  },

  run(sql, params, cb) {
    const { p, callback } = normalizeParams(params, cb);
    const self = { lastID: 0, changes: 0 };
    const query = sql.trim();

    try {
      // 1. INSERT INTO bookings
      if (/^INSERT\s+INTO\s+bookings/i.test(query)) {
        const id = (data.bookings.length ? Math.max(...data.bookings.map(b => b.id || 0)) : 0) + 1;
        const [client_name, email, phone, service_type, budget, project_brief] = p;
        data.bookings.push({
          id,
          client_name,
          email,
          phone,
          service_type,
          budget: budget || '',
          project_brief: project_brief || '',
          status: 'Pending',
          created_at: new Date().toISOString()
        });
        self.lastID = id;
        self.changes = 1;
        save();
        return callback.call(self, null);
      }

      // 2. INSERT INTO newsletter_subscribers
      if (/^INSERT\s+INTO\s+newsletter_subscribers/i.test(query) || /^INSERT\s+OR\s+IGNORE\s+INTO\s+newsletter_subscribers/i.test(query)) {
        const email = (p[0] || '').toLowerCase().trim();
        const exists = data.newsletter_subscribers.find(s => s.email.toLowerCase() === email);
        if (exists) {
          const err = new Error('UNIQUE constraint failed: newsletter_subscribers.email');
          return callback.call(self, err);
        }
        const id = (data.newsletter_subscribers.length ? Math.max(...data.newsletter_subscribers.map(s => s.id || 0)) : 0) + 1;
        data.newsletter_subscribers.push({
          id,
          email,
          status: 'Active',
          created_at: new Date().toISOString()
        });
        self.lastID = id;
        self.changes = 1;
        save();
        return callback.call(self, null);
      }

      // 3. INSERT INTO contact_messages
      if (/^INSERT\s+INTO\s+contact_messages/i.test(query)) {
        const id = (data.contact_messages.length ? Math.max(...data.contact_messages.map(m => m.id || 0)) : 0) + 1;
        const [name, contact_info, message] = p;
        data.contact_messages.push({
          id,
          name,
          contact_info,
          message,
          created_at: new Date().toISOString()
        });
        self.lastID = id;
        self.changes = 1;
        save();
        return callback.call(self, null);
      }

      // 4. INSERT INTO analytics_events
      if (/^INSERT\s+INTO\s+analytics_events/i.test(query)) {
        const id = (data.analytics_events.length ? Math.max(...data.analytics_events.map(a => a.id || 0)) : 0) + 1;
        const [event_type, event_data, user_agent] = p;
        data.analytics_events.push({
          id,
          event_type,
          event_data,
          user_agent: user_agent || '',
          created_at: new Date().toISOString()
        });
        self.lastID = id;
        self.changes = 1;
        save();
        return callback.call(self, null);
      }

      // 5. UPDATE bookings SET status = ? WHERE id = ?
      if (/^UPDATE\s+bookings/i.test(query)) {
        const [status, id] = p;
        const booking = data.bookings.find(b => String(b.id) === String(id));
        if (booking) {
          booking.status = status;
          self.changes = 1;
          save();
        }
        return callback.call(self, null);
      }

      // 6. DELETE FROM bookings WHERE id = ?
      if (/^DELETE\s+FROM\s+bookings/i.test(query)) {
        const [id] = p;
        const initialLen = data.bookings.length;
        data.bookings = data.bookings.filter(b => String(b.id) !== String(id));
        self.changes = initialLen - data.bookings.length;
        save();
        return callback.call(self, null);
      }

      // 7. DELETE FROM newsletter_subscribers WHERE id = ?
      if (/^DELETE\s+FROM\s+newsletter_subscribers/i.test(query)) {
        const [id] = p;
        const initialLen = data.newsletter_subscribers.length;
        data.newsletter_subscribers = data.newsletter_subscribers.filter(s => String(s.id) !== String(id));
        self.changes = initialLen - data.newsletter_subscribers.length;
        save();
        return callback.call(self, null);
      }

      // Generic DDL (CREATE TABLE, etc.) - no-op success
      if (/^CREATE\s+TABLE/i.test(query)) {
        return callback.call(self, null);
      }

      return callback.call(self, null);
    } catch (err) {
      return callback.call(self, err);
    }
  },

  get(sql, params, cb) {
    const { p, callback } = normalizeParams(params, cb);
    const query = sql.trim();

    try {
      // COUNT(*) queries
      if (/SELECT\s+COUNT\(\*\)\s+as\s+count\s+FROM\s+bookings\s+WHERE\s+status\s*=\s*'Pending'/i.test(query)) {
        const count = data.bookings.filter(b => b.status === 'Pending').length;
        return callback(null, { count });
      }
      if (/SELECT\s+COUNT\(\*\)\s+as\s+count\s+FROM\s+bookings/i.test(query)) {
        return callback(null, { count: data.bookings.length });
      }
      if (/SELECT\s+COUNT\(\*\)\s+as\s+count\s+FROM\s+newsletter_subscribers/i.test(query)) {
        return callback(null, { count: data.newsletter_subscribers.length });
      }
      if (/SELECT\s+COUNT\(\*\)\s+as\s+count\s+FROM\s+analytics_events/i.test(query)) {
        return callback(null, { count: data.analytics_events.length });
      }
      return callback(null, null);
    } catch (err) {
      return callback(err);
    }
  },

  all(sql, params, cb) {
    const { p, callback } = normalizeParams(params, cb);
    const query = sql.trim();

    try {
      if (/FROM\s+bookings/i.test(query)) {
        let list = [...data.bookings];
        if (p.length > 0) {
          list = list.filter(b => b.status.toLowerCase() === String(p[0]).toLowerCase());
        }
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        if (/LIMIT\s+5/i.test(query)) {
          list = list.slice(0, 5);
        }
        return callback(null, list);
      }

      if (/FROM\s+newsletter_subscribers/i.test(query)) {
        let list = [...data.newsletter_subscribers];
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return callback(null, list);
      }

      if (/FROM\s+contact_messages/i.test(query)) {
        let list = [...data.contact_messages];
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return callback(null, list);
      }

      if (/FROM\s+analytics_events/i.test(query)) {
        let list = [...data.analytics_events];
        list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return callback(null, list);
      }

      return callback(null, []);
    } catch (err) {
      return callback(err);
    }
  },

  prepare(sql) {
    const self = this;
    return {
      run(...args) {
        const cb = typeof args[args.length - 1] === 'function' ? args.pop() : () => {};
        self.run(sql, args, cb);
      },
      finalize() {}
    };
  }
};

module.exports = db;
