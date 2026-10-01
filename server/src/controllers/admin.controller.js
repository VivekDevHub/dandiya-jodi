import { Registration } from '../models/Registration.js';
import { User } from '../models/User.js';
import { Payment } from '../models/Payment.js';
import { Match } from '../models/Match.js';
import { AuditLog } from '../models/AuditLog.js';
import { logAudit } from '../middleware/audit.middleware.js';
import {
  PROFILE_STATUS,
  PAYMENT_STATUS,
  MATCH_STATUS,
  MATCH_RECORD_STATUS,
  ROLES,
} from '../config/constants.js';
import { findCompatibleMatches, calculateCompatibility } from '../services/matchingService.js';
import {
  notifyProfileApproved,
  notifyPaymentVerified,
  notifyPotentialMatchFound,
} from '../services/notificationService.js';

/**
 * Admin Dashboard Metrics & Analytics Overview
 */
export const getDashboardOverview = async (req, res, next) => {
  try {
    const [
      totalRegistrations,
      pendingVerification,
      verifiedProfiles,
      rejectedProfiles,
      paymentPending,
      paymentsVerified,
      femaleCount,
      maleCount,
      groupCount,
      totalMatches,
      confirmedMatches,
      recentRegistrations,
    ] = await Promise.all([
      Registration.countDocuments(),
      Registration.countDocuments({ profileStatus: PROFILE_STATUS.PROFILE_REVIEW }),
      Registration.countDocuments({ profileStatus: PROFILE_STATUS.VERIFIED }),
      Registration.countDocuments({ profileStatus: PROFILE_STATUS.REJECTED }),
      Registration.countDocuments({ paymentStatus: PAYMENT_STATUS.PAYMENT_PENDING }),
      Registration.countDocuments({ paymentStatus: PAYMENT_STATUS.VERIFIED }),
      Registration.countDocuments({ gender: 'Female' }),
      Registration.countDocuments({ gender: 'Male' }),
      Registration.countDocuments({ partnerPreference: 'Dandiya Group' }),
      Match.countDocuments(),
      Match.countDocuments({ status: MATCH_RECORD_STATUS.CONSENTED }),
      Registration.find().sort({ createdAt: -1 }).limit(5).select('registrationId fullName gender location profileStatus paymentStatus createdAt'),
    ]);

    // Area distribution
    const areaDistribution = await Registration.aggregate([
      { $group: { _id: '$location.area', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Plan distribution
    const planDistribution = await Registration.aggregate([
      { $group: { _id: '$selectedPlan', count: { $sum: 1 } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalRegistrations,
          pendingVerification,
          verifiedProfiles,
          rejectedProfiles,
          paymentPending,
          paymentsVerified,
          femaleCount,
          maleCount,
          groupCount,
          totalMatches,
          confirmedMatches,
        },
        charts: {
          areaDistribution,
          planDistribution,
        },
        recentRegistrations,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all registrations with server-side pagination, search, and filtering
 */
export const getAllRegistrations = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      gender,
      area,
      profileStatus,
      paymentStatus,
      matchStatus,
      selectedPlan,
      danceExperience,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { registrationId: { $regex: search, $options: 'i' } },
        { instagramId: { $regex: search, $options: 'i' } },
        { whatsappNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (gender) filter.gender = gender;
    if (area) filter['location.area'] = area;
    if (profileStatus) filter.profileStatus = profileStatus;
    if (paymentStatus) filter.paymentStatus = paymentStatus;
    if (matchStatus) filter.matchStatus = matchStatus;
    if (selectedPlan) filter.selectedPlan = selectedPlan;
    if (danceExperience) filter.danceExperience = danceExperience;

    const total = await Registration.countDocuments(filter);
    const registrations = await Registration.find(filter)
      .populate('userId', 'name email isBanned')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        total,
        page,
        pages: Math.ceil(total / limit),
        registrations,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single registration details by ID
 */
export const getRegistrationDetails = async (req, res, next) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('userId', 'name email phone role isBanned createdAt')
      .populate('verifiedBy', 'name email');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    // Get linked payments and matches
    const [payments, matches, auditTrail] = await Promise.all([
      Payment.find({ registrationId: registration._id }).sort({ createdAt: -1 }),
      Match.find({
        $or: [{ registrationA: registration._id }, { registrationB: registration._id }],
      }).populate('registrationA registrationB'),
      AuditLog.find({ targetId: registration._id.toString() }).sort({ createdAt: -1 }).limit(10),
    ]);

    res.status(200).json({
      success: true,
      data: {
        registration,
        payments,
        matches,
        auditTrail,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update registration profile status (Approve, Reject, Ban)
 */
export const updateRegistrationStatus = async (req, res, next) => {
  try {
    const { profileStatus, adminNotes, rejectionReason } = req.body;
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found',
      });
    }

    const prevStatus = registration.profileStatus;

    if (profileStatus) {
      registration.profileStatus = profileStatus;
      if (profileStatus === PROFILE_STATUS.VERIFIED) {
        registration.verifiedBy = req.user._id;
        registration.verifiedAt = new Date();
        if (registration.paymentStatus === PAYMENT_STATUS.VERIFIED) {
          registration.matchStatus = MATCH_STATUS.MATCHING;
        }
      }
    }

    if (adminNotes !== undefined) registration.adminNotes = adminNotes;
    if (rejectionReason !== undefined) registration.rejectionReason = rejectionReason;

    await registration.save();

    // Log audit
    await logAudit({
      req,
      action: `Profile status updated from ${prevStatus} to ${profileStatus}`,
      targetType: 'Registration',
      targetId: registration._id,
      previousValue: { profileStatus: prevStatus },
      newValue: { profileStatus },
      details: adminNotes || rejectionReason || '',
    });

    // Notify user if approved
    if (profileStatus === PROFILE_STATUS.VERIFIED && prevStatus !== PROFILE_STATUS.VERIFIED) {
      const user = await User.findById(registration.userId);
      if (user) await notifyProfileApproved(registration, user);
    }

    res.status(200).json({
      success: true,
      message: `Registration status updated to ${profileStatus}`,
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Find compatible candidate matches using the matching algorithm
 */
export const findMatchesForRegistration = async (req, res, next) => {
  try {
    const scoredMatches = await findCompatibleMatches(req.params.id, 15);
    res.status(200).json({
      success: true,
      data: scoredMatches,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new match suggestion between two participants
 */
export const createMatchSuggestion = async (req, res, next) => {
  try {
    const { registrationAId, registrationBId, adminNotes } = req.body;

    const [regA, regB] = await Promise.all([
      Registration.findById(registrationAId),
      Registration.findById(registrationBId),
    ]);

    if (!regA || !regB) {
      return res.status(404).json({
        success: false,
        message: 'One or both registrations not found',
      });
    }

    // Check if match already exists
    const existing = await Match.findOne({
      $or: [
        { registrationA: regA._id, registrationB: regB._id },
        { registrationA: regB._id, registrationB: regA._id },
      ],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A match pairing already exists between these two participants.',
        data: existing,
      });
    }

    const { compatibilityScore, factors } = calculateCompatibility(regA, regB);

    const match = await Match.create({
      registrationA: regA._id,
      registrationB: regB._id,
      compatibilityScore,
      factors,
      status: MATCH_RECORD_STATUS.PENDING_CONSENT,
      createdBy: req.user._id,
      adminNotes: adminNotes || '',
    });

    // Update statuses on both registrations
    regA.matchStatus = MATCH_STATUS.MATCH_FOUND;
    regB.matchStatus = MATCH_STATUS.MATCH_FOUND;
    await Promise.all([regA.save(), regB.save()]);

    // Send notifications to both participants
    const [userA, userB] = await Promise.all([
      User.findById(regA.userId),
      User.findById(regB.userId),
    ]);

    if (userA) await notifyPotentialMatchFound(regA, userA);
    if (userB) await notifyPotentialMatchFound(regB, userB);

    await logAudit({
      req,
      action: `Created match suggestion between ${regA.registrationId} & ${regB.registrationId}`,
      targetType: 'Match',
      targetId: match._id,
      newValue: { compatibilityScore, status: match.status },
    });

    res.status(201).json({
      success: true,
      message: 'Match suggestion created! Consent requests sent to both participants.',
      data: match,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all matches
 */
export const getAllMatches = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const total = await Match.countDocuments(filter);
    const matches = await Match.find(filter)
      .populate('registrationA', 'registrationId fullName gender location whatsappNumber instagramId photos')
      .populate('registrationB', 'registrationId fullName gender location whatsappNumber instagramId photos')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        total,
        page,
        pages: Math.ceil(total / limit),
        matches,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Admin updates match state (e.g. share contact safely, cancel, or complete)
 */
export const updateMatchStatus = async (req, res, next) => {
  try {
    const { status, contactShared, adminNotes } = req.body;
    const match = await Match.findById(req.params.id)
      .populate('registrationA')
      .populate('registrationB');

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    if (status) match.status = status;
    if (contactShared !== undefined) {
      match.contactShared = contactShared;
      if (contactShared) {
        match.contactSharedAt = new Date();
        match.status = MATCH_RECORD_STATUS.CONTACT_SHARED;
      }
    }
    if (adminNotes !== undefined) match.adminNotes = adminNotes;

    await match.save();

    await logAudit({
      req,
      action: `Updated match status to ${match.status}, contactShared=${match.contactShared}`,
      targetType: 'Match',
      targetId: match._id,
      newValue: { status: match.status, contactShared: match.contactShared },
    });

    res.status(200).json({
      success: true,
      message: 'Match status updated successfully',
      data: match,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all payments
 */
export const getAllPayments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const { status, provider } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (provider) filter.provider = provider;

    const total = await Payment.countDocuments(filter);
    const payments = await Payment.find(filter)
      .populate('registrationId', 'registrationId fullName gender whatsappNumber selectedPlan')
      .populate('userId', 'name email')
      .populate('verifiedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: {
        total,
        page,
        pages: Math.ceil(total / limit),
        payments,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify or reject manual payment screenshot
 */
export const verifyPaymentStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body; // 'VERIFIED' or 'REJECTED'
    if (!['VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be VERIFIED or REJECTED.',
      });
    }

    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    payment.status = status;
    payment.verifiedBy = req.user._id;
    payment.verifiedAt = new Date();
    if (adminNotes) payment.adminNotes = adminNotes;
    await payment.save();

    // Update registration payment status
    const registration = await Registration.findById(payment.registrationId);
    if (registration) {
      registration.paymentStatus = status === 'VERIFIED' ? PAYMENT_STATUS.VERIFIED : PAYMENT_STATUS.REJECTED;
      if (status === 'VERIFIED' && registration.profileStatus === PROFILE_STATUS.VERIFIED) {
        registration.matchStatus = MATCH_STATUS.MATCHING;
      }
      await registration.save();

      if (status === 'VERIFIED') {
        const user = await User.findById(registration.userId);
        if (user) await notifyPaymentVerified(registration, user);
      }
    }

    await logAudit({
      req,
      action: `Payment ${payment._id} marked as ${status}`,
      targetType: 'Payment',
      targetId: payment._id,
      newValue: { status },
      details: adminNotes || '',
    });

    res.status(200).json({
      success: true,
      message: `Payment status updated to ${status}`,
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * User management: list and ban/unban
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { isBanned, banReason, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (isBanned !== undefined) {
      user.isBanned = isBanned;
      user.banReason = isBanned ? banReason || 'Safety policy violation' : null;
    }
    if (role && Object.values(ROLES).includes(role)) {
      user.role = role;
    }

    await user.save();

    await logAudit({
      req,
      action: `Updated user ${user.email}: isBanned=${user.isBanned}, role=${user.role}`,
      targetType: 'User',
      targetId: user._id,
      newValue: { isBanned: user.isBanned, role: user.role },
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get audit logs
 */
export const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await AuditLog.find().populate('admin', 'name email').sort({ createdAt: -1 }).limit(100);
    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};
