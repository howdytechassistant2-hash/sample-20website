import { RequestHandler } from "express";
import { z } from "zod";
import {
  createUser,
  findUserByEmail,
  findUserByEmailAndPassword,
  createDeposit,
  createWithdrawal,
  getAllData,
  initializeDatabase,
} from "../lib/database";

// Initialize database on startup
initializeDatabase();

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const handleSignup: RequestHandler = async (req, res) => {
  try {
    console.log("=== SIGNUP ATTEMPT ===");
    console.log("Request body:", req.body);
    console.log("Environment check:");
    console.log("- SUPABASE_URL:", process.env.SUPABASE_URL ? "SET" : "NOT SET");
    console.log("- SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "SET" : "NOT SET");
    console.log("- SUPABASE_ANON_KEY:", process.env.SUPABASE_ANON_KEY ? "SET" : "NOT SET");

    const { username, email, password } = signupSchema.parse(req.body);

    // Check if user already exists
    console.log("Checking if user exists:", email);
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    console.log("Creating new user:", { username, email });
    const newUser = await createUser(username, email, password);
    if (!newUser) {
      console.error("❌ Failed to create user in database");
      console.error("❌ This usually means Supabase configuration is missing or RLS is blocking access");
      return res.status(500).json({
        error: "Failed to create user",
        details: "Database error - check server logs for more information"
      });
    }

    console.log("✅ User created successfully:", newUser.id);
    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof z.ZodError) {
      console.error("❌ Validation error:", error.issues);
      return res.status(400).json({ error: "Invalid input", details: error.issues });
    }
    res.status(500).json({ error: "Server error during signup", details: error.message });
  }
};

export const handleLogin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await findUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: "Invalid input" });
  }
};

export const handleDeposit: RequestHandler = async (req, res) => {
  try {
    const { userId, username, game, amount, cashappTag } = req.body;

    const deposit = await createDeposit({
      user_id: userId,
      username,
      game,
      amount,
      cashapp_tag: cashappTag,
      timestamp: new Date().toISOString(),
      status: "pending",
    });

    if (!deposit) {
      return res.status(500).json({ error: "Failed to create deposit" });
    }

    res.json({ success: true, deposit });
  } catch (error) {
    console.error("Deposit error:", error);
    res.status(400).json({ error: "Failed to process deposit" });
  }
};

export const handleWithdraw: RequestHandler = async (req, res) => {
  try {
    const { userId, username, amount, cashtag, notes } = req.body;

    const withdrawal = await createWithdrawal({
      user_id: userId,
      username,
      amount,
      cashtag,
      notes,
      timestamp: new Date().toISOString(),
      status: "pending",
    });

    if (!withdrawal) {
      return res.status(500).json({ error: "Failed to create withdrawal" });
    }

    res.json({ success: true, withdrawal });
  } catch (error) {
    console.error("Withdraw error:", error);
    res.status(400).json({ error: "Failed to process withdrawal" });
  }
};

// Admin endpoint to get all data
export const handleGetAllData: RequestHandler = async (req, res) => {
  try {
    const data = await getAllData();
    res.json(data);
  } catch (error) {
    console.error("Get all data error:", error);
    res.status(500).json({ error: "Failed to retrieve data" });
  }
};
