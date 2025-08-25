import { Response, Request } from "express";
import AdminRegister from "../model/admin.model";

export const addAdmin = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName } = req.body;

  const admin = await AdminRegister.create();

  res.status(200).json({
    messgae: "New admin created sucessfully.",
    status: "success",
    statusCode: 200,
    success: true,
    data: admin,
  });
};
