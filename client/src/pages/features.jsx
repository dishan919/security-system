import Navbar from "../components/Navbar";

function Features() {
  return (
    <>
      <Navbar />

      <div className="features-container">
        <h1>Features</h1>

        <div className="feature-card">
          <h3>🔐 Login Tracking</h3>
          <p>Track every login attempt in real time.</p>
        </div>

        <div className="feature-card">
          <h3>💻 Device Detection</h3>
          <p>Identify browser, OS, and device type.</p>
        </div>

        <div className="feature-card">
          <h3>🌍 Location Monitoring</h3>
          <p>Monitor login locations and IP information.</p>
        </div>

        <div className="feature-card">
          <h3>🚨 Security Alerts</h3>
          <p>Detect suspicious login attempts.</p>
        </div>
      </div>
    </>
  );
}

export default Features;