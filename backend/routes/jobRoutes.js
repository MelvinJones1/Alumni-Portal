import express from "express";
import { postJob, getJobs } from "../controllers/jobController.js";
import { authMiddleware as verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/post-job", verifyToken, postJob); // Alumni post job
router.get("/get-jobs", getJobs); // Students view jobs

export default router;
