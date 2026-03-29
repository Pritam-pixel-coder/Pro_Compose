const router = require('express').Router();

const { getScenarioConfig } = require('../services/templateService');
const generateSubject = require('../utils/subjectGenerator');
const buildPrompt = require('../services/promptBuilder');

router.post('/', (req, res) => {
  try {
    const userData = req.body;

    const scenarioConfig = getScenarioConfig(userData.scenario);

    const subject = generateSubject(
      scenarioConfig.subject,
      userData
    );

    const prompt = buildPrompt(userData, scenarioConfig, subject);

    res.json({
      subject,
      prompt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;