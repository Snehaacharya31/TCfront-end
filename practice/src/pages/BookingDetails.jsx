import { useState } from "react";

function BookingDetails() {

const loggedUser = localStorage.getItem("loggedInUser");

const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

const userBookings = allBookings.filter(
(b) => b.user === loggedUser
);

const [myBookings] = useState(userBookings);

return (

<div>

<h2>My Booking Details</h2>

<table border="1">

<thead>
<tr>
<th>Event</th>
<th>Date</th>
<th>Time</th>
</tr>
</thead>

<tbody>

{myBookings.length > 0 ? (
myBookings.map((b,i)=>(
<tr key={i}>
<td>{b.event}</td>
<td>{b.date}</td>
<td>{b.time}</td>
</tr>
))
) : (
<tr>
<td colSpan="3">No Bookings Found</td>
</tr>
)}

</tbody>

</table>

</div>

);

}

export default BookingDetails;