import { Match } from '../models/Match.js';
import { Registration } from '../models/Registration.js';
import { MATCH_RECORD_STATUS, MATCH_STATUS } from '../config/constants.js';
import { notifyMatchConfirmed } from '../services/notificationService.js';
import { User } from '../models/User.js';

export const getMyMatches = async (req, res, next) => {
  try {
    const userReg = await Registration.findOne({ userId: req.user._id });
    if (!userReg) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const matches = await Match.find({
      $or: [{ registrationA: userReg._id }, { registrationB: userReg._id }],
      status: { $ne: MATCH_RECORD_STATUS.CANCELLED },
    })
      .populate('registrationA')
      .populate('registrationB')
      .sort({ updatedAt: -1 });

    // Format matches cleanly with privacy-preserving rules
    const formattedMatches = matches.map((match) => {
      const isUserA = match.registrationA._id.toString() === userReg._id.toString();
      const myConsent = isUserA ? match.consentA : match.consentB;
      const partnerConsent = isUserA ? match.consentB : match.consentA;
      const partnerReg = isUserA ? match.registrationB : match.registrationA;

      // Safe partner view
      const safePartner = partnerReg.toSafeMatchProfile();

      // Only reveal coordinated contacts if admin shared contact AND both agreed
      let contactDetails = null;
      if (match.contactShared && match.status === MATCH_RECORD_STATUS.CONTACT_SHARED) {
        contactDetails = {
          fullName: partnerReg.fullName,
          whatsappNumber: partnerReg.whatsappNumber,
          instagramId: partnerReg.instagramId,
          area: partnerReg.location?.area,
        };
      }

      return {
        _id: match._id,
        status: match.status,
        myConsent,
        partnerConsentPending: partnerConsent === null,
        partnerConsented: partnerConsent === true,
        partnerDeclined: partnerConsent === false,
        contactShared: match.contactShared,
        partner: safePartner,
        contactDetails,
        createdAt: match.createdAt,
      };
    });

    res.status(200).json({
      success: true,
      data: formattedMatches,
    });
  } catch (error) {
    next(error);
  }
};

export const respondToMatchConsent = async (req, res, next) => {
  try {
    const { action } = req.body; // 'ACCEPT' or 'DECLINE'
    const matchId = req.params.id;

    if (!['ACCEPT', 'DECLINE'].includes(action)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Must be ACCEPT or DECLINE.',
      });
    }

    const userReg = await Registration.findOne({ userId: req.user._id });
    if (!userReg) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found for this user',
      });
    }

    const match = await Match.findById(matchId)
      .populate('registrationA')
      .populate('registrationB');

    if (!match) {
      return res.status(404).json({
        success: false,
        message: 'Match not found',
      });
    }

    const isUserA = match.registrationA._id.toString() === userReg._id.toString();
    const isUserB = match.registrationB._id.toString() === userReg._id.toString();

    if (!isUserA && !isUserB) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to respond to this match suggestion',
      });
    }

    const now = new Date();
    if (isUserA) {
      match.consentA = action === 'ACCEPT';
      match.consentATimestamp = now;
    } else {
      match.consentB = action === 'ACCEPT';
      match.consentBTimestamp = now;
    }

    // Evaluate dual consent state
    if (match.consentA === false || match.consentB === false) {
      match.status = MATCH_RECORD_STATUS.DECLINED;
    } else if (match.consentA === true && match.consentB === true) {
      match.status = MATCH_RECORD_STATUS.CONSENTED;

      // Update both registrations match statuses
      await Registration.updateMany(
        { _id: { $in: [match.registrationA._id, match.registrationB._id] } },
        { matchStatus: MATCH_STATUS.CONTACT_PENDING }
      );

      // Trigger notifications to both users
      const userA = await User.findById(match.registrationA.userId);
      const userB = await User.findById(match.registrationB.userId);
      if (userA) await notifyMatchConfirmed(match.registrationA, userA);
      if (userB) await notifyMatchConfirmed(match.registrationB, userB);
    } else {
      match.status = MATCH_RECORD_STATUS.PENDING_CONSENT;
    }

    await match.save();

    res.status(200).json({
      success: true,
      message:
        action === 'ACCEPT'
          ? "Interest recorded! If your suggested partner also agrees, our team will coordinate the introduction."
          : 'Thank you for your feedback. We will continue looking for other compatible partners.',
      data: {
        matchId: match._id,
        status: match.status,
        myConsent: isUserA ? match.consentA : match.consentB,
      },
    });
  } catch (error) {
    next(error);
  }
};
