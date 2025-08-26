// routes/cloudinary.routes.ts
import { Router } from "express";
import {
  deleteCloudinarySingle,
  updateCloudinaryFile,
  uploadCloudinary,
} from "../controller/cloudinary.controller";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5 * 1024 * 1024 }, // ✅ 5MB
});

const server = Router();

server.post("/cloudinary", upload.single("image"), uploadCloudinary);
server.delete("/delete", deleteCloudinarySingle);
server.put("/:publicId", upload.single("image"), updateCloudinaryFile);

export default server;
