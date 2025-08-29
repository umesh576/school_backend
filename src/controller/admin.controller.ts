import { Response, Request } from "express";
import Admin from "../model/admin.model";
import CustomError from "../middleware/customErrorHandle.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { uploadFile } from "../config/Cloudinary.config";
import { generateWebToken } from "../utils/jwt.utils";
import { IPayload, Role } from "../@types/global.types";
import User from "../model/admin.model";

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
    throw new CustomError("user doesnt exists.", 404);
  }

  // console.log(admin);
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

export const staffLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email and password required.", 404);
  }
  const staff = await User.findOne({ email });
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
