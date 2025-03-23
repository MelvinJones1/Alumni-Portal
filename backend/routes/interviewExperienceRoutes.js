import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js"; // ✅ Correct import
import {
  postExperience,
  getAllExperiences,
  getExperienceById,
} from "../controllers/interviewExperienceController.js"; // ✅ Correct import

const router = express.Router();

router.post("/", authMiddleware, postExperience); // Ensure `postExperience` is correctly imported
router.get("/", getAllExperiences);
router.get("/:id", getExperienceById);

export default router;
