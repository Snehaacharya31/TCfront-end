import { Link } from "react-router-dom";

function BookingList({ bookings }) {
  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <p>{booking.name} — {booking.date}</p>
            
            <Link to={`/feedback/${booking.id}`}>Leave Feedback</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;