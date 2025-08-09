import { RequestHandler } from "express";
import { z } from "zod";
import {
  createMessage,
  getUserMessages,
  markMessageAsRead,
  getUnreadMessageCount,
  findUserByEmail
} from "../lib/database";

const sendMessageSchema = z.object({
  userEmail: z.string().email().optional(),
  userId: z.string().optional(),
  username: z.string().optional(),
  title: z.string().min(1),
  content: z.string().min(1),
  messageType: z.string().default('info')
});

const markReadSchema = z.object({
  messageId: z.string()
});

// Send message to a user (Admin only)
export const handleSendMessage: RequestHandler = async (req, res) => {
  try {
    const { userEmail, userId, username, title, content, messageType } = sendMessageSchema.parse(req.body);

    let targetUserId = userId;
    let targetUsername = username;

    // If email provided, find the user
    if (userEmail && !targetUserId) {
      const user = await findUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      targetUserId = user.id;
      targetUsername = user.username;
    }

    if (!targetUserId || !targetUsername) {
      return res.status(400).json({ error: "User ID and username are required" });
    }

    const message = await createMessage({
      user_id: targetUserId,
      username: targetUsername,
      title,
      content,
      message_type: messageType,
      is_read: false,
      sent_at: new Date().toISOString()
    });

    if (!message) {
      return res.status(500).json({ error: "Failed to send message" });
    }

    res.json({ success: true, message });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(400).json({ error: "Invalid input" });
  }
};

// Send message to all users (Admin only)
export const handleSendBroadcast: RequestHandler = async (req, res) => {
  try {
    const { title, content, messageType } = z.object({
      title: z.string().min(1),
      content: z.string().min(1),
      messageType: z.string().default('info')
    }).parse(req.body);

    // This is a simplified broadcast - in practice you'd want to batch this
    // For now, we'll just return success and let admin send to individual users
    res.json({ 
      success: true, 
      message: "Broadcast feature - use send message to individual users for now" 
    });
  } catch (error) {
    console.error("Broadcast message error:", error);
    res.status(400).json({ error: "Invalid input" });
  }
};

// Get messages for logged-in user
export const handleGetUserMessages: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const messages = await getUserMessages(userId);
    res.json({ messages });
  } catch (error) {
    console.error("Get user messages error:", error);
    res.status(500).json({ error: "Failed to get messages" });
  }
};

// Mark message as read
export const handleMarkMessageRead: RequestHandler = async (req, res) => {
  try {
    const { messageId } = markReadSchema.parse(req.body);

    const success = await markMessageAsRead(messageId);
    if (!success) {
      return res.status(500).json({ error: "Failed to mark message as read" });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Mark message read error:", error);
    res.status(400).json({ error: "Invalid input" });
  }
};

// Get unread message count for user
export const handleGetUnreadCount: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const count = await getUnreadMessageCount(userId);
    res.json({ count });
  } catch (error) {
    console.error("Get unread count error:", error);
    res.status(500).json({ error: "Failed to get unread count" });
  }
};
