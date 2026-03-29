require('dotenv').config({ path: '../.env' });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    const models = await genAI.listModels();
    console.log("AVAILABLE MODELS:");
    models.forEach(m => {
      console.log(`- ${m.name} (${m.displayName})`);
    });
  } catch (error) {
    console.error("FAILED TO LIST MODELS:", error.message);
  }
}

listModels();
