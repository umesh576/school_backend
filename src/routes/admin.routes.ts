import { Router } from "express";
import { addAdmin } from "../controller/admin.controller";

const server = Router();

server.post("/register", addAdmin);

export default server;
