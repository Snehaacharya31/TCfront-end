import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import Feedback from "./models/Feedback.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running...");
});

/* ----------------- FEEDBACK ----------------- */
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, contact, description, rating, email } = req.body;
    if (!name || !contact || !description || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newFeedback = await Feedback.create({ name, contact, description, rating, email });
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(500).json({ message: "Server error creating feedback" });
  }
});

app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching feedbacks" });
  }
});

/* ----------------- AUTH ----------------- */
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error registering user" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
    res.json({ message: "Login successful", name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error during login" });
  }
});

/* ----------------- USERS (ADMIN PANEL) ----------------- */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find({}, "name email _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching users" });
  }
});

/* ----------------- BOOKINGS ----------------- */
app.use("/api/bookings", bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));