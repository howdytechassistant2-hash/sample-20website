const serverless = require('serverless-http');
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { z } = require('zod');

// Supabase setup
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey && !supabaseUrl.includes('REPLACE-WITH')
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Validation schemas
const signupSchema = z.object({
  username: z
    .string()
    .min(7, "Username must be at least 7 characters")
    .max(13, "Username must be at most 13 characters")
    .regex(/^MUC/, "Username must begin with MUC")
    .regex(/^[A-Za-z0-9]+$/, "Username can only contain letters and numbers")
    .regex(/[A-Za-z]/, "Username must contain at least one letter")
    .regex(/[0-9]/, "Username must contain at least one number"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/, "Password contains invalid characters"),
});

// Helper functions
async function createUser(username, email, password) {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ username, email, password, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) {
      console.error("❌ Supabase insert error:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("❌ Unexpected error during user creation:", error);
    return null;
  }
}

async function findUserByEmail(email) {
  if (!supabase) return null;
  
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    
    if (error) return null;
    return data;
  } catch (error) {
    return null;
  }
}

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    message: "✅ MyUniverse Casino API is running on AWS Lambda!",
    timestamp: new Date().toISOString(),
    environment: {
      SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET",
      supabaseInitialized: supabase ? "YES" : "NO"
    }
  });
});

// Auth endpoints
app.post('/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);
    
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists", email });
    }
    
    const newUser = await createUser(username, email, password);
    if (!newUser) {
      return res.status(500).json({ error: "Failed to create user" });
    }
    
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    res.status(500).json({ error: "Server error during signup" });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!supabase) {
      return res.status(500).json({ error: "Database not configured" });
    }
    
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();
    
    if (error || !data) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    
    const { password: _, ...userWithoutPassword } = data;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Deposit endpoint
app.post('/deposit', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Database not configured" });
    }
    
    const { userId, username, game, amount, cashappTag, timestamp } = req.body;
    
    const { data, error } = await supabase
      .from("deposits")
      .insert([{
        user_id: userId,
        username,
        game,
        amount: parseFloat(amount),
        cashapp_tag: cashappTag,
        timestamp: timestamp || new Date().toISOString(),
        status: "pending"
      }])
      .select()
      .single();
    
    if (error) {
      return res.status(500).json({ error: "Failed to save deposit request" });
    }
    
    res.json({
      success: true,
      message: `Deposit request submitted for ${game} - $${amount}`,
      data
    });
  } catch (error) {
    console.error("❌ Deposit error:", error);
    res.status(500).json({ error: "Server error during deposit" });
  }
});

// Withdrawal endpoint
app.post('/withdraw', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({ error: "Database not configured" });
    }
    
    const { userId, username, amount, cashtag, notes, timestamp } = req.body;
    
    const { data, error } = await supabase
      .from("withdrawals")
      .insert([{
        user_id: userId,
        username,
        amount: parseFloat(amount),
        cashtag,
        notes: notes || null,
        timestamp: timestamp || new Date().toISOString(),
        status: "pending"
      }])
      .select()
      .single();
    
    if (error) {
      return res.status(500).json({ error: "Failed to save withdrawal request" });
    }
    
    res.json({
      success: true,
      message: `Withdrawal request submitted for $${amount} to ${cashtag}`,
      data
    });
  } catch (error) {
    console.error("❌ Withdrawal error:", error);
    res.status(500).json({ error: "Server error during withdrawal" });
  }
});

// Export Lambda handler
module.exports.handler = serverless(app);
