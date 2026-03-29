function buildPrompt(template, userData) {
  return `
Write a professional email.

Subject: ${template.subject}

Opening:
${template.opening}

Tone:
Politeness: ${template.politeness}
Formality: ${template.formality}
Urgency: ${template.urgency}

Context:
${userData.context}

Closing:
${template.closing}
`;
}