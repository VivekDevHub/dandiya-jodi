import { uploadFileToStorage } from '../config/cloudinary.js';

export const uploadProfilePhotos = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least 1 image file (JPG, PNG, or WebP up to 10MB).',
      });
    }

    const uploadPromises = req.files.map((file) => uploadFileToStorage(file, 'profiles'));
    const uploadedImages = await Promise.all(uploadPromises);

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      data: uploadedImages,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPaymentScreenshot = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select a payment screenshot image (JPG, PNG, or WebP up to 10MB).',
      });
    }

    const uploaded = await uploadFileToStorage(req.file, 'payments');

    res.status(200).json({
      success: true,
      message: 'Payment screenshot uploaded successfully',
      data: uploaded,
    });
  } catch (error) {
    next(error);
  }
};
