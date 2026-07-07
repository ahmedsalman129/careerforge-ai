const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const analyzeResume = async (resumeText) => {
  const prompt = `
You are an expert ATS Resume Reviewer.

Analyze the resume below.

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use code fences.
- Do NOT explain anything outside the JSON.

Return this exact structure:

{
  "resumeScore": 0,
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": [],
  "interviewTips": []
}

Resume:

${resumeText}
`;

  const result = await model.generateContent(prompt);

  let text = result.response.text().trim();

  // Remove markdown code fences if Gemini accidentally returns them
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return JSON.parse(text);
};

module.exports = analyzeResume;