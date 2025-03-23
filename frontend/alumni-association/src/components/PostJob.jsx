import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
const skillsList = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "AWS",
  "SQL",
];

export default function PostJob() {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    role: "",
    location: "",
    skills: [],
    jobType: "Full-time",
    salary: "",
    description: "",
  });

  const [postedJob, setPostedJob] = useState(null); // Store the posted job

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSkillsChange = (skill) => {
    setJob((prevJob) => {
      const skills = prevJob.skills.includes(skill)
        ? prevJob.skills.filter((s) => s !== skill)
        : [...prevJob.skills, skill];
      return { ...prevJob, skills };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/jobs/post-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job),
      });
      const data = await response.json();
      if (response.ok) {
        setPostedJob(data.job);
        setJob({
          title: "",
          company: "",
          role: "",
          location: "",
          skills: [],
          jobType: "Full-time",
          salary: "",
          description: "",
        });
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="py-4 px-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </section>

      {postedJob ? (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Job Posted Successfully</h2>
          <div className="space-y-4">
            <p className="font-semibold">Job Title: {postedJob.title}</p>
            <p>Company: {postedJob.company}</p>
            <p>Role: {postedJob.role}</p>
            <p>Location: {postedJob.location}</p>
            <p>Skills: {postedJob.skills.join(", ")}</p>
            <p>Job Type: {postedJob.jobType}</p>
            <p>Salary: {postedJob.salary}</p>
            <p>Description: {postedJob.description}</p>
          </div>
        </div>
      ) : (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Post a Job</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={job.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={job.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={job.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={job.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <div>
              <p className="font-medium">Skills Required:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {skillsList.map((skill) => (
                  <button
                    type="button"
                    key={skill}
                    onClick={() => handleSkillsChange(skill)}
                    className={`px-3 py-1 rounded-full border ${
                      job.skills.includes(skill)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            <select
              name="jobType"
              value={job.jobType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="salary"
              placeholder="Salary"
              value={job.salary}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={job.description}
              onChange={handleChange}
              className="w-full p-2 border rounded h-24"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl"
            >
              Post Job
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
