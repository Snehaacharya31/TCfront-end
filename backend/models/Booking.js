import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  date: String,
  time: String,
  ampm: String,
  place: String,
  taluk: String,
  district: String,
  state: String,
  pincode: String,
});

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    altPhone: String,
    description: String,
    eventType: String,

    // ✅ FIX: use Object instead of Map
    events: { type: Object, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;