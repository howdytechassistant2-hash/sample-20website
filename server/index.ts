import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleSignup,
  handleLogin,
  handleDeposit,
  handleWithdraw,
  handleGetAllData,
} from "./routes/auth";
import {
  handleSendMessage,
  handleSendBroadcast,
  handleGetUserMessages,
  handleMarkMessageRead,
  handleGetUnreadCount,
} from "./routes/messages";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Authentication routes
  app.post("/api/auth/signup", handleSignup);
  app.post("/api/auth/login", handleLogin);

  // Transaction routes
  app.post("/api/deposit", handleDeposit);
  app.post("/api/withdraw", handleWithdraw);

  // Message routes
  app.post("/api/messages/send", handleSendMessage);
  app.post("/api/messages/broadcast", handleSendBroadcast);
  app.get("/api/messages", handleGetUserMessages);
  app.post("/api/messages/read", handleMarkMessageRead);
  app.get("/api/messages/unread-count", handleGetUnreadCount);

  // Admin route to view all data
  app.get("/api/admin/data", handleGetAllData);

  return app;
}
