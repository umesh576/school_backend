import { v2 as cloudinary } from "cloudinary";

// cloudinary.uploader("");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_SECRECT,
  api_secret: process.env.CLOUDINARY_API_KEY,
});

cloudinary.uploader
  .upload("dog.mp4", {
    resource_type: "video",
    public_id: "my_dog",
    overwrite: true,
    notification_url: "https://mysite.example.com/notify_endpoint",
  })
  .then((result) => console.log(result))
  .catch(() => {
    console.log("umesh");
  });
