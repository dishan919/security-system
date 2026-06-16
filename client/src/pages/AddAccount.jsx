import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AddAccount() {
  const [form, setForm] = useState({
    platform: "",
    customPlatform: "",
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalPlatform =
      form.platform === "Other"
        ? form.customPlatform
        : form.platform;

    try {
      await axios.post("http://localhost:5000/api/accounts/add", {
        userId: "test@gmail.com", // later replace with logged user id
        platform: finalPlatform,
        username: form.username,
        email: form.email,
      });

      setMessage("✅ Account added successfully!");

      // reset form
      setForm({
        platform: "",
        customPlatform: "",
        username: "",
        email: "",
      });
    } catch (error) {
      setMessage("❌ Error adding account");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <h1 style={styles.title}>📱 Add New Account</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* PLATFORM */}
          <label>Platform</label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="Facebook">Facebook</option>
            <option value="Gmail">Gmail</option>
            <option value="Twitter">Twitter</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="GitHub">GitHub</option>
            <option value="Other">Other</option>
          </select>

          {/* OTHER PLATFORM INPUT */}
          {form.platform === "Other" && (
            <>
              <label>Custom Platform</label>
              <input
                type="text"
                name="customPlatform"
                placeholder="Enter platform name"
                value={form.customPlatform}
                onChange={handleChange}
                style={styles.input}
              />
            </>
          )}

          {/* USERNAME */}
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onChange={handleChange}
            style={styles.input}
          />

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          {/* BUTTON */}
          <button type="submit" style={styles.button}>
            ➕ Add Account
          </button>
        </form>

        {/* MESSAGE */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    maxWidth: "400px",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
  },

  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "6px",
    cursor: "pointer",
  },

  message: {
    textAlign: "center",
    marginTop: "15px",
    fontWeight: "bold",
  },
};

export default AddAccount;