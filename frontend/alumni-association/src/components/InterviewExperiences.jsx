import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const InterviewExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Dummy data for demonstration
  const dummyExperiences = [
    {
      _id: "1",
      company: "Google",
      jobRole: "Software Engineer",
      rounds: [
        {
          roundType: "Coding Round",
          description: "2 coding questions on data structures and algorithms.",
        },
        {
          roundType: "Technical Interview",
          description: "Questions on system design and problem-solving.",
        },
        {
          roundType: "HR Round",
          description: "Behavioral questions and cultural fit discussion.",
        },
      ],
      resourcesUsed: [
        "LeetCode",
        "Cracking the Coding Interview",
        "GeeksforGeeks",
      ],
      interviewDate: "2023-10-15",
      experienceText:
        "The interview process was challenging but fair. The interviewers were very supportive.",
      alumniId: { name: "John Doe" },
    },
    {
      _id: "2",
      company: "Microsoft",
      jobRole: "Product Manager",
      rounds: [
        {
          roundType: "Case Study",
          description: "Product design and strategy questions.",
        },
        {
          roundType: "Behavioral Interview",
          description: "Questions on leadership and teamwork.",
        },
      ],
      resourcesUsed: ["Cracking the PM Interview", "StellarPeers"],
      interviewDate: "2023-09-20",
      experienceText:
        "The case study round was intense, but it was a great learning experience.",
      alumniId: { name: "Jane Smith" },
    },
    {
      _id: "3",
      company: "Amazon",
      jobRole: "Data Scientist",
      rounds: [
        {
          roundType: "Technical Round",
          description: "Questions on machine learning and statistics.",
        },
        {
          roundType: "Coding Round",
          description: "1 coding question and 1 SQL query.",
        },
      ],
      resourcesUsed: ["Kaggle", "Towards Data Science", "SQLZoo"],
      interviewDate: "2023-08-10",
      experienceText:
        "The interviewers were very knowledgeable and asked practical questions.",
      alumniId: { name: "Alice Johnson" },
    },
    {
      _id: "4",
      company: "Facebook",
      jobRole: "Frontend Developer",
      rounds: [
        {
          roundType: "Coding Round",
          description: "2 frontend coding challenges.",
        },
        {
          roundType: "System Design",
          description: "Design a scalable frontend architecture.",
        },
      ],
      resourcesUsed: ["Frontend Masters", "React Documentation", "CSS Tricks"],
      interviewDate: "2023-07-05",
      experienceText:
        "The system design round was challenging but very insightful.",
      alumniId: { name: "Bob Brown" },
    },
  ];

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/interview-experience",
        );
        const data = Array.isArray(response.data) ? response.data : [];
        setExperiences([...data, ...dummyExperiences]); // Combine fetched data with dummy data
      } catch (error) {
        console.error("Error fetching experiences", error);
        setExperiences(dummyExperiences); // Fallback to dummy data if API fails
      }
    };
    fetchExperiences();
  }, []);

  const filteredExperiences = experiences.filter((exp) =>
    exp.company?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate("/studentLanding")}
        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-8"
      >
        Go Back
      </button>

      <h2 className="text-4xl font-bold text-gray-800 text-center mb-8">
        Alumni Interview Experiences
      </h2>

      {/* Search Bar */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by company name..."
          className="border border-gray-300 p-3 rounded-lg w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-blue-400 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                {exp.company}
              </h3>
              <p className="text-lg text-gray-700 font-medium mb-4">
                {exp.jobRole}
              </p>

              {/* Interview Rounds */}
              {exp.rounds?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Interview Rounds:
                  </h4>
                  {exp.rounds.map((round, index) => (
                    <div key={index} className="mb-2">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-blue-500">
                          {round.roundType}:
                        </span>{" "}
                        {round.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Resources Used */}
              {exp.resourcesUsed?.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Resources Used:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {Array.isArray(exp.resourcesUsed) ? (
                      exp.resourcesUsed.map((resource, index) => (
                        <li key={index}>{resource}</li>
                      ))
                    ) : (
                      <li>{exp.resourcesUsed}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Interview Date */}
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium text-gray-800">
                  Interview Date:
                </span>{" "}
                {exp.interviewDate
                  ? new Date(exp.interviewDate).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Experience Summary */}
              <p className="text-gray-600 text-sm italic mb-4">
                "{exp.experienceText}"
              </p>

              {/* Alumni Name */}
              <p className="text-sm text-gray-500 font-medium">
                By: {exp.alumniId?.name || "Unknown Alumni"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">
            No experiences found.
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewExperiences;
