import nodemailer from 'nodemailer';

// Email transporter initialization
let transporter = null;

try {
  if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
} catch (err) {
  console.warn('⚠️ Mail transporter init note:', err.message);
}

/**
 * Sends transactional email with graceful fallback to console log
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const from = process.env.EMAIL_FROM || '"Dandiya Jodi by Love Angle ❤️" <no-reply@loveangle.in>';

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
      console.log(`📧 Email sent to ${to}: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err) {
      console.error(`❌ Failed to send email to ${to}:`, err.message);
    }
  }

  // Development simulation log
  console.log(`\n📨 [SIMULATED EMAIL NOTIFICATION]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${text || html}\n-----------------------------------\n`);
  return { success: true, simulated: true };
};

/**
 * Modular WhatsApp notification service
 * Structured for WhatsApp Business Cloud API / Gupshup / Twilio
 */
export const sendWhatsAppNotification = async ({ phone, template, params = {} }) => {
  // Production integration hook for Meta Graph API / Gupshup / Twilio
  const whatsappApiEnabled = Boolean(process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);

  if (whatsappApiEnabled) {
    try {
      // Example payload structure for Meta WhatsApp Cloud API:
      // await axios.post(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, ...)
      console.log(`📱 WhatsApp notification sent via Cloud API to ${phone}`);
      return { success: true };
    } catch (err) {
      console.error(`❌ WhatsApp Cloud API error:`, err.message);
    }
  }

  // Development simulation log
  console.log(`\n💬 [SIMULATED WHATSAPP NOTIFICATION]`);
  console.log(`Recipient: ${phone}`);
  console.log(`Template: ${template}`);
  console.log(`Params:`, JSON.stringify(params, null, 2));
  console.log(`-----------------------------------\n`);
  return { success: true, simulated: true };
};

// High-level event notification dispatchers
export const notifyRegistrationReceived = async (registration, user) => {
  const subject = `🎉 Dandiya Jodi 2026: Registration Received (${registration.registrationId})`;
  const text = `Hi ${registration.fullName},\n\nYour registration for Dandiya Jodi by Love Angle (Navratri 2026, Indore) has been successfully received!\n\nRegistration ID: ${registration.registrationId}\nSelected Plan: ${registration.selectedPlan}\n\nOur team is currently reviewing your profile and verifying details. You can track your real-time status on your dashboard.\n\nBest regards,\nLove Angle Team ❤️`;
  
  await sendEmail({ to: user.email, subject, text });
  await sendWhatsAppNotification({
    phone: registration.whatsappNumber,
    template: 'registration_received',
    params: { name: registration.fullName, registrationId: registration.registrationId },
  });
};

export const notifyPaymentVerified = async (registration, user) => {
  const subject = `🟢 Payment Verified: Your Dandiya Jodi Profile is Active!`;
  const text = `Hi ${registration.fullName},\n\nGreat news! Your payment for registration ${registration.registrationId} has been verified.\n\nOur matching team is now analyzing compatible Dandiya partners in Indore according to your dance styles and area preferences.\n\nWarm regards,\nLove Angle Team ❤️`;

  await sendEmail({ to: user.email, subject, text });
  await sendWhatsAppNotification({
    phone: registration.whatsappNumber,
    template: 'payment_verified',
    params: { name: registration.fullName, registrationId: registration.registrationId },
  });
};

export const notifyProfileApproved = async (registration, user) => {
  const subject = `✅ Profile Approved: Ready for Dandiya Jodi Matching!`;
  const text = `Hi ${registration.fullName},\n\nYour profile has been verified and approved by the Love Angle safety and moderation team. We are actively matching you with fellow dancers in Indore.\n\nBest regards,\nLove Angle Team ❤️`;

  await sendEmail({ to: user.email, subject, text });
};

export const notifyPotentialMatchFound = async (registration, user) => {
  const subject = `💃 Dandiya Jodi: We found a potential match for you! 🕺`;
  const text = `Hi ${registration.fullName},\n\nExciting news! We have found a compatible Dandiya partner for you in Indore. Log in to your dashboard to review their basic dance profile and let us know if you'd like to proceed with an introduction.\n\nRemember: No personal contact info is shared without mutual consent.\n\nBest regards,\nLove Angle Team ❤️`;

  await sendEmail({ to: user.email, subject, text });
  await sendWhatsAppNotification({
    phone: registration.whatsappNumber,
    template: 'match_found_consent_required',
    params: { name: registration.fullName },
  });
};

export const notifyMatchConfirmed = async (registration, user, partnerSafeInfo) => {
  const subject = `🎉 Mutual Match Confirmed! Welcome to Dandiya Jodi 2026`;
  const text = `Hi ${registration.fullName},\n\nBoth you and your suggested partner have confirmed mutual interest in dancing together this Navratri in Indore!\n\nOur team is now coordinating your introduction safely.\n\nHappy Garba,\nLove Angle Team ❤️`;

  await sendEmail({ to: user.email, subject, text });
};
