-- ╔══════════════════════════════════════════════════════════════════════╗
-- ║          DriveRENT — Supabase Database Schema                        ║
-- ║  انسخ هذا الكود كاملاً في Supabase > SQL Editor > Run               ║
-- ╚══════════════════════════════════════════════════════════════════════╝

-- ── 1. AGENCIES ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agencies (
  id          SERIAL PRIMARY KEY,
  ar          TEXT NOT NULL,
  fr          TEXT,
  city_ar     TEXT,
  city_fr     TEXT,
  wilaya      TEXT,
  initials    TEXT,
  rating      NUMERIC(3,2) DEFAULT 4.5,
  trips       INTEGER DEFAULT 0,
  exp         INTEGER DEFAULT 1,
  verified    BOOLEAN DEFAULT FALSE,
  phone       TEXT,
  about_ar    TEXT,
  about_fr    TEXT,
  about_en    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 2. CARS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS cars (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  type        TEXT NOT NULL DEFAULT 'sedan',
  price       INTEGER NOT NULL,
  rating      NUMERIC(3,2) DEFAULT 0,
  trips       INTEGER DEFAULT 0,
  reviews     INTEGER DEFAULT 0,
  year        INTEGER DEFAULT 2022,
  seats       INTEGER DEFAULT 5,
  agency_id   INTEGER REFERENCES agencies(id) ON DELETE SET NULL,
  wilaya      TEXT,
  img         TEXT,
  tags        TEXT[] DEFAULT '{}',
  wedding     BOOLEAN DEFAULT FALSE,
  badge       TEXT,
  brand       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. USERS ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  username    TEXT UNIQUE NOT NULL,
  password    TEXT NOT NULL,
  name        TEXT,
  phone       TEXT UNIQUE,
  email       TEXT,
  avatar      TEXT,
  provider    TEXT DEFAULT 'manual',
  role        TEXT DEFAULT 'user',
  join_date   TIMESTAMPTZ DEFAULT NOW(),
  last_login  TIMESTAMPTZ DEFAULT NOW(),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. PENDING_REQUESTS (طلبات إنشاء الحساب تنتظر موافقة الأدمن) ─────────────
CREATE TABLE IF NOT EXISTS pending_requests (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  username     TEXT NOT NULL,
  password     TEXT NOT NULL,
  name         TEXT,
  phone        TEXT,
  avatar       TEXT,
  provider     TEXT DEFAULT 'manual',
  status       TEXT DEFAULT 'pending',  -- pending | approved | rejected
  request_date TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. BOOKINGS ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id            SERIAL PRIMARY KEY,
  ref           TEXT UNIQUE,
  car_id        INTEGER REFERENCES cars(id) ON DELETE SET NULL,
  car_name      TEXT,
  car_img       TEXT,
  agency_id     INTEGER REFERENCES agencies(id) ON DELETE SET NULL,
  user_id       TEXT,
  client_name   TEXT NOT NULL,
  client_phone  TEXT NOT NULL,
  client_email  TEXT,
  wilaya        TEXT,
  address       TEXT,
  id_type       TEXT DEFAULT 'national',
  id_number     TEXT,
  from_date     DATE NOT NULL,
  to_date       DATE NOT NULL,
  days          INTEGER NOT NULL,
  pickup_time   TEXT DEFAULT '10:00',
  notes         TEXT,
  pay_method    TEXT DEFAULT 'cash',
  price         INTEGER,
  fee           INTEGER,
  total         INTEGER,
  status        TEXT DEFAULT 'pending',  -- pending | confirmed | cancelled | completed
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ── 6. REVIEWS ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS reviews (
  id           SERIAL PRIMARY KEY,
  target_type  TEXT NOT NULL,   -- 'car' | 'agency'
  target_id    INTEGER NOT NULL,
  user_id      TEXT,
  name         TEXT,
  phone        TEXT,
  avatar       TEXT,
  rating       INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      TEXT,
  date         DATE DEFAULT CURRENT_DATE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 7. AGENCY_REQUESTS (طلبات تسجيل وكالة جديدة) ────────────────────────────
CREATE TABLE IF NOT EXISTS agency_requests (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  name         TEXT NOT NULL,
  owner        TEXT,
  wilaya       TEXT,
  phone        TEXT,
  email        TEXT,
  cars         TEXT,
  address      TEXT,
  desc         TEXT,
  username     TEXT,
  status       TEXT DEFAULT 'pending',  -- pending | approved | rejected
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── 8. CONVERSATIONS ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS conversations (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id     TEXT,
  agency_id   INTEGER REFERENCES agencies(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, agency_id)
);

-- ── 9. MESSAGES ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id              SERIAL PRIMARY KEY,
  conversation_id TEXT REFERENCES conversations(id) ON DELETE CASCADE,
  from_role       TEXT NOT NULL,  -- 'user' | 'agency'
  text            TEXT,
  status          TEXT DEFAULT 'sent',  -- sent | delivered | read
  attach_type     TEXT,   -- 'image' | 'doc' | NULL
  attach_name     TEXT,
  attach_url      TEXT,
  attach_size     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Enable RLS ────────────────────────────────────────────────────────────────
ALTER TABLE agencies          ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars              ENABLE ROW LEVEL SECURITY;
ALTER TABLE users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE pending_requests  ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews           ENABLE ROW LEVEL SECURITY;
ALTER TABLE agency_requests   ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations     ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages          ENABLE ROW LEVEL SECURITY;

-- ── RLS Policies — Public READ for cars & agencies ────────────────────────────
CREATE POLICY "Public read agencies"   ON agencies         FOR SELECT USING (TRUE);
CREATE POLICY "Public read cars"       ON cars             FOR SELECT USING (TRUE);
CREATE POLICY "Public read reviews"    ON reviews          FOR SELECT USING (TRUE);
CREATE POLICY "Public insert reviews"  ON reviews          FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert bookings" ON bookings         FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public read bookings"   ON bookings         FOR SELECT USING (TRUE);
CREATE POLICY "Public insert ag_req"   ON agency_requests  FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public insert pending"  ON pending_requests FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "Public read pending"    ON pending_requests FOR SELECT USING (TRUE);
CREATE POLICY "Public manage convs"    ON conversations    FOR ALL   USING (TRUE);
CREATE POLICY "Public manage messages" ON messages         FOR ALL   USING (TRUE);
CREATE POLICY "Public read users"      ON users            FOR SELECT USING (TRUE);
CREATE POLICY "Public insert users"    ON users            FOR INSERT WITH CHECK (TRUE);

-- ── Seed Agencies ─────────────────────────────────────────────────────────────
INSERT INTO agencies (id, ar, fr, city_ar, city_fr, wilaya, initials, rating, trips, exp, verified, phone, about_ar, about_fr, about_en)
VALUES
  (1, 'وكالة الجزائر العاصمة', 'Agence Alger Centre', 'الجزائر', 'Alger', '16', 'وج', 4.9, 450, 8, TRUE, '+213 555 12 34 56', 'وكالة رائدة في تأجير السيارات بالجزائر العاصمة منذ 2016.', 'Agence leader de location à Alger depuis 2016.', 'Leading car rental agency in Algiers since 2016.'),
  (2, 'وهران درايف', 'Oran Drive', 'وهران', 'Oran', '31', 'ود', 4.8, 312, 5, TRUE, '+213 555 98 76 54', 'أفضل خدمة تأجير في وهران.', 'Meilleure location à Oran.', 'Best car rental in Oran.'),
  (3, 'قسنطينة بريميوم', 'Constantine Premium', 'قسنطينة', 'Constantine', '25', 'قب', 4.85, 280, 6, TRUE, '+213 555 44 55 66', 'سيارات فاخرة في مدينة الجسور.', 'Voitures de luxe à Constantine.', 'Luxury cars in the City of Bridges.'),
  (4, 'عنابة للسيارات', 'Annaba Cars', 'عنابة', 'Annaba', '23', 'عس', 4.7, 195, 4, FALSE, '+213 555 77 88 99', 'خدمة موثوقة في عنابة.', 'Service fiable à Annaba.', 'Reliable service in Annaba.'),
  (5, 'سطيف أوتو', 'Sétif Auto', 'سطيف', 'Sétif', '19', 'سا', 4.75, 220, 3, TRUE, '+213 555 33 22 11', 'الوكالة الأولى في سطيف.', 'Première agence à Sétif.', 'Top agency in Sétif.'),
  (6, 'تيزي وزو للأعراس', 'Tizi Wedding Cars', 'تيزي وزو', 'Tizi Ouzou', '15', 'تع', 4.95, 180, 7, TRUE, '+213 555 66 77 88', 'متخصصون في سيارات الأعراس.', 'Spécialistes des voitures de mariage.', 'Wedding car specialists.')
ON CONFLICT (id) DO NOTHING;

-- ── Seed Sample Cars ──────────────────────────────────────────────────────────
INSERT INTO cars (id, name, type, price, rating, trips, reviews, year, seats, agency_id, wilaya, img, tags, wedding, badge, brand)
VALUES
  (1,  'Mercedes S-Class',       'luxury',  15000, 4.95, 128, 94,  2023, 5, 1, '16', 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80', ARRAY['instant','verified'],             FALSE, 'فاخرة',    'Mercedes'),
  (2,  'BMW 5 Series',           'luxury',  12000, 4.9,  87,  72,  2022, 5, 2, '31', 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80', ARRAY['verified'],                        FALSE, 'فاخرة',    'BMW'),
  (3,  'Toyota RAV4',            'suv',     7000,  4.85, 203, 181, 2023, 7, 1, '16', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=600&q=80', ARRAY['instant','freeCancel','verified'], FALSE, 'SUV',      'Toyota'),
  (4,  'Tesla Model 3',          'electric',9000,  4.95, 65,  58,  2024, 5, 3, '25', 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80', ARRAY['instant','freeCancel'],           FALSE, 'كهربائية', 'Tesla'),
  (5,  'Rolls-Royce Phantom',    'wedding', 80000, 5.0,  42,  42,  2023, 5, 6, '15', 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=600&q=80', ARRAY['instant','verified'],             TRUE,  'زفاف',     'Rolls-Royce'),
  (6,  'Bentley Continental GT', 'wedding', 65000, 4.98, 38,  37,  2022, 4, 6, '15', 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80', ARRAY['verified'],                        TRUE,  'زفاف',     'Bentley'),
  (7,  'Range Rover Vogue',      'wedding', 45000, 4.9,  55,  51,  2023, 5, 2, '31', 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80', ARRAY['instant','freeCancel','verified'], TRUE,  'زفاف',     'Range Rover'),
  (8,  'Volkswagen Golf',        'sedan',   4500,  4.8,  175, 160, 2023, 5, 4, '23', 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80', ARRAY['instant'],                         FALSE, 'سيدان',    'Volkswagen'),
  (9,  'Dacia Duster',           'suv',     3500,  4.75, 310, 278, 2022, 5, 5, '19', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', ARRAY['freeCancel'],                      FALSE, 'SUV',      'Dacia'),
  (10, 'Toyota Land Cruiser',    '4x4',     16000, 4.9,  95,  88,  2023, 7, 1, '16', 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', ARRAY['instant','freeCancel','verified'], FALSE, '4×4',      'Toyota')
ON CONFLICT (id) DO NOTHING;

-- Reset sequences after seed
SELECT setval('agencies_id_seq', (SELECT MAX(id) FROM agencies));
SELECT setval('cars_id_seq',     (SELECT MAX(id) FROM cars));

-- ── Enable Realtime for messages ──────────────────────────────────────────────
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
