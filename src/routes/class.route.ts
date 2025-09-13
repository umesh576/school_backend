import { Router } from "express";
import { addClass } from "../controller/class.controller";

const router = Router();

router.post("/addClass", addClass);

export default router;
