/**
 * Builds a prompt for the AI to generate a professional email.
 * @param {Object} options - Features like recipient, tone, goal, and points.
 * @returns {string} - A formatted prompt for the AI.
 */
function buildPrompt(options) {
  const { recipient, tone, goal, points, formality = "High" } = options;

  return `
    Act as an elite executive communications expert. Your task is to draft a world-class professional email.

    SPECIFICATIONS:
    - **Goal/Purpose**: ${goal}
    - **Recipient**: ${recipient || "To whom it may concern"}
    - **Tone**: ${tone || "Professional and Courteous"}
    - **Formality Level**: ${formality} (Scale 1-10: 8)
    - **Key Points to Include**:
      ${points.map((p) => `- ${p}`).join("\n      ")}

    STRICT CONSTRAINTS:
    1. Provide a compelling, professional Subject line.
    2. Use an appropriate formal salutation.
    3. Ensure the structure is logical: Opening, Body, Call to Action, Professional Sign-off.
    4. Keep it concise yet impactful.
    5. DO NOT include any meta-commentary like "Certainly, here is your email:".
    6. Return ONLY the Subject line and the Email Body.

    Generate the email now:
  `;
}

module.exports = buildPrompt;