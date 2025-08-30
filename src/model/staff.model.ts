import mongoose from "mongoose";
import { Counter } from "./counter.model";
import { Role } from "../@types/global.types";
const emailRegex = /^\S+@\S+\.\S+$/;
const staffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required."],
      minLength: [3, "Firstname must me more that 3 character."],
      maxLength: [30, "Firstname must be less than 30 character."],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required."],
      minLength: [3, "Lastname must me more that 3 character."],
      maxLength: [30, "Lastname must be less than 50 character."],
    },
    role: {
      type: String,
      default: Role.staff,
      required: [true, "Role must be required of admin."],
    },
    email: {
      type: String,
      required: [true, "Email required for admin."],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password more than 6 character."],
      maxLength: [100, "Password must be less than 50 character."],
    },

    staffId: {
      type: String,
      unique: true,
    },
    workAccess: [
      {
        type: String,
      },
    ],
    gender: {
      type: String,
      required: [true, "Gender required."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phonenumber required."],
    },
    profilePicture: {
      type: Object,
      required: [true, "Profile pictue is required. "],
    },
  },
  { timestamps: true }
);

const Staff = mongoose.model("staff", staffSchema);
// Pre-save hook to generate adminId
staffSchema.pre("save", async function (next) {
  if (this.isNew) {
    // 1. Get the counter for students
    const counter = await Counter.findOneAndUpdate(
      { id: "staffId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if not exists
    );

    // 2. Generate the studentId: e.g., STU2025-001
    const year = new Date().getFullYear();
    const paddedSeq = String(counter.seq).padStart(3, "0"); // 1 -> 001
    this.staffId = `STAFF${year}-${paddedSeq}`;
  }

  next();
});

export default Staff;
