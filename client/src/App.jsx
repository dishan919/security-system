import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";
import HomePage from "./pages/HomePage";
import Features from "./pages/features";
import PrivateRoute from "./components/PrivateRoute";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (

      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PUBLIC HOME */}
        <Route path="/" element={<HomePage />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/features"
          element={
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          }
        />

      </Routes>

  
  );
}

export default App;