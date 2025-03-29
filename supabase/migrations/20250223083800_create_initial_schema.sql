-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Properties table
CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  price DECIMAL(10, 2),
  amenities TEXT[], -- Example: ["wifi", "parking", "pool"]
  property_type VARCHAR(50), -- e.g., "Apartment", "House", "Condo"
  bedrooms INTEGER,
  bathrooms INTEGER,
  max_guests INTEGER,
  host_id UUID REFERENCES auth.users(id), -- Assuming you will use Supabase auth users table
  address TEXT,
  price NUMERIC,
  property_type VARCHAR(50)
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES listings(id),
  user_id UUID NOT NULL REFERENCES auth.users(id), -- Assuming you will use Supabase auth users table
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2),
  booking_status VARCHAR(50) -- e.g., "pending", "confirmed", "cancelled"
);


-- Property Images table
CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES listings(id),
  image_url VARCHAR(255) NOT NULL,
  image_path VARCHAR(255)
);

-- Users profile table (Optional - you can also directly use auth.users table)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),  -- Link to Supabase auth.users table
    full_name VARCHAR(255),
    phone_number VARCHAR(20),
    profile_image_url VARCHAR(255)
);
