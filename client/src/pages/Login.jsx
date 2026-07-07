import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save JWT Token
      localStorage.setItem("token", response.data.token);

      console.log(response.data);

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <h1>CareerForge AI</h1>

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;