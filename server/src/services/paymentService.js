import { PLANS, PAYMENT_STATUS, PROFILE_STATUS, MATCH_STATUS } from '../config/constants.js';
import { createOrder, verifyPaymentSignature } from '../config/razorpay.js';
import { Payment } from '../models/Payment.js';
import { Registration } from '../models/Registration.js';
import { notifyPaymentVerified } from './notificationService.js';
import { User } from '../models/User.js';

export const initiateOrderForPlan = async ({ registrationId, planKey, userId }) => {
  const planConfig = PLANS[planKey];
  if (!planConfig) {
    throw new Error('Invalid plan selected');
  }

  const registration = await Registration.findById(registrationId);
  if (!registration) {
    throw new Error('Registration not found');
  }

  // Strict backend amount mapping (never trust frontend amount)
  const amountInPaise = planConfig.amount;

  const order = await createOrder({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `rcpt_${registration.registrationId}_${Date.now()}`,
    notes: {
      registrationId: registration._id.toString(),
      registrationCode: registration.registrationId,
      plan: planKey,
      userId: userId.toString(),
    },
  });

  // Create pending payment record
  const payment = await Payment.create({
    registrationId: registration._id,
    userId,
    plan: planKey,
    amount: amountInPaise,
    currency: 'INR',
    provider: 'RAZORPAY',
    razorpayOrderId: order.id,
    status: 'PENDING',
  });

  return {
    orderId: order.id,
    amount: amountInPaise,
    currency: 'INR',
    plan: planKey,
    displayAmount: planConfig.displayAmount,
    keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_loveangle2026',
    paymentRecordId: payment._id,
  };
};

export const verifyAndFinalizePayment = async ({
  registrationId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}) => {
  const isValid = verifyPaymentSignature({
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
  });

  if (!isValid) {
    throw new Error('Invalid payment signature. Verification failed.');
  }

  const payment = await Payment.findOne({
    registrationId,
    razorpayOrderId,
  });

  if (!payment) {
    throw new Error('Payment record not found for this order');
  }

  payment.razorpayPaymentId = razorpayPaymentId;
  payment.razorpaySignature = razorpaySignature;
  payment.status = 'VERIFIED';
  payment.verifiedAt = new Date();
  await payment.save();

  // Update registration
  const registration = await Registration.findById(registrationId);
  if (registration) {
    registration.paymentStatus = PAYMENT_STATUS.VERIFIED;
    if (registration.profileStatus === PROFILE_STATUS.VERIFIED) {
      registration.matchStatus = MATCH_STATUS.MATCHING;
    }
    await registration.save();

    // Trigger notification
    const user = await User.findById(registration.userId);
    if (user) {
      await notifyPaymentVerified(registration, user);
    }
  }

  return {
    success: true,
    paymentId: payment._id,
    razorpayPaymentId,
    status: 'VERIFIED',
  };
};

export const submitManualPayment = async ({ registrationId, userId, screenshotUrl }) => {
  const registration = await Registration.findById(registrationId);
  if (!registration) {
    throw new Error('Registration not found');
  }

  const planConfig = PLANS[registration.selectedPlan] || PLANS.SINGLE_MATCH;

  const payment = await Payment.create({
    registrationId: registration._id,
    userId,
    plan: registration.selectedPlan,
    amount: planConfig.amount,
    currency: 'INR',
    provider: 'MANUAL',
    screenshotUrl,
    status: 'PENDING',
  });

  registration.paymentStatus = PAYMENT_STATUS.PAYMENT_VERIFICATION_PENDING;
  await registration.save();

  return payment;
};
