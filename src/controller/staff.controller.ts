import { Response, Request } from "express";
import CustomError from "../middleware/customErrorHandle.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { IPayload, Role } from "../@types/global.types";
import Staff from "../model/staff.model";
import { generateWebToken } from "../utils/jwt.utils";
import { uploadFile } from "../config/Cloudinary.config";

export const staffRegistration = async (req: Request, res: Response) => {
  const profilePicture = req.file?.path;
  console.log(req.body);
  const {
    firstName,
    lastName,
    role,
    email,
    password,
    staffId,
    gender,
    phoneNumber,
    workAccess,
  } = req.body;
  if (!email || !password || !firstName || !lastName) {
    throw new CustomError("Required all necessary details.", 404);
  }

  const checkStaff = await Staff.findOne({ email });
  if (checkStaff) {
    throw new CustomError("Staff already exists with this Email.", 404);
  }
  const newPassword = await hashPassword(password);

  const fileUrl = await uploadFile(String(profilePicture));
  const admin = await Staff.create({
    email,
    password: newPassword,
    firstName,
    lastName,
    role,
    staffId,
    gender,
    phoneNumber,
    workAccess,
    profilePicture: fileUrl,
  });

  res.status(200).json({
    messgae: "New admin created sucessfully.",
    status: "success",
    statusCode: 200,
    success: true,
    data: admin,
  });
};

export const staffLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password required.", 404);
  }
  const staff = await Staff.findOne({ email });
  console.log(staff);
  if (!staff) {
    throw new CustomError("Staff not exists", 404);
  }

  const staffPassword = staff.password || "";
  if (staff.role === Role.staff) {
    throw new CustomError("You are not Staff to login here", 404);
  }
  const isMatched = comparePassword(password, staffPassword);

  if (!isMatched) {
    throw new CustomError("Password doesnot matched", 404);
  }

  const payload: IPayload = {
    firstName: staff.firstName,
    lastName: staff.lastName,
    email: staff.email,
    _id: staff._id,
    role: Role.staff,
  };

  const token = generateWebToken(payload);

  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      messgae: "User Login sucessfully.",
      status: "success",
      statusCode: 200,
      success: true,
      data: staff,
      token: token,
    });
};
