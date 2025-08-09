import { createClient } from "@supabase/supabase-js";

// Database configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Debug environment variables
console.log("🔍 Environment check:", {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseKey,
  urlPrefix: supabaseUrl?.substring(0, 20) + "...",
  keyPrefix: supabaseKey?.substring(0, 20) + "...",
});

// Check if Supabase is configured
if (
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes("REPLACE-WITH") ||
  supabaseKey.includes("REPLACE-WITH")
) {
  console.warn(
    "⚠️  Supabase not configured properly. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
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
    console.error("❌ Cannot create user - Supabase not configured");
    return null;
  }

  try {
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
      console.error("Create user error:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Create user error:", error);
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

<<<<<<< HEAD
// Admin operations
export async function getAllData() {
  try {
    const [usersResult, depositsResult, withdrawalsResult] = await Promise.all([
      supabase.from("users").select("id, username, email, created_at"),
      supabase.from("deposits").select("*"),
      supabase.from("withdrawals").select("*"),
    ]);
=======
// Message operations
export async function createMessage(
  messageData: Omit<Message, "id">,
): Promise<Message | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert([messageData])
      .select()
      .single();

    if (error) {
      console.error("Create message error:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Create message error:", error);
    return null;
  }
}

export async function getUserMessages(userId: string): Promise<Message[]> {
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("user_id", userId)
      .order("sent_at", { ascending: false });

    if (error) {
      console.error("Get user messages error:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Get user messages error:", error);
    return [];
  }
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  if (!supabase) return false;

  try {
    const { error } = await supabase
      .from("messages")
      .update({
        is_read: true,
        read_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    if (error) {
      console.error("Mark message as read error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Mark message as read error:", error);
    return false;
  }
}

export async function getUnreadMessageCount(userId: string): Promise<number> {
  if (!supabase) return 0;

  try {
    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) {
      console.error("Get unread count error:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Get unread count error:", error);
    return 0;
  }
}

// Admin operations
export async function getAllData() {
  try {
    const [usersResult, depositsResult, withdrawalsResult, messagesResult] =
      await Promise.all([
        supabase.from("users").select("id, username, email, created_at"),
        supabase.from("deposits").select("*"),
        supabase.from("withdrawals").select("*"),
        supabase.from("messages").select("*"),
      ]);
>>>>>>> 80d9eb1062028fd1da649027b2f900235dea54f6

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
