import Job from "../models/Job.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      company,
      role,
      location,
      skills,
      jobType,
      salary,
      description,
    } = req.body;

    const newJob = new Job({
      title,
      company,
      role,
      location,
      skills,
      jobType,
      salary,
      description,
      postedBy: req.user.id, // From token
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Error posting job", error });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email"); // Fetching jobs with alumni details
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};
