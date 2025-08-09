import { createClient } from "@supabase/supabase-js";

// Database configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

// Check if Supabase is configured
if (
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes("REPLACE-WITH") ||
  supabaseKey.includes("REPLACE-WITH")
) {
  console.warn(
    "⚠️  Supabase not configured properly. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.",
  );
}

export const supabase =
  supabaseUrl && supabaseKey && !supabaseUrl.includes("REPLACE-WITH")
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Database types
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

export interface Deposit {
  id: string;
  user_id: string;
  username: string;
  game: string;
  amount: number;
  cashapp_tag: string;
  timestamp: string;
  status: string;
}

export interface Withdrawal {
  id: string;
  user_id: string;
  username: string;
  amount: number;
  cashtag: string;
  notes?: string;
  timestamp: string;
  status: string;
}

// Initialize database tables if they don't exist
export async function initializeDatabase() {
  if (!supabase) {
    console.log(
      "⚠️  Skipping database initialization - Supabase not configured",
    );
    return;
  }

  try {
    console.log("🚀 Initializing database connection...");
    // Simple connection test
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

// User operations
export async function createUser(
  username: string,
  email: string,
  password: string,
): Promise<User | null> {
  if (!supabase) {
    console.error("❌ Cannot create user - Supabase not configured properly");
    console.error(
      "❌ Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables",
    );
    console.error("❌ Current SUPABASE_URL:", process.env.SUPABASE_URL);
    console.error(
      "❌ Current SUPABASE_ANON_KEY:",
      process.env.SUPABASE_ANON_KEY ? "SET" : "NOT SET",
    );
    return null;
  }

  try {
    console.log("🔄 Attempting to create user in Supabase:", {
      username,
      email,
    });
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          username,
          email,
          password, // In production, hash this!
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase create user error:", error);
      console.error(
        "❌ Error details:",
        error.message,
        error.details,
        error.hint,
      );
      return null;
    }

    console.log("✅ User created successfully in Supabase");
    return data;
  } catch (error) {
    console.error("❌ Unexpected error creating user:", error);
    return null;
  }
}

export async function findUserByEmail(email: string): Promise<User | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

export async function findUserByEmailAndPassword(
  email: string,
  password: string,
): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

// Deposit operations
export async function createDeposit(
  depositData: Omit<Deposit, "id">,
): Promise<Deposit | null> {
  try {
    const { data, error } = await supabase
      .from("deposits")
      .insert([depositData])
      .select()
      .single();

    if (error) {
      console.error("Create deposit error:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Create deposit error:", error);
    return null;
  }
}

// Withdrawal operations
export async function createWithdrawal(
  withdrawalData: Omit<Withdrawal, "id">,
): Promise<Withdrawal | null> {
  try {
    const { data, error } = await supabase
      .from("withdrawals")
      .insert([withdrawalData])
      .select()
      .single();

    if (error) {
      console.error("Create withdrawal error:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Create withdrawal error:", error);
    return null;
  }
}

// Admin operations
export async function getAllData() {
  try {
    const [usersResult, depositsResult, withdrawalsResult] = await Promise.all([
      supabase.from("users").select("id, username, email, created_at"),
      supabase.from("deposits").select("*"),
      supabase.from("withdrawals").select("*"),
    ]);

    return {
      users: usersResult.data || [],
      deposits: depositsResult.data || [],
      withdrawals: withdrawalsResult.data || [],
    };
  } catch (error) {
    console.error("Get all data error:", error);
    return {
      users: [],
      deposits: [],
      withdrawals: [],
    };
  }
}
