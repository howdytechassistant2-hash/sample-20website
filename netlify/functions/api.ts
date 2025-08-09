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
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
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
        details: "Database error - check environment variables and database schema",
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
    ],
    message: "Try visiting the root / or /ping endpoints first",
  });
});

// Export the serverless handler
const handler: Handler = serverless(app);
export { handler };
