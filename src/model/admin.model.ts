import mongoose from "mongoose";

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
    },
    password: {
      type: String,
      minLength: [6, "Password more than 6 character."],
      maxLength: [50, "Password must be less than 50 character."],
    },
    staff: [
      {
        type: mongoose.Schema.ObjectId,
      },
    ],
    adminId: {
      type: Number,
      required: [true, "Id must be required for admin."],
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
