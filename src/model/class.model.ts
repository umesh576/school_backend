import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: [String, "Class name must be String"],
      required: [true, "Class name is required."],
    },
    subject: [
      {
        type: [mongoose.Schema.ObjectId, "Type must be object id."],
        ref: "subject",
      },
    ],
    student: [
      {
        type: mongoose.Schema.ObjectId,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("class", classSchema);
export default Class;
