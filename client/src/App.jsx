import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Upload Resume */}
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;