// controller/cloudinary.controller.ts
import { Request, Response } from "express";
import {
  deleteFile,
  updateFile,
  uploadFile,
} from "../config/Cloudinary.config";

export const uploadCloudinary = async (req: Request, res: Response) => {
  try {
    const filePath: any = req.file?.path;

    if (!filePath) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const fileUrl = await uploadFile(filePath);

    res.json({
      success: true,
      url: fileUrl,
      message: "Uploaded successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const deleteCloudinarySingle = async (req: Request, res: Response) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res
        .status(400)
        .json({ success: false, message: "No file deleted" });
    }

    const response = await deleteFile(publicId);
    res.json({
      success: true,
      url: response,
      message: "Deleted sucessfully successfully",
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

export const updateCloudinaryFile = async (req: Request, res: Response) => {
  //   try {
  const { publicId } = req.params;
  const filePath = req.file?.path;

  console.log(filePath);
  const repalceFile = await updateFile(filePath, publicId);

  res.json({
    success: true,
    url: repalceFile,
    message: "Update successfully",
  });
  //   } catch (error: any) {
  //     res.status(500).json({ success: false, message: "Upload failed" });
  //   }
};
