import { Router } from "express";
import {
  studentLogin,
  studentregistration,
} from "../controller/student.controller";

const router = Router();

router.post("/register", studentregistration);
router.post("/login", studentLogin);

export default router;
