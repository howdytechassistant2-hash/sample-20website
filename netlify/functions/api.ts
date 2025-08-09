import type { Handler } from "@netlify/functions";
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import { z } from "zod";

// Import database functions directly
import { createClient } from "@supabase/supabase-js";

// Database configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes("REPLACE-WITH")
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
    .regex(
      /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/,
      "Password contains invalid characters",
    ),
});

// Helper functions
async function createUser(username: string, email: string, password: string) {
  if (!supabase) {
    console.error("❌ Supabase not configured - missing URL or key");
    return null;
  }

  try {
    console.log("🔄 Attempting to insert user into database...");
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      console.error("❌ Error code:", error.code);
      console.error("❌ Error message:", error.message);
      console.error("❌ Error details:", error.details);
      return null;
    }

    console.log("✅ User successfully inserted into database");
    return data;
  } catch (error) {
    console.error("❌ Unexpected error during user creation:", error);
    return null;
  }
}

async function findUserByEmail(email: string) {
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

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Add middleware to log all requests for debugging
app.use((req, res, next) => {
  console.log("📍 Request:", req.method, req.originalUrl, req.path);
  console.log("📍 Headers:", req.headers);
  next();
});

// Health check endpoints - Netlify sends paths without the function name
app.get("/", (req, res) => {
  res.json({
    message: "✅ API root is working!",
    timestamp: new Date().toISOString(),
    environment: {
      SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? "SET"
        : "NOT SET",
      supabaseInitialized: supabase ? "YES" : "NO",
    },
  });
});

app.get("/ping", (req, res) => {
  res.json({
    message: "✅ Ping endpoint working!",
    timestamp: new Date().toISOString(),
    environment: {
      SUPABASE_URL: process.env.SUPABASE_URL ? "SET" : "NOT SET",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? "SET"
        : "NOT SET",
      supabaseInitialized: supabase ? "YES" : "NO",
    },
  });
});

// Signup endpoint - Netlify will send /auth/signup (without /api prefix)
app.post("/auth/signup", async (req, res) => {
  try {
    console.log("=== SIGNUP ATTEMPT ===");
    console.log("Request body:", req.body);
    console.log("Environment check:");
    console.log(
      "- SUPABASE_URL:",
      process.env.SUPABASE_URL ? "SET" : "NOT SET",
    );
    console.log(
      "- SUPABASE_SERVICE_ROLE_KEY:",
      process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET",
    );
    console.log(
      "- Supabase client:",
      supabase ? "INITIALIZED" : "NOT INITIALIZED",
    );

    const { username, email, password } = signupSchema.parse(req.body);

    // Check if user already exists
    console.log("Checking if user exists:", email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({
        error: "User already exists",
        email: email,
      });
    }

    // Create new user
    console.log("Creating new user:", { username, email });
    const newUser = await createUser(username, email, password);
    if (!newUser) {
      console.error("❌ Failed to create user in database");
      return res.status(500).json({
        error: "Failed to create user",
        details:
          "Database error - check environment variables and database schema",
      });
    }

    console.log("✅ User created successfully:", newUser.id);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof z.ZodError) {
      console.error("❌ Validation error:", error.issues);
      return res.status(400).json({
        error: "Invalid input",
        details: error.issues,
        message: "Please check your input fields",
      });
    }
    res.status(500).json({
      error: "Server error during signup",
      details: error.message || "Unknown server error",
    });
  }
});

// Also handle /api/auth/signup for frontend compatibility
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("=== API SIGNUP ATTEMPT ===");
    console.log("Request body:", req.body);
    console.log("Environment check:");
    console.log(
      "- SUPABASE_URL:",
      process.env.SUPABASE_URL ? "SET" : "NOT SET",
    );
    console.log(
      "- SUPABASE_SERVICE_ROLE_KEY:",
      process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET",
    );
    console.log(
      "- Supabase client:",
      supabase ? "INITIALIZED" : "NOT INITIALIZED",
    );

    const { username, email, password } = signupSchema.parse(req.body);

    // Check if user already exists
    console.log("Checking if user exists:", email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({
        error: "User already exists",
        email: email,
      });
    }

    // Create new user
    console.log("Creating new user:", { username, email });
    const newUser = await createUser(username, email, password);
    if (!newUser) {
      console.error("❌ Failed to create user in database");
      return res.status(500).json({
        error: "Failed to create user",
        details:
          "Database error - check environment variables and database schema",
      });
    }

    console.log("✅ User created successfully:", newUser.id);
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof z.ZodError) {
      console.error("❌ Validation error:", error.issues);
      return res.status(400).json({
        error: "Invalid input",
        details: error.issues,
        message: "Please check your input fields",
      });
    }
    res.status(500).json({
      error: "Server error during signup",
      details: error.message || "Unknown server error",
    });
  }
});

// Login endpoint - Netlify will send /auth/login
app.post("/auth/login", async (req, res) => {
  try {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Request body:", req.body);

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
      console.log("❌ Login failed for:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", email);
    const { password: _, ...userWithoutPassword } = data;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Also handle /api/auth/login for frontend compatibility
app.post("/api/auth/login", async (req, res) => {
  try {
    console.log("=== API LOGIN ATTEMPT ===");
    console.log("Request body:", req.body);

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
      console.log("❌ Login failed for:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", email);
    const { password: _, ...userWithoutPassword } = data;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Deposit endpoint
app.post("/api/deposit", async (req, res) => {
  try {
    console.log("=== DEPOSIT REQUEST ===");
    console.log("Request body:", req.body);

    if (!supabase) {
      console.error("❌ Supabase not configured for deposit");
      return res.status(500).json({ error: "Database not configured" });
    }

    const { userId, username, game, amount, cashappTag, timestamp } = req.body;

    // Validate required fields
    if (!userId || !username || !game || !amount || !cashappTag) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["userId", "username", "game", "amount", "cashappTag"]
      });
    }

    // Insert deposit into database
    console.log("🔄 Inserting deposit into database...");
    const { data, error } = await supabase
      .from("deposits")
      .insert([
        {
          user_id: userId,
          username,
          game,
          amount: parseFloat(amount),
          cashapp_tag: cashappTag,
          timestamp: timestamp || new Date().toISOString(),
          status: 'pending'
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase deposit insert error:", error);
      return res.status(500).json({
        error: "Failed to save deposit request",
        details: error.message
      });
    }

    console.log("✅ Deposit saved successfully:", data.id);
    res.json({
      success: true,
      message: `Deposit request submitted for ${game} - $${amount}`,
      data: {
        id: data.id,
        userId,
        username,
        game,
        amount: parseFloat(amount),
        cashappTag,
        timestamp: data.timestamp,
        status: data.status
      }
    });
  } catch (error) {
    console.error("❌ Deposit error:", error);
    res.status(500).json({
      error: "Server error during deposit",
      details: error.message || "Unknown server error",
    });
  }
});

// Withdraw endpoint
app.post("/api/withdraw", async (req, res) => {
  try {
    console.log("=== WITHDRAW REQUEST ===");
    console.log("Request body:", req.body);

    if (!supabase) {
      console.error("❌ Supabase not configured for withdrawal");
      return res.status(500).json({ error: "Database not configured" });
    }

    const { userId, username, amount, cashtag, notes, timestamp } = req.body;

    // Validate required fields
    if (!userId || !username || !amount || !cashtag) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["userId", "username", "amount", "cashtag"]
      });
    }

    // Insert withdrawal into database
    console.log("🔄 Inserting withdrawal into database...");
    const { data, error } = await supabase
      .from("withdrawals")
      .insert([
        {
          user_id: userId,
          username,
          amount: parseFloat(amount),
          cashtag,
          notes: notes || null,
          timestamp: timestamp || new Date().toISOString(),
          status: 'pending'
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase withdrawal insert error:", error);
      return res.status(500).json({
        error: "Failed to save withdrawal request",
        details: error.message
      });
    }

    console.log("✅ Withdrawal saved successfully:", data.id);
    res.json({
      success: true,
      message: `Withdrawal request submitted for $${amount} to ${cashtag}`,
      data: {
        id: data.id,
        userId,
        username,
        amount: parseFloat(amount),
        cashtag,
        notes,
        timestamp: data.timestamp,
        status: data.status
      }
    });
  } catch (error) {
    console.error("❌ Withdraw error:", error);
    res.status(500).json({
      error: "Server error during withdrawal",
      details: error.message || "Unknown server error",
    });
  }
});

// Debug route to see what paths are being called
app.use("*", (req, res) => {
  console.log("❌ Unmatched route:", req.method, req.originalUrl, req.path);
  console.log("❌ Base URL:", req.baseUrl);
  console.log("❌ Query:", req.query);

  res.status(404).json({
    error: "Route not found",
    requestInfo: {
      method: req.method,
      originalUrl: req.originalUrl,
      path: req.path,
      baseUrl: req.baseUrl,
      query: req.query,
    },
    availableRoutes: [
      "/",
      "/ping",
      "/api/ping",
      "/auth/signup",
      "/api/auth/signup",
      "/auth/login",
      "/api/auth/login",
      "/api/deposit",
      "/api/withdraw",
    ],
    message: "Try visiting the root / or /ping endpoints first",
  });
});

// Export the serverless handler
const handler: Handler = serverless(app);
export { handler };
