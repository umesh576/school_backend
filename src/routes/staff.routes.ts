import { Router } from "express";
import { staffLogin, staffRegistration } from "../controller/staff.controller";
import multer, { diskStorage } from "multer";

const upload = multer({ storage: diskStorage({}) });

const router = Router();

router.post("/register", upload.single("profilePicture"), staffRegistration);
router.post("/login", staffLogin);

export default router;
