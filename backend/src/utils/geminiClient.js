const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Generate a professional email using Google's Gemini Pro.
 * @param {string} prompt - The prompt to send to the model.
 * @returns {Promise<string>} - The generated email text.
 */
async function generateWithGemini(prompt) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("GEMINI API ERROR:", error);
    throw new Error("Failed to generate content with Gemini: " + error.message);
  }
}

module.exports = generateWithGemini;
