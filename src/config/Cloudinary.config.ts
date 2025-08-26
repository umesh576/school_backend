// config/Cloudinary.config.ts
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // ✅ fixed typo
});

export const uploadFile = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    console.log(result.secure_url);
    return { url: result.secure_url, publicId: result.public_id }; // ✅ return only URL
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const deleteFile = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateFile = async (newFilePath: any, publicId: string) => {
  try {
    const result = await cloudinary.uploader.upload(newFilePath, {
      public_id: publicId,
      overwrite: true,
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
