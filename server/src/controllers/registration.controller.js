import crypto from 'crypto';
import { Registration } from '../models/Registration.js';
import { User } from '../models/User.js';
import { registrationSchema } from '../validators/registration.validator.js';
import { notifyRegistrationReceived } from '../services/notificationService.js';
import { ROLES, PROFILE_STATUS, PAYMENT_STATUS, MATCH_STATUS } from '../config/constants.js';

/**
 * Generates an Indore Navratri 2026 formatted ID, e.g. DJ-2026-10492
 */
const generateRegistrationId = async () => {
  const count = await Registration.countDocuments();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `DJ-2026-${String(count + 1).padStart(3, '0')}${randomSuffix.toString().slice(-2)}`;
};

export const createRegistration = async (req, res, next) => {
  try {
    const validatedData = registrationSchema.parse(req.body);

    let userId = req.user?._id;
    let user = req.user;

    // If not authenticated yet (direct wizard submission), look up or create user based on phone/whatsapp or email if passed
    if (!userId) {
      const email = req.body.email || `${validatedData.whatsappNumber}@guest.loveangle.in`;
      user = await User.findOne({
        $or: [{ email }, { phone: validatedData.whatsappNumber }],
      });

      if (!user) {
        // Auto-generate safe temporary password
        const tempPassword = crypto.randomBytes(8).toString('hex');
        user = await User.create({
          name: validatedData.fullName,
          email,
          phone: validatedData.whatsappNumber,
          role: ROLES.USER,
          passwordHash: tempPassword,
        });
      }
      userId = user._id;
    }

    // Check if user already has an active registration
    const existingReg = await Registration.findOne({
      userId,
      profileStatus: { $ne: PROFILE_STATUS.BANNED },
    });

    if (existingReg) {
      // Update existing draft or pending registration
      Object.assign(existingReg, validatedData);
      await existingReg.save();
      return res.status(200).json({
        success: true,
        message: 'Registration details updated successfully',
        data: existingReg,
      });
    }

    const registrationId = await generateRegistrationId();

    const newRegistration = await Registration.create({
      registrationId,
      userId,
      ...validatedData,
      profileStatus: PROFILE_STATUS.PROFILE_REVIEW,
      paymentStatus: PAYMENT_STATUS.PAYMENT_PENDING,
      matchStatus: MATCH_STATUS.NOT_STARTED,
    });

    // Send notifications
    await notifyRegistrationReceived(newRegistration, user);

    // If guest registered, issue a token so they can see their dashboard immediately
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      message: 'Dandiya Jodi registration created successfully! 🎉',
      token,
      data: newRegistration,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({ userId: req.user._id }).sort({ createdAt: -1 });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'No active registration found for this account.',
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationById = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Only owner or admin can view complete details
    const isOwner = req.user && registration.userId.toString() === req.user._id.toString();
    const isAdmin = req.user && [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.VERIFICATION_TEAM, ROLES.MATCHING_TEAM].includes(req.user.role);

    if (!isOwner && !isAdmin) {
      // Return only safe public match view
      return res.status(200).json({
        success: true,
        data: registration.toSafeMatchProfile(),
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRegistration = async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found or unauthorized',
      });
    }

    // Editable fields for user
    const allowedUpdates = [
      'danceExperience',
      'danceTypes',
      'availability',
      'preferredQualities',
      'about',
      'photos',
      'location',
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        registration[field] = req.body[field];
      }
    });

    await registration.save();

    res.status(200).json({
      success: true,
      message: 'Registration updated successfully',
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactSharingConsent = async (req, res, next) => {
  try {
    const { consent } = req.body;
    if (typeof consent !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'Consent must be a boolean value',
      });
    }

    const registration = await Registration.findOne({
      userId: req.user._id,
    });

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'No registration found for this user',
      });
    }

    registration.contactSharingConsent = consent;
    await registration.save();

    res.status(200).json({
      success: true,
      message: consent
        ? 'Contact sharing consent granted for confirmed mutual matches.'
        : 'Contact sharing consent revoked. Your contact details remain private.',
      data: {
        contactSharingConsent: registration.contactSharingConsent,
      },
    });
  } catch (error) {
    next(error);
  }
};
