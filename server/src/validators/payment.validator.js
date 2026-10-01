import { z } from 'zod';

export const createOrderSchema = z.object({
  registrationId: z.string().min(1, 'Registration ID is required'),
  plan: z.enum(['SINGLE_MATCH', 'DOUBLE_MATCH'], {
    errorMap: () => ({ message: 'Plan must be either SINGLE_MATCH or DOUBLE_MATCH' }),
  }),
});

export const verifyPaymentSchema = z.object({
  registrationId: z.string().min(1, 'Registration ID is required'),
  razorpayOrderId: z.string().min(1, 'Razorpay order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Razorpay payment ID is required'),
  razorpaySignature: z.string().min(1, 'Razorpay signature is required'),
});

export const manualPaymentSchema = z.object({
  registrationId: z.string().min(1, 'Registration ID is required'),
  screenshotUrl: z.string().min(1, 'Payment screenshot URL is required'),
});
