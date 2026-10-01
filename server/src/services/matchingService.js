import { WEIGHTS, PROFILE_STATUS, PAYMENT_STATUS } from '../config/constants.js';
import { Registration } from '../models/Registration.js';
import { Match } from '../models/Match.js';

/**
 * Calculates compatibility score between two registrations
 */
export const calculateCompatibility = (regA, regB) => {
  // 1. Partner preference check (20%)
  // Gender match: Reg A's gender fits Reg B's preference & vice-versa
  let preferenceScore = 0;
  const aWantsB =
    regA.partnerPreference === 'Dandiya Group' ||
    (regA.partnerPreference === 'Female Partner' && regB.gender === 'Female') ||
    (regA.partnerPreference === 'Male Partner' && regB.gender === 'Male');

  const bWantsA =
    regB.partnerPreference === 'Dandiya Group' ||
    (regB.partnerPreference === 'Female Partner' && regA.gender === 'Female') ||
    (regB.partnerPreference === 'Male Partner' && regA.gender === 'Male');

  if (aWantsB && bWantsA) {
    preferenceScore = 100;
  } else if (aWantsB || bWantsA) {
    preferenceScore = 50;
  } else {
    preferenceScore = 10;
  }

  // 2. Age compatibility (25%)
  let ageScore = 0;
  const aMin = regA.preferredAgeRange?.min || 18;
  const aMax = regA.preferredAgeRange?.max || 35;
  const bMin = regB.preferredAgeRange?.min || 18;
  const bMax = regB.preferredAgeRange?.max || 35;

  const aFitsB = regA.age >= bMin && regA.age <= bMax;
  const bFitsA = regB.age >= aMin && regB.age <= aMax;
  const ageDiff = Math.abs(regA.age - regB.age);

  if (aFitsB && bFitsA) {
    ageScore = Math.max(70, 100 - ageDiff * 5);
  } else if (aFitsB || bFitsA) {
    ageScore = Math.max(40, 75 - ageDiff * 6);
  } else {
    ageScore = Math.max(10, 50 - ageDiff * 8);
  }

  // 3. Location compatibility (20%)
  let locationScore = 40;
  const areaA = regA.location?.area;
  const areaB = regB.location?.area;

  if (areaA && areaB && areaA === areaB) {
    locationScore = 100;
  } else {
    // Indore regional proximity clusters
    const northEastIndore = ['Vijay Nagar', 'Nipania / Mahalaxmi Nagar', 'Saket / Tilak Nagar'];
    const centralSouthIndore = ['Palasia / Old Palasia', 'Central Indore / MG Road', 'Bhawarkua / Rajendra Nagar'];
    const southWestIndore = ['Annapurna / Sudama Nagar', 'Rau / AB Road / Bypass'];

    const inSameCluster =
      (northEastIndore.includes(areaA) && northEastIndore.includes(areaB)) ||
      (centralSouthIndore.includes(areaA) && centralSouthIndore.includes(areaB)) ||
      (southWestIndore.includes(areaA) && southWestIndore.includes(areaB));

    if (inSameCluster) {
      locationScore = 80;
    } else {
      locationScore = 50;
    }
  }

  // 4. Dance experience compatibility (15%)
  const experienceRank = {
    'Beginner': 1,
    'Some Experience': 2,
    'Good Dancer': 3,
    'Advanced / Experienced': 4,
  };
  const rankA = experienceRank[regA.danceExperience] || 2;
  const rankB = experienceRank[regB.danceExperience] || 2;
  const rankDiff = Math.abs(rankA - rankB);

  let experienceScore = 100;
  if (rankDiff === 1) experienceScore = 85;
  else if (rankDiff === 2) experienceScore = 60;
  else if (rankDiff >= 3) experienceScore = 40;

  // 5. Dance style overlap (10%)
  const stylesA = regA.danceTypes || [];
  const stylesB = regB.danceTypes || [];
  const sharedStyles = stylesA.filter((s) => stylesB.includes(s) || s === 'Open to All');
  let danceStyleScore = 50;
  if (stylesA.includes('Open to All') || stylesB.includes('Open to All')) {
    danceStyleScore = 95;
  } else if (sharedStyles.length > 0) {
    danceStyleScore = Math.min(100, 70 + sharedStyles.length * 15);
  }

  // 6. Availability overlap (10%)
  const availA = regA.availability || [];
  const availB = regB.availability || [];
  const sharedAvail = availA.filter((a) => availB.includes(a) || a === 'Almost All Days');
  let availabilityScore = 40;
  if (availA.includes('Almost All Days') || availB.includes('Almost All Days')) {
    availabilityScore = 100;
  } else if (sharedAvail.length > 0) {
    availabilityScore = 90;
  }

  // Total weighted score
  const totalScore = Math.round(
    ageScore * WEIGHTS.AGE +
    locationScore * WEIGHTS.LOCATION +
    preferenceScore * WEIGHTS.PREFERENCE +
    experienceScore * WEIGHTS.EXPERIENCE +
    danceStyleScore * WEIGHTS.STYLE +
    availabilityScore * WEIGHTS.AVAILABILITY
  );

  return {
    compatibilityScore: Math.min(100, Math.max(0, totalScore)),
    factors: {
      ageScore: Math.round(ageScore),
      locationScore: Math.round(locationScore),
      preferenceScore: Math.round(preferenceScore),
      experienceScore: Math.round(experienceScore),
      danceStyleScore: Math.round(danceStyleScore),
      availabilityScore: Math.round(availabilityScore),
    },
  };
};

/**
 * Finds compatible candidates for a specific registration
 */
export const findCompatibleMatches = async (targetRegistrationId, limit = 10) => {
  const target = await Registration.findById(targetRegistrationId);
  if (!target) {
    throw new Error('Registration not found');
  }

  // Find other active, verified candidates with verified payments
  const candidates = await Registration.find({
    _id: { $ne: target._id },
    userId: { $ne: target.userId },
    profileStatus: PROFILE_STATUS.VERIFIED,
    paymentStatus: PAYMENT_STATUS.VERIFIED,
  });

  // Check existing matches so we don't duplicate existing pairings
  const existingMatches = await Match.find({
    $or: [{ registrationA: target._id }, { registrationB: target._id }],
  }).select('registrationA registrationB status');

  const existingPairedIds = new Set();
  existingMatches.forEach((m) => {
    existingPairedIds.add(m.registrationA.toString());
    existingPairedIds.add(m.registrationB.toString());
  });

  const scoredCandidates = candidates.map((candidate) => {
    const { compatibilityScore, factors } = calculateCompatibility(target, candidate);
    const isAlreadyMatched = existingPairedIds.has(candidate._id.toString());
    const existingMatch = existingMatches.find(
      (m) =>
        (m.registrationA.toString() === candidate._id.toString() &&
          m.registrationB.toString() === target._id.toString()) ||
        (m.registrationB.toString() === candidate._id.toString() &&
          m.registrationA.toString() === target._id.toString())
    );

    return {
      candidate: {
        _id: candidate._id,
        registrationId: candidate.registrationId,
        fullName: candidate.fullName,
        age: candidate.age,
        gender: candidate.gender,
        location: candidate.location,
        danceExperience: candidate.danceExperience,
        danceTypes: candidate.danceTypes,
        availability: candidate.availability,
        about: candidate.about,
        photos: candidate.photos,
        selectedPlan: candidate.selectedPlan,
        matchStatus: candidate.matchStatus,
        contactSharingConsent: candidate.contactSharingConsent,
        whatsappNumber: candidate.whatsappNumber,
        instagramId: candidate.instagramId,
      },
      compatibilityScore,
      factors,
      isAlreadyMatched,
      existingMatchStatus: existingMatch ? existingMatch.status : null,
      existingMatchId: existingMatch ? existingMatch._id : null,
    };
  });

  // Sort by highest compatibility score
  scoredCandidates.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

  return scoredCandidates.slice(0, limit);
};
