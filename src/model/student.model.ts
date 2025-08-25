import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({});

const Student = mongoose.model("user", studentSchema);

export default Student;
