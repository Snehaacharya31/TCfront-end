import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Slot from "./pages/Slot";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import EventDetails from "./pages/EventDetails";
import AdminLogin from "./pages/AdminLogin";
import About from "./pages/About";
import BookingDetails from "./pages/BookingDetails";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import AdminBookings from "./pages/AdminBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import Gallery from "./pages/Gallery";
import FeedbackWrapper from "./pages/FeedbackWrapper";


function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="events" element={<Events />} />
        <Route path="event/:eventName" element={<EventDetails />} />
        <Route path="slots/:eventName" element={<Slot />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="booking-details" element={<BookingDetails />} />
         <Route path="/feedback" element={<FeedbackWrapper />} />
        
        <Route path="gallery" element={<Gallery />} />

       
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-feedback" element={<AdminFeedback />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="admin-bookings" element={<AdminBookings />} />
        <Route path="admin-users" element={<AdminUsers />} />
      </Route>
    </Routes>
  );
}

export default App;