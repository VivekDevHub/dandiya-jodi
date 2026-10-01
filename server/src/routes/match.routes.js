import express from 'express';
import { getMyMatches, respondToMatchConsent } from '../controllers/match.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getMyMatches);
router.post('/:id/consent', protect, respondToMatchConsent);

export default router;
