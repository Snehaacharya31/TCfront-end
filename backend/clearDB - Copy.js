import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Booking from "./models/Booking.js";
import User from "./models/User.js";
import Feedback from "./models/Feedback.js";

dotenv.config();
connectDB();

const clearDB = async () => {
  await Booking.deleteMany({});
  await User.deleteMany({});
  await Feedback.deleteMany({});
  console.log("✅ All data cleared!");
  process.exit();
};

clearDB();