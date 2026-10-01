import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Uploads a file either to Cloudinary (if configured) or keeps it on local disk storage
 * @param {Object} file - Multer file object
 * @param {string} folder - Destination subfolder (e.g. 'profiles' or 'payments')
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadFileToStorage = async (file, folder = 'general') => {
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: `dandiya-jodi/${folder}`,
        resource_type: 'auto',
      });
      // Remove temporary file from local disk if uploaded to Cloudinary
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (err) {
      console.error('Cloudinary upload failed, falling back to local file:', err.message);
    }
  }

  // Fallback to local uploads serving
  const relativePath = `/uploads/${folder}/${file.filename}`;
  return {
    url: relativePath,
    publicId: file.filename,
  };
};

export { cloudinary, isCloudinaryConfigured };
