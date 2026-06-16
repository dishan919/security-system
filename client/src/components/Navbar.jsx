import { useNavigate } from "react-router-dom";


function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      {/* Logo / Title */}
      <div style={styles.logo}>
        🔐 Security Dashboard
      </div>

      {/* Menu */}
      <ul style={styles.menu}>
        <li onClick={() => navigate("/")}>Home</li>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/features")}>Features</li>
        <li onClick={() => navigate("/history")}>History</li>
        
      </ul>

      {/* Right side button */}
      <button style={styles.button} onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 25px",
    background: "#0f172a",
    color: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },

  menu: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    cursor: "pointer",
  },

  button: {
    background: "#3b82f6",
    border: "none",
    padding: "8px 15px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Navbar;