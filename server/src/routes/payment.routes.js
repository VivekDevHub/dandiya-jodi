import express from 'express';
import {
  createRazorpayOrder,
  verifyPayment,
  handleManualPayment,
  getPaymentByRegistration,
} from '../controllers/payment.controller.js';
import { optionalProtect, protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-order', optionalProtect, createRazorpayOrder);
router.post('/verify', optionalProtect, verifyPayment);
router.post('/manual', optionalProtect, handleManualPayment);
router.get('/:registrationId', optionalProtect, getPaymentByRegistration);

export default router;
