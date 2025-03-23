// src/components/Model.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey =
  import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY; // Access the API key
if (!apiKey) {
  console.error("API key not found! Make sure to set it in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent({ prompt });
    return result.response.text; // Return the generated text
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
