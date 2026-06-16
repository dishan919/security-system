import Navbar from "../components/Navbar";
import heroImg from "../assets/security-hero.png";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function HomePage() {
  const navigate = useNavigate();

   useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <h1>Home Page (Login first)</h1>;

      <div className="hero">
        <div className="glass-card">
          <div className="hero-content">
            <div className="text-section">
              <h1>Secure Login Tracker 🔐</h1>

              <p>
                Track all login activities, detect suspicious access, and stay
                secure in real-time.
              </p>

              <button
               onClick={() => navigate("/login")}
              className="cta-btn">Get Started</button>
            </div>

            <div className="image-section">
              <img src={heroImg} alt="hero" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;