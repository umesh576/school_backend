import { Router } from "express";
import { uploadCloudinary } from "../controller/cloudinary.controller";

import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "/tmp/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 50000 },
});

const server = Router();

server.post("/cloudinary", upload.single("file"), uploadCloudinary);

export default server;
