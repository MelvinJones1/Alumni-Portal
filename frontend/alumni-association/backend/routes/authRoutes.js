const express = require("express");
const {
  register,
  login,
  approveAlumni,
  getPendingAlumni,
} = require("../controllers/authController");
const {
  authMiddleware,
  adminMiddleware,
} = require("../middleware/authMiddleware"); // ✅ Fixed import

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.use("/admin", authMiddleware, adminMiddleware);
router.get("/admin/pending-alumni", getPendingAlumni);
router.put("/admin/approve/:id", approveAlumni);

module.exports = router;
