import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    className: {
      type: [String, "Class name must be String"],
    },
    subject: [
      {
        type: [mongoose.Schema.ObjectId, "Type must be object id."],
        ref: "subject",
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("class", classSchema);
export default Class;
