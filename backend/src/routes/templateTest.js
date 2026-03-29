const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Template route working");
});


const { getScenarioConfig } = require('../services/templateService');
const generateSubject = require('../utils/subjectGenerator');

router.get('/:scenario', (req, res) => {
  try {
    const config = getScenarioConfig(req.params.scenario);

    const subject = generateSubject(config.subject, {
      project_name: "AI Platform",
      invoice_id: "1023"
    });

    res.json({
      scenario: req.params.scenario,
      config,
      subject
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;