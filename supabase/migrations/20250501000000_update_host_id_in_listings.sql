-- Make the host_id column in listings table NOT NULL
ALTER TABLE listings
ALTER COLUMN host_id SET NOT NULL;

-- Add a comment explaining the column purpose
COMMENT ON COLUMN listings.host_id IS 'References the user who created the listing';

-- Update any existing NULL host_id records (if migration fails due to existing NULL values)
-- You may want to adjust this based on your specific needs
-- UPDATE listings SET host_id = (SELECT id FROM auth.users LIMIT 1) WHERE host_id IS NULL;