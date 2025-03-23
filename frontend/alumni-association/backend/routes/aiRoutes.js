const express = require("express");
const { analyzeResume, upload } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze-resume", upload.single("resume"), analyzeResume);

module.exports = router;
