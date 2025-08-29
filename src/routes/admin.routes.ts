import { Router } from "express";
import { adminLogin, adminRegister } from "../controller/admin.controller";
import multer from "multer";

const upload = multer({ storage: multer.diskStorage({}) });
const router = Router();

router.post("/register", upload.single("profilePicture"), adminRegister);
router.post("/login", adminLogin);
// router.post("/login", staffLogin);
export default router;
