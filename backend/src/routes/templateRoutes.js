const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/template", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id,
        template_name,
        email_type,
        subject_template,
        opening_template,
        body_template,
        closing_template,
        primary_tone,
        secondary_tone,
        formality_level,
        urgency_level,
        response_expected
      FROM email_templates
      LIMIT 1
    `);

    res.json(result.rows[0]);
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