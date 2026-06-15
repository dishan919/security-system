import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";

function Home() {
  useEffect(() => {
    axios.get("http://localhost:5000/")
      .then((res) => {
        console.log("SUCCESS:", res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err.message);
      });
  }, []);

  return <h1>SecureLogin Tracker 🔐</h1>;
}

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />

        {/* FIXED ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin"   element={<AdminDashboard />}/>
      </Routes>
    
  );
}

export default App;