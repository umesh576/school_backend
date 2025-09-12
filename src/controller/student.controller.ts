import { Request, Response } from "express";
import Student from "../model/student.model";
import CustomError from "../middleware/customErrorHandle.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { uploadFile } from "../config/Cloudinary.config";
import { IPayload, Role } from "../@types/global.types";
import { generateWebToken } from "../utils/jwt.utils";

export const studentregistration = async (req: Request, res: Response) => {
  const profilePicture = req.file?.path;
  const {
    firstName,
    lastName,
    email,
    password,
    studentId,
    gender,
    phoneNumber,
  } = req.body;

  if (!email || !password || !firstName || !lastName) {
    throw new CustomError("Required all necessary details.", 404);
  }

  const checkStudent = await Student.findOne({ email });
  if (checkStudent) {
    throw new CustomError("Student already exists with this email.", 404);
  }

  const hasedPassword = await hashPassword(password);
  const fileUrl = await uploadFile(String(profilePicture));

  const student = await Student.create({
    email,
    password: hasedPassword,
    firstName,
    lastName,
    studentId,
    gender,
    phoneNumber,
    profilePicture: fileUrl,
  });
  res.status(200).json({
    messgae: "New admin created sucessfully.",
    status: "success",
    statusCode: 200,
    success: true,
    data: student,
  });
};

export const studentLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError("Email nas passowrd Required for Login.", 404);
  }

  const student = await Student.findOne({ email });
  if (!student) {
    throw new CustomError("Student not exixts with email.", 404);
  }
  const stdPassword = student.password || "";
  const verifyPassword = await comparePassword(stdPassword, password);
  console.log(verifyPassword);
  if (!verifyPassword) {
    throw new CustomError("Password not match.", 404);
  }

  const payload: IPayload = {
    _id: student._id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    role: Role.student,
  };

  const token = generateWebToken(payload);
  res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({
      messgae: "Student Login sucessfully.",
      status: "success",
      statusCode: 200,
      success: true,
      data: student,
      token: token,
    });
};

export const getStudentById = async (req: Request, res: Response) => {
  const studentId = req.params.id;

  if (!studentId) {
    throw new CustomError("Student Fetched sucessfully.", 404);
  }

  const student = await Student.findById(studentId);

  res.status(200).json({
    status: "sccuess",
    message: "Student Fetch Sucessfully",
    success: true,
    data: student,
  });
};

export const getAllStudent = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();

    console.log(students);

    res.status(200).json({
      status: "sccuess",
      message: "Students Fetch Sucessfully",
      success: true,
      data: students,
    });
  } catch (e) {
    res.status(400).json({
      status: "sccuess",
      message: "Students Fetch Sucessfully",
      success: false,
    });
  }
};
