import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema({
  id: { type: String, required: true, unique: true }, // sequence name, e.g., "studentId"
  seq: { type: Number, default: 0 }, // last used number
});

export const Counter = mongoose.model("Counter", counterSchema);
