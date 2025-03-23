import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeOptimizer = () => {
  const [file, setFile] = useState(null);
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Ref for file input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze-resume",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );

      setSuggestions(response.data.suggestions);
      setFile(null);
      fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setSuggestions("");
    setError(null);
    fileInputRef.current.value = "";
  };

  return (
    <>
      <section className="py-4 px-6">
        <button
          onClick={() => navigate("/studentLanding")}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Go Back
        </button>
      </section>
      <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Resume Optimizer
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Upload Your Resume (PDF)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              disabled={isLoading || !file}
            >
              {isLoading ? (
                <>
                  <span className="loader mr-2"></span> Analyzing...
                </>
              ) : (
                "Optimize Resume"
              )}
            </button>
          </form>

          {isLoading && (
            <div className="mt-6 flex justify-center">
              <div className="loader"></div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-600">
              <p>{error}</p>
            </div>
          )}

          {suggestions && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Suggestions
              </h2>
              <div
                className="mt-2 text-gray-700"
                dangerouslySetInnerHTML={{ __html: suggestions }}
              />
              <button
                onClick={handleClear}
                className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Clear Suggestions
              </button>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          .loader {
            width: 20px;
            height: 20px;
            border: 3px solid #fff;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Styles for resume analysis */
          .resume-analysis {
            border: 1px solid #ccc;
            padding: 10px;
            margin-top: 20px;
          }

          .overall-score {
            font-size: 1.2em;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .strengths h4,
          .improvements h4 {
            font-weight: bold;
            margin-top: 10px;
          }

          .strengths ul,
          .improvements ul {
            list-style-type: disc;
            margin-left: 20px;
          }

          .strength {
            color: green;
          }

          .improvement {
            color: darkred;
          }
        `}
      </style>
    </>
  );
};

export default ResumeOptimizer;
