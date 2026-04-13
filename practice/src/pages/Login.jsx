import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

  const data = await res.json();
if (res.ok) {
  localStorage.setItem("loggedInUser", data.email);

  alert("Login Successful");

  const redirectPath = localStorage.getItem("redirectAfterLogin");

  if (redirectPath) {
    
    localStorage.removeItem("redirectAfterLogin");
    navigate(redirectPath);
  } else {
   
    navigate("/dashboard");
  }

}
 else {
  alert(data.message || "Invalid Email or Password");
}

} catch (err) {
  console.error("Login error:", err);
  alert("Server error during login");
}
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-text">
          New Customer? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;