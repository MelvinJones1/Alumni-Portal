import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  linkedIn: { type: String },
  proof: { type: String },
  role: { type: String, enum: ["student", "alumni", "admin"], required: true },
  isApproved: { type: Boolean, default: false },
  currentWork: { type: String },
  expertise: { type: String },
  location: { type: String },
});

const User = mongoose.model("User", userSchema);
export default User; // ✅ Use ES module export
