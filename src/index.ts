import express, { Request, Response } from "express";
import ConnectDatabase from "./config/DatabaseConnect.config";
import AdminWork from "./routes/admin.routes";
import cloudianryWork from "./routes/cloudinary.routes";
import staffWork from "./routes/staff.routes";
import studentWork from "./routes/student.routes";
import "dotenv/config";
import "./config/Cloudinary.config";
const app = express();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || "";

ConnectDatabase(DB_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", AdminWork);
app.use("/api/cloud", cloudianryWork);
app.use("/api/staff", staffWork);
app.use("/api/student", studentWork);

// global error
app.use((err: any, req: Request, res: Response, next: any) => {
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Something went Wrong",
    sucess: false,
  });
});

app.listen(PORT, () => {
  console.log(`server running at http//:localhost:${PORT}`);
});
