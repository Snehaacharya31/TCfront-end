import { useState, useEffect } from "react";
import "./Booking.css";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Admin Data:", data);
        setBookings(data);
      })
      .catch((err) => console.error(err));
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

  const handleDelete = async (index, bookingId) => {
    const confirmDelete = window.confirm("Are you sure?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${bookingId}`, { method: "DELETE" });
      if (res.ok) {
        const updatedBookings = [...bookings];
        updatedBookings.splice(index, 1);
        setBookings(updatedBookings);
        alert("✅ Booking Cancelled Successfully");
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
    <div>
      <h2>All Customer Bookings</h2>
      <p>Total Bookings : {bookings.length}</p>

      <table border="1" cellPadding="10">
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
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking, index) => {
              const eventsArray = Array.isArray(booking.events) ? booking.events : [];

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>

                  {/* Event Names */}
                  <td>
                    {booking.eventType === "Wedding"
                      ? `Wedding: ${eventsArray.map((e) => e.name).join(", ")}`
                      : booking.eventType}
                  </td>

                  {/* Dates */}
                  <td>
                    {booking.eventType === "Wedding"
                      ? eventsArray.map((e) => e.date).join(", ")
                      : eventsArray[0]?.date || "-"}
                  </td>

                  {/* Times */}
                  <td>
                    {booking.eventType === "Wedding"
                      ? eventsArray.map((e) => formatTimeWithAMPM(e.time, e.ampm)).join(", ")
                      : formatTimeWithAMPM(eventsArray[0]?.time, eventsArray[0]?.ampm)}
                  </td>

                  {/* Venue */}
                  <td>
                    {booking.eventType === "Wedding"
                      ? eventsArray
                          .map(
                            (e) =>
                              [e.place, e.taluk, e.district, e.state, e.pincode].filter(Boolean).join(" - ")
                          )
                          .join(" , ")
                      : [eventsArray[0]?.place, eventsArray[0]?.taluk, eventsArray[0]?.district, eventsArray[0]?.state, eventsArray[0]?.pincode]
                          .filter(Boolean)
                          .join(" - ") || "-"}
                  </td>

                  <td>{booking.phone}</td>
                  <td>{booking.description}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(index, booking._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        cursor: "pointer",
                        borderRadius: "5px",
                      }}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No Bookings Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings;