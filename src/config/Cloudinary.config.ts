import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// cloudinary.uploader("");

console.log(
  "umesh",
  process.env.CLOUDINARY_NAME,
  "joshi",
  process.env.CLOUDINARY_API_SECRECT,
  "raj",
  process.env.CLOUDINARY_API_KEY
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRECT,
});

// cloudinary.uploader
//   .upload("dog.mp4", {
//     resource_type: "video",
//     public_id: "my_dog",
//     overwrite: true,
//     notification_url: "https://mysite.example.com/notify_endpoint",
//   })
//   .then((result) => console.log(result))
//   .catch(() => {
//     console.log("umesh");
//   });

export const uploadFile = async (filePath: string) => {
  try {
    const url = await cloudinary.uploader.upload(filePath);
    console.log(url);
  } catch (error: any) {
    console.log(error);
  }
};
