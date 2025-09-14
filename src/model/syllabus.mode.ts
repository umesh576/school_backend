import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema(
  {
    Heading: {
      type: String,
      required: "Heading is required.",
      min: [5, "Heading must Have 5 Character"],
    },
    content: {
      type: String,
      required: "Heading is required.",
      min: [5, "Content must Have 5 Character"],
    },
    subHeading: {
      type: String,
      min: [5, "Sub heading must Have 5 Character"],
    },
    subContent: {
      type: String,
      min: [5, "Sub content must Have 5 Character"],
    },
  },
  { timestamps: true }
);
