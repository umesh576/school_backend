import express from "express";
import ConnectDatabase from "./config/DatabaseConnect.config";
import AdminWork from "./routes/admin.routes";
import cloudianryWork from "./routes/cloudinary.routes";
import "dotenv/config";
import "./config/Cloudinary.config";
const app = express();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";

ConnectDatabase(DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", AdminWork);
app.use("/api/cloud", cloudianryWork);

app.listen(PORT, () => {
  console.log(`server running at http//:localhost:${PORT}`);
});
