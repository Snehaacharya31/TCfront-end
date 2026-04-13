import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Slot.css";

function Slot() {
  const { eventName } = useParams();
  const navigate = useNavigate();
  

  const isWedding = eventName === "Wedding";

  const weddingEvents = ["Haldi", "Sangeeth", "Mehendi", "Wedding", "Reception"];

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: localStorage.getItem("loggedInUser") || "",
    phone: "",
    altPhone: "",
    description: "",
  });

useEffect(() => {
  const loggedUser = localStorage.getItem("loggedInUser");

  if (!loggedUser) {
    // ✅ FIRST save data
    localStorage.setItem("redirectAfterLogin", "booking");
    localStorage.setItem("selectedEvent", eventName);

    console.log("Saved before login:", {
      redirect: "booking",
      event: eventName,
    });

    // ❌ REMOVE alert (very important)
    navigate("/login");
  }
}, [navigate, eventName]);

  /* SELECT EVENTS */
  const handleEventSelect = (event) => {
    if (selectedEvents.includes(event)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== event));
      const updated = { ...eventDetails };
      delete updated[event];
      setEventDetails(updated);
    } else {
      setSelectedEvents([...selectedEvents, event]);
      setEventDetails({
        ...eventDetails,
        [event]: {
          date: "",
          time: "",
          ampm: "AM",
          place: "",
          taluk: "",
          district: "",
          state: "",
          pincode: "",
        },
      });
    }
  };

  /* EVENT FIELD CHANGE */
  const handleEventChange = (event, field, value) => {
    setEventDetails({
      ...eventDetails,
      [event]: {
        ...eventDetails[event],
        [field]: value,
      },
    });
  };

  /* INPUT CHANGE */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const loggedUser = localStorage.getItem("loggedInUser");
  if (!loggedUser) {
    alert("⚠ Please login before booking!");
    navigate("/login");
    return;
  }

  // Validate basic form
  if (!formData.name.trim()) {
    alert("⚠ Please enter your name.");
    return;
  }
  if (!formData.phone || formData.phone.length !== 10) {
    alert("⚠ Please enter a valid 10-digit phone number.");
    return;
  }

  // Validate selected events
  for (let ev of Object.keys(eventDetails)) {
    const details = eventDetails[ev];
    if (!details.date || !details.time || !details.place || !details.taluk || !details.district || !details.state || !details.pincode) {
      alert(`⚠ Please fill all fields for ${ev}`);
      return;
    }
  }

  const eventsArray = Object.keys(eventDetails).map(key => ({
    ...eventDetails[key],
    name: key
  }));

  const booking = {
    ...formData,
    email: loggedUser,
    eventType: eventName,
    events: eventsArray,
  };

  try {
    const res = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Booking Confirmed!");
      navigate("/dashboard");
    } else {
      alert(data.message || "❌ Booking failed. Check console.");
    }
  } catch (error) {
    console.error(error);
    alert("❌ Server error. Check console.");
  }
};

  return (
    <div className="slot-container">
      <div className="slot-card">
        <h2 className="slot-title">Booking Form</h2>
        <form onSubmit={handleSubmit} className="slot-form">
          {/* Name */}
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={formData.email} readOnly />
          </div>

          {/* Wedding Events */}
          {isWedding && (
            <div className="form-group">
              <label>Select Wedding Events</label>
              <div className="event-options">
                {weddingEvents.map((event) => (
                  <label key={event}>
                    <input type="checkbox" checked={selectedEvents.includes(event)} onChange={() => handleEventSelect(event)} />
                    {event}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Event Details */}
          {(isWedding ? selectedEvents : [eventName]).map((event) => (
            <div key={event} className="event-box">
              <h4 className="event-title">{event} Details</h4>
              <div className="row">
                <div className="field">
                  <label>Date</label>
                  <input type="date" required min={new Date().toISOString().split("T")[0]} value={eventDetails[event]?.date || ""} onChange={(e) => handleEventChange(event, "date", e.target.value)} />
                </div>

                <div className="field">
                  <label>Time</label>
                  <div className="time-group">
                    <input type="time" required value={eventDetails[event]?.time || ""} onChange={(e) => handleEventChange(event, "time", e.target.value)} />
                    <select required value={eventDetails[event]?.ampm || "AM"} onChange={(e) => handleEventChange(event, "ampm", e.target.value)}>
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="field-group">
                <label>Address</label>
                <div className="address-grid">
                  <input type="text" placeholder="Place" required value={eventDetails[event]?.place || ""} onChange={(e) => handleEventChange(event, "place", e.target.value)} />
                  <input type="text" placeholder="Taluk" required value={eventDetails[event]?.taluk || ""} onChange={(e) => handleEventChange(event, "taluk", e.target.value)} />
                  <input type="text" placeholder="District" required value={eventDetails[event]?.district || ""} onChange={(e) => handleEventChange(event, "district", e.target.value)} />
                  <input type="text" placeholder="State" required value={eventDetails[event]?.state || ""} onChange={(e) => handleEventChange(event, "state", e.target.value)} />
                  <input type="text" placeholder="Pincode" maxLength="6" required value={eventDetails[event]?.pincode || ""} onChange={(e) => handleEventChange(event, "pincode", e.target.value.replace(/\D/g, ""))} />
                </div>
              </div>
            </div>
          ))}

          {/* Phone */}
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" maxLength="10" pattern="[0-9]{10}" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })} />
          </div>

          {/* Alt Phone */}
          <div className="form-group">
            <label>Alternate Phone</label>
            <input type="tel" maxLength="10" pattern="[0-9]{10}" value={formData.altPhone} onChange={(e) => setFormData({ ...formData, altPhone: e.target.value.replace(/\D/g, "") })} />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <textarea rows="3" name="description" value={formData.description} onChange={handleChange} />
          </div>

          <center>
            <button type="submit" className="book-btn">
              Confirm Booking
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default Slot;