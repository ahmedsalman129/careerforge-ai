import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");
      setAnalysis(null);

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1 style={{ fontSize: "1.4rem", marginBottom: 0 }}>CareerForge AI</h1>
        <button className="btn-secondary" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="glass-card">
        <h2>Upload Resume</h2>

        <div className="upload-box">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ color: "var(--text-secondary)" }}
          />
          {file && <p className="file-name">Selected File: {file.name}</p>}
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <button className="btn-primary" onClick={handleUpload} disabled={uploading}>
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
        </div>

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}
      </div>

      {analysis && (
        <>
          <h2 style={{ marginTop: "2rem" }}>AI Resume Analysis</h2>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div className="glass-card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="score-badge" style={{ "--score-percent": `${analysis.resumeScore}%` }}>
                <span className="score-value">{analysis.resumeScore}</span>
                <span className="score-label">Resume Score</span>
              </div>
            </div>

            <div className="glass-card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div className="score-badge" style={{ "--score-percent": `${analysis.atsScore}%` }}>
                <span className="score-value">{analysis.atsScore}</span>
                <span className="score-label">ATS Score</span>
              </div>
            </div>
          </div>

          <div className="glass-card analysis-section">
            <h3>Strengths</h3>
            <ul className="analysis-list strengths">
              {analysis.strengths.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card analysis-section">
            <h3>Weaknesses</h3>
            <ul className="analysis-list weaknesses">
              {analysis.weaknesses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card analysis-section">
            <h3>Missing Skills</h3>
            <div>
              {analysis.missingSkills.map((item, index) => (
                <span className="tag" key={index}>{item}</span>
              ))}
            </div>
          </div>

          <div className="glass-card analysis-section">
            <h3>Suggestions</h3>
            <ul className="analysis-list suggestions">
              {analysis.suggestions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="glass-card analysis-section">
            <h3>Interview Tips</h3>
            <ul className="analysis-list suggestions">
              {analysis.interviewTips.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default UploadResume;