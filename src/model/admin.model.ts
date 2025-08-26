import mongoose from "mongoose";
import { Counter } from "./counter.model";

const emailRegex = /^\S+@\S+\.\S+$/;

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname is required."],
      minLength: [3, "Firstname must me more that 3 character."],
      maxLength: [50, "Firstname must be less than 50 character."],
    },
    lastName: {
      type: String,
      required: [true, "Lastname is required."],
      minLength: [3, "Lastname must me more that 3 character."],
      maxLength: [50, "Lastname must be less than 50 character."],
    },
    role: {
      type: String,
      required: [true, "Role must be required of user."],
      default: "Admin",
    },
    email: {
      type: String,
      required: [true, "Email required for user."],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      minLength: [6, "Password more than 6 character."],
      maxLength: [100, "Password must be less than 50 character."],
    },
    staff: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
    adminId: {
      type: String,
      required: [true, "Id must be required for admin."],
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

// Pre-save hook to generate adminId
adminSchema.pre("save", async function (next) {
  if (this.isNew) {
    // 1. Get the counter for students
    const counter = await Counter.findOneAndUpdate(
      { id: "adminId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // create if not exists
    );

    // 2. Generate the studentId: e.g., STU2025-001
    const year = new Date().getFullYear();
    const paddedSeq = String(counter.seq).padStart(3, "0"); // 1 -> 001
    this.adminId = `ADM${year}-${paddedSeq}`;
  }

  next();
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
