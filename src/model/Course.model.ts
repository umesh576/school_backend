import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    subjectName: {
      type: [String, "Subject name must be string."],
      min: [3, "Subject Name must be smaller than 5 character."],
      max: [20, "Subject name must be smaller then 20 character."],
      required: [true, "Subject name must be required."],
    },
    className: {
      type: [String, "Classname must be number"],
      required: [true, "Class Name must be required."],
      ref: "class",
    },
    description: {
      type: [String, "description must be string."],
      min: [20, "Minimun 20 character required."],
      required: [true, "Description is required."],
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
