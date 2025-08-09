-- MyUniverse Casino Database Schema

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deposits table
CREATE TABLE IF NOT EXISTS deposits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL,
    game VARCHAR(100) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    cashapp_tag VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Withdrawals table
CREATE TABLE IF NOT EXISTS withdrawals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    cashtag VARCHAR(50) NOT NULL,
    notes TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'pending'
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_timestamp ON deposits(timestamp);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_timestamp ON withdrawals(timestamp);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then recreate them
DO $$ 
BEGIN
    -- Drop and recreate user policies
    DROP POLICY IF EXISTS "Service role can manage users" ON users;
    CREATE POLICY "Service role can manage users" ON users
        FOR ALL USING (auth.role() = 'service_role');
    
    -- Drop and recreate deposit policies  
    DROP POLICY IF EXISTS "Service role can manage deposits" ON deposits;
    CREATE POLICY "Service role can manage deposits" ON deposits
        FOR ALL USING (auth.role() = 'service_role');
    
    -- Drop and recreate withdrawal policies
    DROP POLICY IF EXISTS "Service role can manage withdrawals" ON withdrawals;
    CREATE POLICY "Service role can manage withdrawals" ON withdrawals
        FOR ALL USING (auth.role() = 'service_role');
        
EXCEPTION 
    WHEN others THEN 
        RAISE NOTICE 'Some policies may already exist - continuing...';
END $$;
