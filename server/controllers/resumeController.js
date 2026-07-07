const Resume = require("../models/Resume");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const analyzeResume = require("../services/geminiService");

const uploadResume = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    // Read uploaded PDF
    const pdfBuffer = fs.readFileSync(req.file.path);

    // Extract text from PDF
    const pdfData = await pdfParse(pdfBuffer);

    if (!pdfData.text || pdfData.text.trim() === "") {
      return res.status(400).json({
        message: "Unable to extract text from the uploaded PDF.",
      });
    }

    // Analyze resume using Gemini
    const analysis = await analyzeResume(pdfData.text);

    // Save resume in MongoDB
    const resume = new Resume({
      userId: req.user.userId,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      analysis,
    });

    await resume.save();

    // Return response
    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      analysis,
      resume,
    });
  } catch (error) {
    console.error("Resume Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};