import mongoose from "mongoose";

const cloudSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Cloud = mongoose.model("cloud", cloudSchema);
export default Cloud;
