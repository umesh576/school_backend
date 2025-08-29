import { Router } from "express";
import { staffLogin } from "../controller/staff.controller";

const server = Router();

server.post("/register", staffLogin);

export default server;
