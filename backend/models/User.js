import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // store hashed ideally
  role: { type: String, default: "customer" } // distinguish customer vs admin
}, { timestamps: true });

export default mongoose.model("User", userSchema);