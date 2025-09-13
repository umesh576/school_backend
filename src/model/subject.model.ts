import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
      type: [String, "Subject name must be string."],
      min: [3, "Subject Name must be smaller than 5 character."],
      max: [20, "Subject name must be smaller then 20 character."],
    },
    description: {
      type: [String, "description must be string."],
      min: [20, "Minimun 20 character required."],
    },
  },
  { timestamps: true }
);

const Subject = mongoose.model("subject", subjectSchema);
export default Subject;
