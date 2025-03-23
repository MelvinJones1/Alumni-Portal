const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkedIn: { type: String },
  proof: { type: String }, // Alumni proof (Roll No/ID)
  role: { type: String, enum: ["student", "alumni", "admin"], required: true },
  isApproved: { type: Boolean, default: false }, // Admin approval for alumni
});

const User = mongoose.model("User", userSchema);
module.exports = User;
