import mongoose from "mongoose";
const emailRegex = /^\S+@\S+\.\S+$/;
import { Role } from "../@types/global.types";
import { Counter } from "./counter.model";

const studentSchema = new mongoose.Schema(
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
      default: Role.student,
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

    studentId: {
      type: String,
      unique: true,
    },
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

studentSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "student" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const year = new Date().getFullYear();
    const paddedSeq = String(counter.seq).padStart(3, "0");
    this.studentId = `STUDENT${year}-${paddedSeq}`;
  }
  next();
});

const Student = mongoose.model("student", studentSchema);

export default Student;
