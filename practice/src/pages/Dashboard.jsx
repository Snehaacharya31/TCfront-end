
import { useEffect, useState } from "react";
import "./dashboard.css";

function Dashboard() {
 

 const [bookings, setBookings] = useState([]);

useEffect(() => {
  const loggedUser = localStorage.getItem("loggedInUser");

  fetch("http://localhost:5000/api/bookings")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(
        (b) => b.email === loggedUser
      );
      setBookings(filtered);
    });
}, []);
  const formatTimeWithAMPM = (time, ampm) => {
  if (!time) return "-";

  let [hour, minute] = time.split(":");
  let h = parseInt(hour);

  
  if (!ampm) {
    ampm = h >= 12 ? "PM" : "AM";
  }

  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;

  let displayHour = h % 12 || 12;

  return `${displayHour}:${minute} ${ampm}`;
};

  const handleCancel = async (bookingIndex, eventKey, bookingId) => {
  const confirmDelete = window.confirm("Are you sure to cancel this event?");
  if (!confirmDelete) return;

  try {
    const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const updatedBookings = [...bookings];
      const booking = updatedBookings[bookingIndex];

      if (booking.events[eventKey]) {
        delete booking.events[eventKey];
      }

      
      if (Object.keys(booking.events).length === 0) {
        updatedBookings.splice(bookingIndex, 1);
      }

      setBookings(updatedBookings);
      alert("✅ Event cancelled successfully!");
    } else {
      const data = await res.json();
      alert(data.message || "❌ Failed to delete booking");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Server error while deleting booking");
  }
};

  return (
    <div className="dashboard-container">
      <h2 className="title">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="no-booking">No bookings available</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Date</th>
              <th>Time</th>
              <th>Venue</th>
              <th>Phone</th>
              <th>Alt Phone</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.flatMap((booking, index) =>
  (booking.events || []).map((eventData, i) => (
    <tr key={`${index}-${i}`}>
      <td>{index + i + 1}</td>
      <td>{booking.name}</td>
      <td>{booking.email}</td>
      <td>{eventData.name}</td>  {/* ✅ use name */}
      <td>{eventData.date}</td>
      <td>{formatTimeWithAMPM(eventData?.time, eventData?.ampm)}</td>
      <td>
        {[
          eventData?.place,
          eventData?.taluk,
          eventData?.district,
          eventData?.state,
          eventData?.pincode
        ].filter(Boolean).join(", ") || "-"}
      </td>
      <td>{booking.phone}</td>
      <td>{booking.altPhone}</td>
      <td>{booking.description}</td>
      <td>
        <button onClick={() => handleCancel(index, i, booking._id)}>
          Cancel
        </button>
      </td>
    </tr>
  ))
)}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;