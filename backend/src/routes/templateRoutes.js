const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma");

router.get("/template", async (req, res) => {
  try {
    const template = await prisma.email_templates.findFirst({
      select: {
        id: true,
        template_name: true,
        email_type: true,
        subject_template: true,
        opening_template: true,
        body_template: true,
        closing_template: true,
        primary_tone: true,
        secondary_tone: true,
        formality_level: true,
        urgency_level: true,
        response_expected: true
      }
    });

    res.json(template);
  }catch (err) {
  console.error("GEMINI FULL ERROR:", err);
  console.error("GEMINI MESSAGE:", err.message);
  console.error("GEMINI STACK:", err.stack);

  res.status(500).json({
    error: "Email generation failed",
    details: err.message || "Unknown Gemini error"
  });
}
});

module.exports = router;