import express from "express"; // Import express
import User from "../models/User.js"; // Import User model

import {
  register,
  login,
  getUsersByIds,
  approveAlumni,
  getPendingAlumni,
} from "../controllers/authController.js"; // Import controller functions

import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/name", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user name" });
  }
});

router.get("/user/profile", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile data" });
  }
});
router.put("/user/profile", authMiddleware, async (req, res) => {
  try {
    const { name, linkedIn } = req.body;
    const user = await User.findById(req.user.id);
    if (name) user.name = name;
    if (linkedIn) user.linkedIn = linkedIn;
    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
});

router.get("/alumni", authMiddleware, async (req, res) => {
  try {
    console.log("User making request:", req.user); // Debugging
    const alumni = await User.find({ role: "alumni", isApproved: true });
    console.log("Alumni fetched:", alumni); // Debugging
    res.json(alumni);
  } catch (error) {
    console.error("Error fetching alumni:", error); // Debugging
    res.status(500).json({ message: "Error fetching alumni" });
  }
});

router.post("/users", authMiddleware, getUsersByIds);

router.use("/admin", authMiddleware);
router.get("/admin/pending-alumni", getPendingAlumni);
router.put("/admin/approve/:id", approveAlumni);

export default router;
