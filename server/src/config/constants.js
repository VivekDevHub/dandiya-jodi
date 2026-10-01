export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  VERIFICATION_TEAM: 'VERIFICATION_TEAM',
  MATCHING_TEAM: 'MATCHING_TEAM',
  USER: 'USER',
};

export const PLANS = {
  SINGLE_MATCH: {
    key: 'SINGLE_MATCH',
    name: 'Single Match',
    amount: 19900, // in paise: ₹199
    displayAmount: 199,
    matchesIncluded: 1,
    features: [
      '1 Dandiya partner match',
      'Profile verification',
      'Compatibility matching',
      'Team coordination',
    ],
  },
  DOUBLE_MATCH: {
    key: 'DOUBLE_MATCH',
    name: 'Double Match',
    amount: 29900, // in paise: ₹299
    displayAmount: 299,
    matchesIncluded: 2,
    features: [
      'Up to 2 Dandiya partner matches',
      'Profile verification',
      'Compatibility matching',
      'Team coordination',
      'Priority matching queue',
    ],
  },
};

export const PROFILE_STATUS = {
  DRAFT: 'DRAFT',
  PROFILE_REVIEW: 'PROFILE_REVIEW',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
  BANNED: 'BANNED',
};

export const PAYMENT_STATUS = {
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  PAYMENT_VERIFICATION_PENDING: 'PAYMENT_VERIFICATION_PENDING',
  VERIFIED: 'VERIFIED',
  REJECTED: 'REJECTED',
};

export const MATCH_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  MATCHING: 'MATCHING',
  MATCH_FOUND: 'MATCH_FOUND',
  CONTACT_PENDING: 'CONTACT_PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const MATCH_RECORD_STATUS = {
  SUGGESTED: 'SUGGESTED',
  PENDING_CONSENT: 'PENDING_CONSENT',
  CONSENTED: 'CONSENTED',
  DECLINED: 'DECLINED',
  CONTACT_SHARED: 'CONTACT_SHARED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
};

export const INDORE_AREAS = [
  'Vijay Nagar',
  'Palasia / Old Palasia',
  'Saket / Tilak Nagar',
  'Bhawarkua / Rajendra Nagar',
  'Nipania / Mahalaxmi Nagar',
  'Rau / AB Road / Bypass',
  'Annapurna / Sudama Nagar',
  'Central Indore / MG Road',
  'Other',
];

export const DANCE_EXPERIENCE_LEVELS = [
  'Beginner',
  'Some Experience',
  'Good Dancer',
  'Advanced / Experienced',
];

export const DANCE_TYPES = [
  'Traditional Garba',
  'Dandiya Raas',
  'Bollywood Garba',
  'Couple/Duo Performance',
  'Open to All',
];

export const NAVRATRI_AVAILABILITY = [
  '10–12 October',
  '13–15 October',
  'Almost All Days',
];

export const PARTNER_QUALITIES = [
  'Good Dancer',
  'Friendly Personality',
  'Similar Age',
  'Similar Dance Level',
  'Good Communication',
  'No Specific Preference',
];

export const WEIGHTS = {
  AGE: 0.25,
  LOCATION: 0.20,
  PREFERENCE: 0.20,
  EXPERIENCE: 0.15,
  STYLE: 0.10,
  AVAILABILITY: 0.10,
};
