import { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostExperience = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    jobRole: "",
    interviewDate: "",
    rounds: [{ roundType: "", description: "" }],
    resourcesUsed: "",
    experienceText: "",
  });

  const navigate = useNavigate();

  // Check authentication status on component mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || role !== "alumni") {
      navigate("/login"); // Redirect to login if not authenticated or not an alumni
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoundChange = (index, e) => {
    const updatedRounds = [...formData.rounds];
    updatedRounds[index][e.target.name] = e.target.value;
    setFormData({ ...formData, rounds: updatedRounds });
  };

  const addRound = () => {
    setFormData({
      ...formData,
      rounds: [...formData.rounds, { roundType: "", description: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage
      console.log("Token Sent in Request:", token); // Debugging

      await axios.post(
        "http://localhost:5000/api/interview-experience",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure this is not undefined
          },
        },
      );

      alert("Interview Experience Posted Successfully!");
      navigate("/alumniLanding"); // Redirect after successful submission
    } catch (error) {
      console.error("Error posting experience:", error.response?.data || error);
      alert("Failed to post experience.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-blue-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/alumniLanding")} // Use navigate to redirect
        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-8 cursor-pointer"
      >
        Go Back
      </button>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Post Interview Experience
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter a title for your experience"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              placeholder="Enter the company name"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Job Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Job Role (Optional)
            </label>
            <input
              type="text"
              name="jobRole"
              placeholder="Enter the job role"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interview Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Interview Date
            </label>
            <input
              type="date"
              name="interviewDate"
              value={formData.interviewDate}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Interview Rounds */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Interview Rounds
            </h3>
            {formData.rounds.map((round, index) => (
              <div key={index} className="space-y-4 mb-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="roundType"
                    placeholder="Round Type (e.g., Technical)"
                    value={round.roundType}
                    onChange={(e) => handleRoundChange(index, e)}
                    required
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={round.description}
                    onChange={(e) => handleRoundChange(index, e)}
                    required
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addRound}
              className="mt-2 p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
            >
              + Add Round
            </button>
          </div>

          {/* Resources Used */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Resources Used (comma-separated)
            </label>
            <input
              type="text"
              name="resourcesUsed"
              placeholder="e.g., LeetCode, Cracking the Coding Interview"
              value={formData.resourcesUsed}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Experience Text */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Describe Your Experience
            </label>
            <textarea
              name="experienceText"
              placeholder="Share your interview experience..."
              value={formData.experienceText}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Post Experience
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostExperience;
