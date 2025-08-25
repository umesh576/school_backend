import { Response, Request } from "express";
import Admin from "../model/admin.model";
import CustomError from "../middleware/customErrorHandle.middleware";

export const addAdmin = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role, adminId } = req.body;

  if (!email || !password || !firstName || !lastName || !adminId) {
    throw new CustomError("Required all necessary details.", 404);
  }

  const checkAlredyExists = await Admin.findOne(email);

  if (checkAlredyExists) {
    throw new CustomError("User is alredy exists with this email.", 400);
  }

  const checkByIdAdmin = await Admin.findOne(adminId);

  if (checkByIdAdmin) {
    throw new CustomError("This id is already given.", 404);
  }

  const admin = await Admin.create();

  res.status(200).json({
    messgae: "New admin created sucessfully.",
    status: "success",
    statusCode: 200,
    success: true,
    data: admin,
  });
};
