import express from "express";
import mongoose from "mongoose";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch chat history between two users
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const { receiverId } = req.query;
    const senderId = req.user._id;

    console.log("Fetching chat history...");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver ID" });
    }

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 });

    console.log("Messages fetched:", messages);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

// Fetch students who have messaged the alumni
router.get("/students", authMiddleware, async (req, res) => {
  try {
    const { alumniId } = req.query;

    console.log("Fetching students who messaged alumni:", alumniId);

    // Validate alumniId before querying
    if (!mongoose.Types.ObjectId.isValid(alumniId)) {
      return res.status(400).json({ message: "Invalid alumni ID" });
    }

    // Find unique student IDs who have sent messages to the alumni
    const studentIds = await Message.distinct("senderId", {
      receiverId: alumniId,
    });

    console.log("Student IDs fetched:", studentIds);

    if (studentIds.length === 0) {
      return res.json([]); // No students found
    }

    // Convert student IDs to ObjectId for querying
    const studentObjectIds = studentIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    // Fetch student details
    const students = await User.find({
      _id: { $in: studentObjectIds },
      role: "student",
    });

    console.log("Students fetched:", students);
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
});

export default router;
