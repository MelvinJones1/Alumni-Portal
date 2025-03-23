import InterviewExperience from "../models/InterviewExperience.js";
// Get all experiences
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find().populate(
      "alumniId",
      "name",
    );

    console.log("Fetched Experiences with Alumni Name:", experiences);
    res.status(200).json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error);
    res.status(500).json({ error: "Server error while fetching experiences." });
  }
};

// Get a single experience by ID
const getExperienceById = async (req, res) => {
  try {
    const experience = await InterviewExperience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching experience." });
  }
};

// Post a new experience
const postExperience = async (req, res) => {
  try {
    const {
      title,
      company,
      jobRole,
      interviewDate,
      rounds,
      resourcesUsed,
      experienceText,
    } = req.body;

    // Extract alumniId from authenticated user
    const alumniId = req.user.id; // Make sure `authMiddleware` sets req.user

    if (!alumniId) {
      return res.status(400).json({ error: "User authentication required" });
    }

    const newExperience = new InterviewExperience({
      alumniId, // ✅ Include the authenticated user's ID
      title,
      company,
      jobRole,
      interviewDate,
      rounds,
      resourcesUsed,
      experienceText,
    });

    await newExperience.save();
    res.status(201).json({
      message: "Interview Experience Posted Successfully!",
      experience: newExperience,
    });
  } catch (error) {
    console.error("Error posting experience:", error);
    res.status(500).json({ error: "Server error while posting experience." });
  }
};

// ✅ Ensure all functions are exported correctly
export { getAllExperiences, getExperienceById, postExperience };
