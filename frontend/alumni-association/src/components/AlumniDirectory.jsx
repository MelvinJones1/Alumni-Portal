import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AlumniDirectory = () => {
  const navigate = useNavigate();

  // Hardcoded alumni data
  const alumniList = [
    {
      name: "John Doe",
      branch: "Computer Science",
      year: "2020",
      company: "TechCorp",
      linkedin: "https://www.linkedin.com/in/johndoe",
    },
    {
      name: "Jane Smith",
      branch: "Electrical Engineering",
      year: "2019",
      company: "ElectroSystems",
      linkedin: "https://www.linkedin.com/in/janesmith",
    },
    {
      name: "Emily Johnson",
      branch: "Mechanical Engineering",
      year: "2021",
      company: "MechWorks",
      linkedin: "https://www.linkedin.com/in/emilyjohnson",
    },
    {
      name: "Michael Brown",
      branch: "Computer Science",
      year: "2018",
      company: "CodeLabs",
      linkedin: "https://www.linkedin.com/in/michaelbrown",
    },
    {
      name: "Sarah Lee",
      branch: "Civil Engineering",
      year: "2017",
      company: "BuildIt Inc.",
      linkedin: "https://www.linkedin.com/in/sarahlee",
    },
    {
      name: "David Wilson",
      branch: "Information Technology",
      year: "2022",
      company: "TechNova",
      linkedin: "https://www.linkedin.com/in/davidwilson",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState(alumniList);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);

    // Filter alumni based on search query (name, branch, or year)
    const filtered = alumniList.filter(
      (alumni) =>
        alumni.name.toLowerCase().includes(query) ||
        alumni.branch.toLowerCase().includes(query) ||
        alumni.year.includes(query),
    );
    setFilteredAlumni(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alumni Directory</h1>
        </div>
      </header>

      {/* Go Back Button */}
      <section className="py-4 px-6">
        <button
          onClick={() => navigate("/alumniLanding")}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
        >
          Go Back
        </button>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white shadow-md">
        <div className="max-w-xl mx-auto text-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by Name, Branch, or Year"
            className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      {/* Alumni List Section */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
          {filteredAlumni.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlumni.map((alumni, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {alumni.name}
                  </h3>
                  <div className="space-y-3">
                    <p className="text-gray-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-3 4a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Branch: {alumni.branch}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Year: {alumni.year}
                    </p>
                    <p className="text-gray-600 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 010-2V4zm3 1h2v2H7V5zm4 0h2v2h-2V5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Company: {alumni.company}
                    </p>
                    <a
                      href={alumni.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              No alumni found matching your search.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default AlumniDirectory;
