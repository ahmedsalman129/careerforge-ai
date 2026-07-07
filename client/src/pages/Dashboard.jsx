import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>CareerForge AI</h1>

      <hr />

      <h2>Dashboard</h2>

      <p>Welcome back!</p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* Resume Upload Card */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Resume Upload</h3>
          <p>Upload your latest resume.</p>

          <button onClick={() => navigate("/upload")}>
            Upload Resume
          </button>
        </div>

        {/* AI Analysis Card */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>AI Analysis</h3>
          <p>View AI feedback and resume score.</p>

          <button>Coming Soon</button>
        </div>

        {/* Interview Practice Card */}
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "250px",
            borderRadius: "10px",
          }}
        >
          <h3>Interview Practice</h3>
          <p>Practice interview questions.</p>

          <button>Coming Soon</button>
        </div>
      </div>

      <br />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;