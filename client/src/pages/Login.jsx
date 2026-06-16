import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
     localStorage.setItem("token", "test123");

  // dashboard ku pogum
  navigate("/dashboard");

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }
    localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify({ email }));
    console.log("Login Data:", { email, password });
      navigate("/dashboard");


    const loginData = {
  email,
  time: new Date().toLocaleString()
};

let history = JSON.parse(localStorage.getItem("history")) || [];

history.push(loginData);

localStorage.setItem("history", JSON.stringify(history));
    navigate("/");
  };

  return (
    <div className="login-wrapper">

      <div className="login-card">

        <h1>Welcome Back 👋</h1>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Login</button>

        </form>

        <p style={{ marginTop: "15px", fontSize: "13px" }}>
          Don't have an account?{" "}
          <Link to="/register">Register here</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;