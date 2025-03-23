const axios = require("axios");
const pdf = require("pdf-parse");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config();

// Configure Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Gemini API Configuration
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Resume Analysis Controller
const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Step 1: Extract text from the uploaded PDF
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // Step 2: Call Gemini API for suggestions
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Give me a overall score for this resume and Analyze this resume and provide actionable suggestions for improvement: ${resumeText}`,
              },
            ],
          },
        ],
      },
    );

    // Step 3: Extract and format suggestions
    let suggestions = response.data.candidates[0].content.parts[0].text;

    // Refined formatting of the suggestions with added spacing
    suggestions = suggestions
      .replace(/\*\*Strengths\*\*(:?)/g, "<h3>Strengths:</h3>")
      .replace(
        /\*\*Areas for Improvement\*\*(:?)/g,
        "<h3>Areas for Improvement:</h3>",
      )
      .replace(
        /\*\*Contact Information\*\*(:?)/g,
        "<h4>Contact Information:</h4>",
      )
      .replace(/\*\*Education\*\*(:?)/g, "<h4>Education:</h4>")
      .replace(/\*\*Experience\*\*(:?)/g, "<h4>Experience:</h4>")
      .replace(/\*\*Projects\*\*(:?)/g, "<h4>Projects:</h4>")
      .replace(/\*\*Technical Skills\*\*(:?)/g, "<h4>Technical Skills:</h4>")
      .replace(/\*\*Certifications\*\*(:?)/g, "<h4>Certifications:</h4>")
      .replace(
        /\*\*Additional Suggestions\*\*(:?)/g,
        "<h4>Additional Suggestions:</h4>",
      )
      .replace(/\* (.*?)(?=\n)/g, "<li>$1</li>") // Convert bullet points
      .replace(/<\/li><li>/g, "</li><br /><li>") // Add space between list items
      .replace(/<\/h3><h4>/g, "</h3><br /><h4>") // Add space between sections
      .replace(/<\/h4><br \/>/g, "</h4><br /><br />"); // Add more space after headings

    // Wrap suggestions in an unordered list for better readability
    suggestions = `<ul>${suggestions}</ul>`;

    res.json({ suggestions });
  } catch (error) {
    console.error(
      "Error processing resume:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to analyze resume" });
  }
};

module.exports = { analyzeResume, upload };
