import express from 'express';
import {
  createRegistration,
  getMyRegistration,
  getRegistrationById,
  updateRegistration,
  updateContactSharingConsent,
} from '../controllers/registration.controller.js';
import { protect, optionalProtect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', optionalProtect, createRegistration);
router.get('/me', protect, getMyRegistration);
router.get('/:id', optionalProtect, getRegistrationById);
router.put('/:id', protect, updateRegistration);
router.patch('/consent', protect, updateContactSharingConsent);

export default router;
