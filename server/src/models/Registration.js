import mongoose from 'mongoose';
import {
  PROFILE_STATUS,
  PAYMENT_STATUS,
  MATCH_STATUS,
  INDORE_AREAS,
  DANCE_EXPERIENCE_LEVELS,
} from '../config/constants.js';

const photoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: true,
  },
});

const registrationSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'You must be 18 or older to register.'],
      max: [80, 'Age must be under 80'],
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
    },
    whatsappNumber: {
      type: String,
      required: [true, 'WhatsApp number is required'],
      trim: true,
    },
    instagramId: {
      type: String,
      required: [true, 'Instagram ID is required'],
      trim: true,
    },
    location: {
      area: {
        type: String,
        required: [true, 'Indore area is required'],
        enum: INDORE_AREAS,
      },
      customArea: {
        type: String,
        trim: true,
        default: '',
      },
    },
    partnerPreference: {
      type: String,
      required: [true, 'Partner preference is required'],
      enum: ['Female Partner', 'Male Partner', 'Dandiya Group'],
    },
    preferredAgeRange: {
      min: {
        type: Number,
        default: 18,
      },
      max: {
        type: Number,
        default: 35,
      },
    },
    danceExperience: {
      type: String,
      required: [true, 'Dance experience is required'],
      enum: DANCE_EXPERIENCE_LEVELS,
    },
    danceTypes: [
      {
        type: String,
      },
    ],
    availability: [
      {
        type: String,
      },
    ],
    preferredQualities: [
      {
        type: String,
      },
    ],
    about: {
      type: String,
      maxlength: [500, 'About cannot exceed 500 characters'],
      trim: true,
      default: '',
    },
    photos: [photoSchema],
    selectedPlan: {
      type: String,
      required: true,
      enum: ['SINGLE_MATCH', 'DOUBLE_MATCH'],
      default: 'SINGLE_MATCH',
    },
    consentAccepted: {
      type: Boolean,
      required: true,
      default: false,
    },
    safetyAgreement: {
      type: Boolean,
      required: true,
      default: false,
    },
    profileStatus: {
      type: String,
      enum: Object.values(PROFILE_STATUS),
      default: PROFILE_STATUS.PROFILE_REVIEW,
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PAYMENT_PENDING,
      index: true,
    },
    matchStatus: {
      type: String,
      enum: Object.values(MATCH_STATUS),
      default: MATCH_STATUS.NOT_STARTED,
      index: true,
    },
    contactSharingConsent: {
      type: Boolean,
      default: false,
    },
    adminNotes: {
      type: String,
      default: '',
    },
    rejectionReason: {
      type: String,
      default: null,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Helper method to sanitize sensitive fields when sharing data with ordinary users / matches
registrationSchema.methods.toSafeMatchProfile = function () {
  return {
    _id: this._id,
    registrationId: this.registrationId,
    firstName: this.fullName.split(' ')[0], // only first name
    age: this.age,
    gender: this.gender,
    location: this.location.area === 'Other' ? this.location.customArea : this.location.area,
    danceExperience: this.danceExperience,
    danceTypes: this.danceTypes,
    availability: this.availability,
    preferredQualities: this.preferredQualities,
    about: this.about,
    photos: this.photos.filter((p) => p.isApproved).map((p) => ({ url: p.url })),
    selectedPlan: this.selectedPlan,
  };
};

export const Registration = mongoose.model('Registration', registrationSchema);
