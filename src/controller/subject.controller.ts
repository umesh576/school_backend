import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import CustomError from "../middleware/customErrorHandle.middleware";
import Subject from "../model/subject.model";

export const addSubject = asyncHandler(async (req: Request, res: Response) => {
  const { subjectName, className, description } = req.body;
  if (!subjectName || !description) {
    throw new CustomError("Subjetname and Descriptopn is required", 404);
  }

  const subject = await Subject.create({ subjectName, className, description });

  if (!subject) {
    throw new CustomError("Subject is not created.", 500);
  }
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Subject Created Sucessfully.",
    success: true,
    data: subject,
  });
});
