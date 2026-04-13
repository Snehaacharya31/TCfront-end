import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaComments, FaUsers } from "react-icons/fa";
import "./admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">

      
      <div className="particles">
        {[...Array(40)].map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <h2>Admin Dashboard</h2>

      <div className="admin-buttons">
        <button onClick={() => navigate("/admin-bookings")}>
          <FaClipboardList className="icon" /> Booking
        </button>

        <button onClick={() => navigate("/admin-feedback")}>
          <FaComments className="icon" /> Feedback
        </button>

        <button onClick={() => navigate("/admin-users")}>
          <FaUsers className="icon" /> Users
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;