import mongoose from "mongoose";
const interviewExperienceSchema = new mongoose.Schema({
  alumniId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true }, // Short title like "My Interview at Google"
  company: { type: String, required: true },
  jobRole: { type: String }, // Optional (e.g., Software Engineer, Data Analyst)
  rounds: {
    type: [{ roundType: String, description: String }], // Example: [{ roundType: "Technical", description: "Coding + System Design" }]
    required: true,
  },
  resourcesUsed: { type: [String] }, // Example: ["LeetCode", "Cracking the Coding Interview", "YouTube videos"]
  experienceText: { type: String, required: true }, // Detailed write-up
  interviewDate: { type: Date, required: true }, // When the interview happened
  datePosted: { type: Date, default: Date.now }, // When alumni posted the experience
});

const InterviewExperience = mongoose.model(
  "InterviewExperience",
  interviewExperienceSchema,
);
export default InterviewExperience; // Change this line
