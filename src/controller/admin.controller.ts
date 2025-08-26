import { Response, Request } from "express";
import Admin from "../model/admin.model";
import CustomError from "../middleware/customErrorHandle.middleware";
import { hashPassword } from "../utils/bcrypt.utils";
import { uploadFile } from "../config/Cloudinary.config";

export const addAdmin = async (req: Request, res: Response) => {
  // try {
  const profilePicture = req.file?.path;

  const {
    firstName,
    lastName,
    role,
    email,
    password,
    adminId,
    gender,
    phoneNumber,
    workAccess,
  } = req.body;

  if (!email || !password || !firstName || !lastName || !adminId) {
    throw new CustomError("Required all necessary details.", 404);
  }

  const checkAlredyExists = await Admin.findOne({ email });

  if (checkAlredyExists) {
    throw new CustomError("User is alredy exists with this email.", 400);
  }

  const checkByIdAdmin = await Admin.findOne({ adminId });

  if (checkByIdAdmin) {
    throw new CustomError("This id is already given.", 404);
  }

  const newPassword = await hashPassword(password);

  const fileUrl = await uploadFile(String(profilePicture));

  const admin = await Admin.create({
    email,
    password: newPassword,
    firstName,
    lastName,
    role,
    adminId,
    gender,
    phoneNumber,
    workAccess,
    profilePicture: fileUrl,
  });

  if (!admin) {
    throw new CustomError("Admin not created.", 500);
  }

  res.status(200).json({
    messgae: "New admin created sucessfully.",
    status: "success",
    statusCode: 200,
    success: true,
    data: admin,
  });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "Request Failed! Something went wrong.",
  //     status: "Failed",
  //     success: false,
  //   });
  // }
};
