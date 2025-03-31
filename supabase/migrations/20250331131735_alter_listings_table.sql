-- Rename the location column to address
ALTER TABLE listings RENAME COLUMN location TO address;

-- Add the start_date column
ALTER TABLE listings ADD COLUMN start_date DATE;

-- Add the end_date column
ALTER TABLE listings ADD COLUMN end_date DATE;
