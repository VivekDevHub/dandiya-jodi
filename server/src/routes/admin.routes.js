import express from 'express';
import {
  getDashboardOverview,
  getAllRegistrations,
  getRegistrationDetails,
  updateRegistrationStatus,
  findMatchesForRegistration,
  createMatchSuggestion,
  getAllMatches,
  updateMatchStatus,
  getAllPayments,
  verifyPaymentStatus,
  getAllUsers,
  updateUserStatus,
  getAuditLogs,
} from '../controllers/admin.controller.js';
import { getAllReports, updateReportStatus } from '../controllers/report.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { ROLES } from '../config/constants.js';

const router = express.Router();

const adminRoles = [
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.VERIFICATION_TEAM,
  ROLES.MATCHING_TEAM,
];

// All admin routes require login and admin/team authorization
router.use(protect);
router.use(authorize(...adminRoles));

// Dashboard
router.get('/dashboard', getDashboardOverview);

// Registrations
router.get('/registrations', getAllRegistrations);
router.get('/registrations/:id', getRegistrationDetails);
router.patch('/registrations/:id/status', updateRegistrationStatus);
router.get('/registrations/:id/matches', findMatchesForRegistration);

// Matches
router.get('/matches', getAllMatches);
router.post('/matches', createMatchSuggestion);
router.patch('/matches/:id', updateMatchStatus);

// Payments
router.get('/payments', getAllPayments);
router.patch('/payments/:id', verifyPaymentStatus);

// Reports
router.get('/reports', getAllReports);
router.patch('/reports/:id', updateReportStatus);

// Users (Super Admin & Admin only)
router.get('/users', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getAllUsers);
router.patch('/users/:id', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), updateUserStatus);

// Audit logs
router.get('/audit-logs', authorize(ROLES.SUPER_ADMIN, ROLES.ADMIN), getAuditLogs);

export default router;
