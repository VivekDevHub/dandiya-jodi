import { initiateOrderForPlan, verifyAndFinalizePayment, submitManualPayment } from '../services/paymentService.js';
import { Payment } from '../models/Payment.js';
import { Registration } from '../models/Registration.js';
import { createOrderSchema, verifyPaymentSchema, manualPaymentSchema } from '../validators/payment.validator.js';

export const createRazorpayOrder = async (req, res, next) => {
  try {
    const validatedData = createOrderSchema.parse(req.body);
    const userId = req.user ? req.user._id : (await Registration.findById(validatedData.registrationId))?.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Could not resolve user for this registration',
      });
    }

    const orderData = await initiateOrderForPlan({
      registrationId: validatedData.registrationId,
      planKey: validatedData.plan,
      userId,
    });

    res.status(200).json({
      success: true,
      message: 'Razorpay order created successfully',
      data: orderData,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const validatedData = verifyPaymentSchema.parse(req.body);

    const result = await verifyAndFinalizePayment({
      registrationId: validatedData.registrationId,
      razorpayOrderId: validatedData.razorpayOrderId,
      razorpayPaymentId: validatedData.razorpayPaymentId,
      razorpaySignature: validatedData.razorpaySignature,
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully! Your profile is now entering matching queue.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const handleManualPayment = async (req, res, next) => {
  try {
    const validatedData = manualPaymentSchema.parse(req.body);
    const registration = await Registration.findById(validatedData.registrationId);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    const userId = req.user ? req.user._id : registration.userId;

    const payment = await submitManualPayment({
      registrationId: registration._id,
      userId,
      screenshotUrl: validatedData.screenshotUrl,
    });

    res.status(200).json({
      success: true,
      message: 'Payment screenshot submitted! Our verification team will review and approve within a few hours.',
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

export const getPaymentByRegistration = async (req, res, next) => {
  try {
    const payments = await Payment.find({
      registrationId: req.params.registrationId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    next(error);
  }
};
