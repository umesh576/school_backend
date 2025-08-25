import express from "express";
import ConnectDatabase from "./config/DatabaseConnect.config";
import "dotenv/config";

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";

ConnectDatabase(DB_URI);

app.listen(PORT, () => {
  console.log(`server running at http//:localhost:${PORT}`);
});
