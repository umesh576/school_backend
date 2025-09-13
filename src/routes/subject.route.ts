import { Router } from "express";
import { addSubject } from "../controller/subject.controller";

const router = Router();

router.post("/addSubject", addSubject);

export default router;
