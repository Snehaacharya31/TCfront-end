import { useEffect, useState } from "react";
import "./AdminFeedback.css"; // ✅ add this line

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/feedbacks");
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="admin-feedback-wrapper">
      <h2>Customer Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks yet.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f._id}>
                <td>{f.name}</td>
                <td>{f.contact}</td>
                <td>{f.email}</td>
                <td>{f.rating} ⭐</td>
                <td>{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminFeedback;