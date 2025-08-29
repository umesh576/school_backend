import { Response, Request } from "express";
import Admin from "../model/admin.model";
import CustomError from "../middleware/customErrorHandle.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { uploadFile } from "../config/Cloudinary.config";
import { generateWebToken } from "../utils/jwt.utils";
import { IPayload, Role } from "../@types/global.types";

export const adminRegister = async (req: Request, res: Response) => {
  try {
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
      throw new CustomError("Admin is alredy exists with this email.", 400);
    }

    const checkAdmin = await Admin.findOne({ adminId });

    if (checkAdmin) {
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
  } catch (error) {
    res.status(400).json({
      message: "Request Failed! Something went wrong.",
      status: "Failed",
      success: false,
    });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  // try {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin || admin.role !== Role.superAdmin) {
    throw new CustomError("Admin doesnt exists with this data.", 404);
  }

  const adminpassword = admin.password || "";

  const isMatch = await comparePassword(adminpassword, password);
  console.log(isMatch);

  if (!isMatch) {
    throw new CustomError("User doesnt exists", 404);
  }

  const payload: IPayload = {
    _id: admin._id,
    email: admin.email,
    firstName: admin.firstName,
    lastName: admin.lastName,
    role: admin.role,
  };

  const token = generateWebToken(payload);
  console.log(token);

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
      data: admin,
      token,
    });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "Request Failed! Something went wrong.",
  //     status: "Failed",
  //     success: false,
  //   });
  // }
};
