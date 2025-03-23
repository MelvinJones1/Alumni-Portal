// aiRoutes.js
import express from "express";
import * as aiController from "../controllers/aiController.js"; // Import everything

const router = express.Router();
router.post(
  "/analyze-resume",
  aiController.upload.single("resume"),
  aiController.analyzeResume,
); // Access the functions as properties of the imported object

export default router;
