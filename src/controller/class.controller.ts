import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Class from "../model/class.model";
import CustomError from "../middleware/customErrorHandle.middleware";

export const addClass = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.className) {
    throw new CustomError("Class Name is required for add new class", 404);
  }

  const existClass = await Class.findOne({ className: body.className });
  if (existClass) {
    throw new CustomError("Class already Exists", 400);
  }
  const classes = await Class.create(body);
  if (!classes) {
    throw new CustomError("Class cannot created.", 400);
  }
  res.status(200).json({
    ststus: "success",
    statusCode: 200,
    message: "Class added sucessfully.",
    data: classes,
  });
});
