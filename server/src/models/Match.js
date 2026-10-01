import mongoose from 'mongoose';
import { MATCH_RECORD_STATUS } from '../config/constants.js';

const matchSchema = new mongoose.Schema(
  {
    registrationA: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration',
      required: true,
      index: true,
    },
    registrationB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration',
      required: true,
      index: true,
    },
    compatibilityScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    factors: {
      ageScore: { type: Number, default: 0 },
      locationScore: { type: Number, default: 0 },
      preferenceScore: { type: Number, default: 0 },
      experienceScore: { type: Number, default: 0 },
      danceStyleScore: { type: Number, default: 0 },
      availabilityScore: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: Object.values(MATCH_RECORD_STATUS),
      default: MATCH_RECORD_STATUS.SUGGESTED,
      index: true,
    },
    consentA: {
      type: Boolean,
      default: null, // null = pending response, true = accepted, false = declined
    },
    consentB: {
      type: Boolean,
      default: null,
    },
    consentATimestamp: {
      type: Date,
      default: null,
    },
    consentBTimestamp: {
      type: Date,
      default: null,
    },
    contactShared: {
      type: Boolean,
      default: false,
    },
    contactSharedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure uniqueness of pairs
matchSchema.index({ registrationA: 1, registrationB: 1 }, { unique: true });

export const Match = mongoose.model('Match', matchSchema);
