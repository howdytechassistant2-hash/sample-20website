import { RequestHandler } from "express";
import { z } from "zod";

// Simple in-memory database for demo purposes
// In production, you'd use a real database
const users: Array<{
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}> = [];

const deposits: Array<{
  id: string;
  userId: string;
  username: string;
  game: string;
  amount: number;
  cashappTag: string;
  timestamp: string;
  status: string;
}> = [];

const withdrawals: Array<{
  id: string;
  userId: string;
  username: string;
  amount: number;
  cashtag: string;
  notes?: string;
  timestamp: string;
  status: string;
}> = [];

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const handleSignup: RequestHandler = (req, res) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);

    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, hash this password!
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
};

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).json({ error: "Invalid input" });
  }
};

export const handleDeposit: RequestHandler = (req, res) => {
  try {
    const { userId, username, game, amount, cashappTag } = req.body;

    const deposit = {
      id: Date.now().toString(),
      userId,
      username,
      game,
      amount,
      cashappTag,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    deposits.push(deposit);
    res.json({ success: true, deposit });
  } catch (error) {
    res.status(400).json({ error: "Failed to process deposit" });
  }
};

export const handleWithdraw: RequestHandler = (req, res) => {
  try {
    const { userId, username, amount, cashtag, notes } = req.body;

    const withdrawal = {
      id: Date.now().toString(),
      userId,
      username,
      amount,
      cashtag,
      notes,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    withdrawals.push(withdrawal);
    res.json({ success: true, withdrawal });
  } catch (error) {
    res.status(400).json({ error: "Failed to process withdrawal" });
  }
};

// Admin endpoint to get all data
export const handleGetAllData: RequestHandler = (req, res) => {
  res.json({
    users: users.map(u => ({ ...u, password: '[HIDDEN]' })),
    deposits,
    withdrawals
  });
};
