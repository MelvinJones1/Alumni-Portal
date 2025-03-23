import axios from "axios";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs"; // Import the 'fs' module

dotenv.config();

// Configure Multer for file upload
const upload = multer({ storage: multer.memoryStorage() });

// Gemini API Configuration
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Function to extract text from PDF
const extractTextFromPDF = async (pdfBuffer) => {
  try {
    const pdfParse = (await import("pdf-parse-fork")).default; // Dynamically import pdf-parse-fork
    const data = await pdfParse(pdfBuffer);
    return data.text; // Extracted text from the PDF
  } catch (error) {
    console.error("Error extracting text from PDF:", error.message);
    throw new Error("Failed to process PDF text extraction.");
  }
};

// Resume Analysis Controller
const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    console.log(
      "File received:",
      req.file.originalname,
      req.file.mimetype,
      req.file.size,
    ); // Log file details

    // Step 1: Extract text from the uploaded PDF
    const resumeText = await extractTextFromPDF(req.file.buffer);

    // Step 2: Call Gemini API for suggestions
    // Refined Prompt: Ask for JSON output
    const prompt = `Analyze this resume: ${resumeText}\n\nRespond with a JSON object containing:
    - overallScore: A score out of 10 (e.g., 7.5)
    - strengths: An array of short strings listing the resume's strengths.
    - improvements: An array of short strings listing specific, actionable improvements.
    \n\nEnsure your response is *only* the valid JSON, without any additional formatting like backticks or language identifiers.`; //Improved prompt

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      },
    );

    // Step 3: Extract and Format Suggestions
    if (
      !response.data ||
      !response.data.candidates ||
      response.data.candidates.length === 0 ||
      !response.data.candidates[0].content
    ) {
      console.error("Unexpected Gemini API base response:", response.data);
      return res
        .status(500)
        .json({ error: "Unexpected response from Gemini API" });
    }

    const candidate = response.data.candidates[0];
    const content = candidate.content;
    const parts = content.parts;

    if (!parts || parts.length === 0) {
      console.error(
        "Gemini API response: parts array is empty:",
        response.data,
      );
      return res
        .status(500)
        .json({ error: "Unexpected response from Gemini API: No parts" });
    }

    if (!parts[0].text) {
      console.error(
        "Gemini API response: parts[0].text is missing:",
        response.data,
      );
      return res
        .status(500)
        .json({
          error: "Unexpected response from Gemini API: No text in parts",
        });
    }

    // Attempt to Parse JSON Response
    let analysis;
    try {
      let rawResponse = parts[0].text;
      // Remove backticks and "json" identifier, now handles cases where it's already pure JSON
      rawResponse = rawResponse.replace(/```json\s*|```/g, "");
      try {
        analysis = JSON.parse(rawResponse);
      } catch (e) {
        console.error("Retrying: Failed to parse JSON response:", e);
        console.log("Retrying: Raw response:", rawResponse);
        rawResponse = rawResponse.replace(/^`*\n*/, ""); //Remove leading backticks or newline
        rawResponse = rawResponse.replace(/`*\n*$/, ""); //Remove trailing backticks or newline
        try {
          analysis = JSON.parse(rawResponse);
        } catch (e) {
          console.error("Second try failed to parse JSON response:", e);
          console.log("Second try Raw response:", rawResponse);
          throw e; //Rethrow the error to be caught in the outer catch
        }
      }
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.log("Raw response:", parts[0].text);
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    // Destructure and Format with HTML
    const { overallScore, strengths, improvements } = analysis;

    const formattedSuggestions = `
      <div class="resume-analysis">
        <h3 class="overall-score">Overall Score: ${overallScore}/10</h3>
        <div class="strengths">
          <h4>Strengths:</h4>
          <ul>
            ${strengths.map((s) => `<li class="strength">${s}</li>`).join("")}
          </ul>
        </div>
        <div class="improvements">
          <h4>Areas for Improvement:</h4>
          <ul>
            ${improvements
              .map((i) => `<li class="improvement">${i}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;

    res.json({ suggestions: formattedSuggestions });
  } catch (error) {
    console.error(
      "Error processing resume:",
      error.response?.data || error.message,
    );
    if (error.message.includes("Failed to process PDF text extraction")) {
      res.status(500).json({ error: "Failed to process PDF text extraction." });
    } else if (error.response && error.response.status) {
      res.status(error.response.status).json({
        error: `Gemini API error: ${error.response.status} - ${error.response.data}`,
      });
    } else {
      res.status(500).json({ error: "Failed to analyze resume" });
    }
  }
};

export { analyzeResume, upload };
