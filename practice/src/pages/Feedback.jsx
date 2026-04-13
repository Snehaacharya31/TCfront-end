import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feedback.css";

function Feedback() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email:"",
    contact: "",
    description: "",
    rating: 0,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "contact") {
      const cleanValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, contact: cleanValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const handleRating = (star) => {
    setFormData((prev) => ({
      ...prev,
      rating: prev.rating === star ? 0 : star,
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(formData.contact)) {
      alert("Contact number must be exactly 10 digits!");
      return;
    }

    if (!formData.description) {
      alert("Please enter your feedback.");
      return;
    }

    try {
      const loggedUser = localStorage.getItem("loggedInUser");

  const feedbackData = {
  name: formData.name,
  contact: formData.contact,
  description: formData.description,
  rating: formData.rating,
  email: loggedUser, 
};

      
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Thank you for your feedback!");
        setFormData({ name: "", contact: "", description: "", rating: 0 });
        navigate("/");
      } else {
        alert(data.message || "Error submitting feedback");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error submitting feedback");
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="feedback-card">
        <h2>Customer Feedback</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
  type="email"
  name="email"
  placeholder="Your Email"
  value={formData.email || ""}
  onChange={handleChange}
  required
/>

          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            maxLength={10}
            required
          />
          <textarea
            name="description"
            placeholder="Write your experience..."
            value={formData.description}
            onChange={handleChange}
            required
          />
          <div className="rating-section">
            <span>Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= formData.rating ? "star active" : "star"}
                onClick={() => handleRating(star)}
                style={{ cursor: "pointer" }}
              >
                ★
              </span>
            ))}
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;