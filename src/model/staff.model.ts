import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({});

const Staff = mongoose.model("staff", staffSchema);

export default Staff;
