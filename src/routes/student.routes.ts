import { Router } from "express";
import {
  studentLogin,
  studentregistration,
} from "../controller/student.controller";
import multer, { diskStorage } from "multer";

const upload = multer({ storage: diskStorage({}) });
const router = Router();

router.post("/register", upload.single("profilePicture"), studentregistration);
router.post("/login", studentLogin);

export default router;
