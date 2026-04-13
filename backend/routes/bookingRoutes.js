import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST /api/bookings — Create a booking
router.post("/", async (req, res) => {
  try {
    const { email, name, phone, events, eventType } = req.body;
    if (!email || !name || !phone || !events || !eventType) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const normalizeDate = (date) =>
      date ? new Date(date).toISOString().split("T")[0] : "";

    const newEventsArray = Object.values(events); // Flatten new booking events

    // Get all existing bookings
    const existingBookings = await Booking.find();

    // Loop through all new events
    for (let newEvent of newEventsArray) {
      const newDate = normalizeDate(newEvent.date);
    

      // Check against all existing bookings
      for (let booking of existingBookings) {
        const oldEventsArray = booking.events
          ? Array.isArray(booking.events)
            ? booking.events
            : Object.values(booking.events)
          : [];

        for (let oldEvent of oldEventsArray) {
          const oldDate = normalizeDate(oldEvent.date);
       

          if (newDate === oldDate) {
            return res.status(400).json({
              message: `❌ Booking not allowed. Date ${newDate}  is already booked.`,
            });
          }
        }
      }
    }

    // No conflicts → create booking
    const booking = await Booking.create(req.body);
    res.status(201).json({ message: "Booking confirmed ✅", booking });
  } catch (err) {
    console.error("🔥 Booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// GET /api/bookings — Get all bookings
router.get("/", async (req, res) => {
  try {
    const data = await Booking.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/bookings/:id — Delete a booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error deleting booking" });
  }
});

export default router;