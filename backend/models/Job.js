import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    location: { type: String, required: true },
    skills: { type: [String], required: true },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract"],
      required: true,
    },
    salary: { type: String, required: true },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Alumni who posted
  },
  { timestamps: true },
);

export default mongoose.model("Job", jobSchema);
