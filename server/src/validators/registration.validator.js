import { z } from 'zod';
import {
  INDORE_AREAS,
  DANCE_EXPERIENCE_LEVELS,
} from '../config/constants.js';

// Indian phone regex: 10 digits, optionally prefixed with +91 or 0
const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

export const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  age: z
    .number({ invalid_type_error: 'Age must be a number' })
    .min(18, 'You must be 18 or older to register.')
    .max(80, 'Age must be under 80'),
  gender: z.enum(['Male', 'Female', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid gender' }),
  }),
  whatsappNumber: z
    .string()
    .regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian WhatsApp number'),
  instagramId: z
    .string()
    .min(2, 'Instagram ID is required')
    .refine((val) => val.startsWith('@') || val.length >= 3, {
      message: 'Please provide an active Instagram handle (e.g. @yourusername)',
    }),
  location: z.object({
    area: z.enum(INDORE_AREAS, {
      errorMap: () => ({ message: 'Please select an Indore area' }),
    }),
    customArea: z.string().optional().default(''),
  }),
  partnerPreference: z.enum(['Female Partner', 'Male Partner', 'Dandiya Group'], {
    errorMap: () => ({ message: 'Please select your partner preference' }),
  }),
  preferredAgeRange: z.object({
    min: z.number().min(18).default(18),
    max: z.number().max(80).default(35),
  }),
  danceExperience: z.enum(DANCE_EXPERIENCE_LEVELS, {
    errorMap: () => ({ message: 'Please select your dance experience' }),
  }),
  danceTypes: z.array(z.string()).min(1, 'Please select at least one dance type'),
  availability: z.array(z.string()).min(1, 'Please select at least one availability window'),
  preferredQualities: z.array(z.string()).optional().default([]),
  about: z.string().max(500, 'About cannot exceed 500 characters').optional().default(''),
  photos: z
    .array(
      z.object({
        url: z.string().url(),
        publicId: z.string(),
        isApproved: z.boolean().optional().default(true),
      })
    )
    .min(1, 'Please upload at least 1 photo for profile verification')
    .max(5, 'Maximum 5 photos allowed'),
  selectedPlan: z.enum(['SINGLE_MATCH', 'DOUBLE_MATCH']),
  consentAccepted: z.literal(true, {
    errorMap: () => ({
      message: 'You must confirm that your information is accurate and agree to be contacted.',
    }),
  }),
  safetyAgreement: z.literal(true, {
    errorMap: () => ({
      message: 'You must agree to the Dandiya community safety guidelines.',
    }),
  }),
});
