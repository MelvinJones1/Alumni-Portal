// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import Message from "./models/Message.js";
import chatRoutes from "./routes/chatRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import interviewExperienceRoutes from "./routes/interviewExperienceRoutes.js";

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/jobs", jobRoutes);

// Delay importing aiRoutes until a request hits /api/ai
app.use("/api/ai", async (req, res, next) => {
  try {
    const { default: aiRoutes } = await import("./routes/aiRoutes.js"); // Correctly import the default export
    return aiRoutes(req, res, next); // Make sure aiRoutes function gets returned
  } catch (error) {
    console.error("Error loading aiRoutes:", error);
    return res.status(500).send("Error loading AI routes"); // Correctly return the response
  }
});

app.use(express.json());
app.use(cookieParser());
app.use("/api/interview-experience", interviewExperienceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  // Update this too
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const onlineUsers = new Map(); // Track online users by userId

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  socket.on("sendMessage", async (data, callback) => {
    try {
      const { senderId, receiverId, message } = data;
      const newMessage = await new Message({
        senderId,
        receiverId,
        message,
      }).save();

      // Send message only if receiver is online
      if (onlineUsers.has(receiverId)) {
        io.to(onlineUsers.get(receiverId)).emit("receiveMessage", newMessage);
      }

      // Also send to the sender
      io.to(onlineUsers.get(senderId)).emit("receiveMessage", newMessage);

      // Acknowledge message delivery
      if (callback) callback({ status: "success", messageId: newMessage._id });
    } catch (error) {
      console.error("Error sending message:", error);
      if (callback) callback({ status: "error", message: "Message not sent" });
    }
  });

  socket.on("disconnect", () => {
    for (let [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
