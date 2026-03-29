const fs = require('fs');
const path = require('path');
const prisma = require('../config/prisma');

async function getAllTemplates() {
  return await prisma.template.findMany();
}

module.exports = {
  getAllTemplates
};

const templatePath = path.join(__dirname, '../templates/scenarios.json');

function loadTemplates() {
  const raw = fs.readFileSync(templatePath);
  return JSON.parse(raw);
}

function getScenarioConfig(scenario) {
  const templates = loadTemplates();

  if (!templates[scenario]) {
    throw new Error(`Scenario '${scenario}' not found`);
  }

  return templates[scenario];
}

module.exports = {
  getScenarioConfig
};