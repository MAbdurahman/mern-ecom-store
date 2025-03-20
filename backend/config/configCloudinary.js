import {v2 as cloudinary} from 'cloudinary';
import multer from 'multer';

export const connectCloudinary = async () => {
   await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
   });
}

const storage = new multer.memoryStorage();

export async function imageUploadedFile(file) {
   return await cloudinary.uploader.upload(file, {resource_type: 'auto'});
}

export const upload = multer({ storage });