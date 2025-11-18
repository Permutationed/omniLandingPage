-- Create waitlist table for Omni landing page
-- Run this script in your Supabase SQL Editor

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create unique constraint on email to prevent duplicates at database level
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique ON waitlist(email);

-- Create index on created_at for sorting/filtering queries
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist(created_at DESC);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist(email);

-- Optional: Add a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) - adjust policies as needed
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for public waitlist signups)
-- Adjust this policy based on your security requirements
CREATE POLICY "Allow public inserts to waitlist"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow reads (optional - adjust based on your needs)
-- Uncomment if you want to allow reading waitlist data
-- CREATE POLICY "Allow public reads to waitlist"
--   ON waitlist
--   FOR SELECT
--   TO anon, authenticated
--   USING (true);

-- Grant necessary permissions
GRANT INSERT ON waitlist TO anon, authenticated;
-- GRANT SELECT ON waitlist TO anon, authenticated; -- Uncomment if you want public reads

