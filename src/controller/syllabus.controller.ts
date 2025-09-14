import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Syllabus from "../model/syllabus.model";
import CustomError from "../middleware/customErrorHandle.middleware";
import Course from "../model/Course.model";

export const addSyllabus = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.courseId) {
    throw new CustomError("Course id required for assign syllabus", 404);
  }

  const course = await Course.findOne({ courseId: body.courseId });

  const syllabus = await Syllabus.create(body);

  if (!syllabus) {
    throw new CustomError("SyllabusCannot created", 404);
  }
  res.status(200).json({
    status: "sccuess",
    statusCode: 200,
    success: true,
    message: "Syllabus is added sucessfully.",
    data: syllabus,
  });
});
