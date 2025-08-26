import { Request, Response } from "express";
import { uploadFile } from "../config/Cloudinary.config";
import Cloud from "../model/cloudianry.model";

export const uploadCloudinary = async (req: Request, res: Response) => {
  //   console.log(req.body);
  //   const { image } = req.body;
  const filePath: any = req.file?.path;

  const file = await uploadFile(filePath);
  console.log(file);

  //   const clous = await Cloud.create({ image: file.secure_url });

  //   res.status(200).json({
  //     message: "created",
  //     status: "success",
  //     data: file,
  //   });
  res.send({ success: true, message: "uploaded" });
};
