import { useState } from "react";
import { NavLink, useNavigate, useLocation, Outlet, Link } from "react-router-dom";
import "./Layout.css";

function Layout() {

  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const loggedInUser = localStorage.getItem("loggedInUser");

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <div>

      
      <div className="header">
        <div className="logo-title">
          <img src="/Logo.png" alt="Logo" className="Logo" />
          <h2>Trinity'S Captures</h2>
        </div>

        <div className="header-icons">
          <span className="menu-icon" onClick={() => setMenuOpen(true)}>
            ☰
          </span>
        </div>
      </div>

      <div className={`sidebar ${menuOpen ? "active" : ""}`}>

        <span className="close-btn" onClick={closeMenu}>
          ✖ Menu
        </span>

        <ul>
          <li>
            <NavLink to="/" onClick={closeMenu}>Home</NavLink>
          </li>

          <li>
            <NavLink to="/admin-login" onClick={closeMenu}>Admin</NavLink>
          </li>

          {!loggedInUser && (
            <li>
              <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
            </li>
          )}

          <li>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
          </li>

          <li>
            <NavLink to="/feedback" onClick={closeMenu}>Feedback</NavLink>
          </li>

          
          <li>
            <NavLink to="/gallery" onClick={closeMenu}>Gallery</NavLink>
          </li>

          {loggedInUser && (
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>

        
        <footer className="footer">
          <h3>Contact Us</h3>
          <p>Email: trinityscapture@gmail.com</p>
          <p>Phone: +91 9606490457,91 9606532254, +91 7975378024.</p>
          <p>Aripady complex, college road Ujire, Belthangady, DK-574 240</p>
        </footer>

      </div>

     
      <div className="content">

        {location.pathname !== "/" && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        )}

       
        <Outlet />

      </div>

    </div>
  );
}

export default Layout;