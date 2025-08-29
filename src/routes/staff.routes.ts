import { Router } from "express";
import { staffLogin, staffRegistration } from "../controller/staff.controller";
import multer, { diskStorage } from "multer";

const upload = multer({ storage: diskStorage({}) });

const server = Router();

server.post("/register", upload.single("profilePicture"), staffRegistration);
server.post("login", staffLogin);

export default server;
