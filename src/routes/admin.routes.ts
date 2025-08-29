import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  staffLogin,
} from "../controller/admin.controller";
import multer from "multer";

const upload = multer({ storage: multer.diskStorage({}) });
const server = Router();

server.post("/register", upload.single("profilePicture"), adminRegister);
server.post("/admin/login", adminLogin);
server.post("/staff/login", staffLogin);
export default server;
