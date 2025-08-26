import { Router } from "express";
import { addAdmin } from "../controller/admin.controller";
import multer from "multer";

const upload = multer({ storage: multer.diskStorage({}) });
const server = Router();

server.post("/register", upload.single("profilePicture"), addAdmin);

export default server;
