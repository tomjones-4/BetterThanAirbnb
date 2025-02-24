
-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Fake Users Table
CREATE TABLE fake_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) NOT NULL CHECK (role IN ('host', 'renter')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fake Properties Table
CREATE TABLE fake_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  location_address TEXT NOT NULL,
  location_city VARCHAR(255) NOT NULL,
  location_state VARCHAR(255) NOT NULL,
  location_country VARCHAR(255) NOT NULL,
  location_lat DECIMAL(10, 6),
  location_lng DECIMAL(10, 6),
  host_id UUID REFERENCES fake_users(id) NOT NULL,
  max_guests INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  beds INTEGER NOT NULL,
  baths INTEGER NOT NULL,
  amenities TEXT[] NOT NULL,
  rules TEXT[],
  rating DECIMAL(3, 2),
  reviews_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fake Property Images Table
CREATE TABLE fake_property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES fake_properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fake Property Availability Table
CREATE TABLE fake_property_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES fake_properties(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Fake Messages Table
CREATE TABLE fake_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES fake_users(id),
  receiver_id UUID REFERENCES fake_users(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  booking_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fake Bookings Table
CREATE TABLE fake_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES fake_properties(id),
  user_id UUID REFERENCES fake_users(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT valid_booking_dates CHECK (check_out > check_in)
);

-- Insert some fake data
INSERT INTO fake_users (id, name, email, avatar_url, role) VALUES
  ('d1c0b714-5e71-4b34-b2c3-916d69262915', 'John Host', 'john@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', 'host'),
  ('82c0b714-5e71-4b34-b2c3-916d69262916', 'Alice Renter', 'alice@example.com', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', 'renter');

INSERT INTO fake_properties (
  id, title, description, price, location_address, location_city, location_state, 
  location_country, location_lat, location_lng, host_id, max_guests, 
  bedrooms, beds, baths, amenities, rules
) VALUES (
  '91c0b714-5e71-4b34-b2c3-916d69262917',
  'Cozy Lake House',
  'Beautiful lake house with amazing views',
  250.00,
  '123 Lake St',
  'Lake City',
  'California',
  'USA',
  37.7749,
  -122.4194,
  'd1c0b714-5e71-4b34-b2c3-916d69262915',
  4,
  2,
  2,
  2,
  ARRAY['WiFi', 'Kitchen', 'Lake View', 'Parking'],
  ARRAY['No smoking', 'No parties', 'No pets']
);

INSERT INTO fake_property_images (property_id, url, position) VALUES
('91c0b714-5e71-4b34-b2c3-916d69262917', 'https://picsum.photos/seed/1/800/600', 1),
('91c0b714-5e71-4b34-b2c3-916d69262917', 'https://picsum.photos/seed/2/800/600', 2);

INSERT INTO fake_property_availability (property_id, start_date, end_date) VALUES
('91c0b714-5e71-4b34-b2c3-916d69262917', CURRENT_DATE, (CURRENT_DATE + INTERVAL '30 days'));

