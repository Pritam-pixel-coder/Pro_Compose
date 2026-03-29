const express = require("express");
const router = express.Router();

const buildPrompt = require("../utils/buildPrompt");
const generateWithGemini = require("../utils/geminiClient");

/**
 * @route POST /api/generate
 * @desc Generate a professional email using AI.
 */
router.post("/", async (req, res) => {
  try {
    const { 
      goal, 
      recipient, 
      tone = "Professional", 
      points = [], 
      formality = 8 
    } = req.body;

    if (!goal) {
      return res.status(400).json({ error: "Goal is required to generate an email." });
    }

    // 1. Build prompt
    const prompt = buildPrompt({ goal, recipient, tone, points, formality });

    // 2. Call Google Gemini
    const email = await generateWithGemini(prompt);

    // 3. Send response
    res.json({
      email,
      model_used: "gemini-2.5-flash-lite",

      success: true
    });

  } catch (err) {
    console.error("AI GENERATION ERROR:", err);
    res.status(500).json({
      error: "Email generation failed",
      details: err.message
    });
  }
});

module.exports = router;

