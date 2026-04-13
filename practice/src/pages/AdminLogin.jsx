import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    if(email === "trinityscapture@gmail.com" && password === "We3"){

      localStorage.setItem("adminLogin",true);

      alert("Admin Login Successful");

      navigate("/admin-dashboard");

    }
    else{

      alert("Invalid Admin Credentials");

    }

  };

  return(

  <div className="admin-login-container">

    <div className="admin-login-box">

      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>

        <div className="form-group">
          <label>Email</label>
          <input
          type="email"
          placeholder="Enter Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          />
        </div>

        <button type="submit" className="admin-btn">
        Login
        </button>

      </form>

    </div>

  </div>

  );

}

export default AdminLogin;