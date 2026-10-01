import express from 'express';
import { uploadProfilePhotos, uploadPaymentScreenshot } from '../controllers/upload.controller.js';
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/profile', upload.array('photos', 5), uploadProfilePhotos);
router.post('/payment', upload.single('paymentScreenshot'), uploadPaymentScreenshot);

export default router;
