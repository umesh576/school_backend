import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: String,
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
