import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Syllabus from "../model/syllabus.model";
import CustomError from "../middleware/customErrorHandle.middleware";

const addSyllabus = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.courseId) {
    throw new CustomError("Course id required for assign syllabus", 404);
  }
  const syllabus = await Syllabus.create(body);
  res.status(200).json({
    status: "sccuess",
    statusCode: 200,
    success: true,
    message: "Syllabus is added sucessfully.",
    data: syllabus,
  });
});
