import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);