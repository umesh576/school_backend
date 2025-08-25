import mongoose from "mongoose";

const ConnectDatabase = (url: string) => {
  mongoose.connect(url).then(() => {
    console.log("Database connected.");
  });
};

export default ConnectDatabase;
