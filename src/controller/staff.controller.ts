import { Response, Request } from "express";
import CustomError from "../middleware/customErrorHandle.middleware";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import { IPayload, Role } from "../@types/global.types";
import Staff from "../model/staff.model";
import { generateWebToken } from "../utils/jwt.utils";

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
