import { AuditLog } from '../models/AuditLog.js';

export const logAudit = async ({
  req,
  action,
  targetType,
  targetId,
  previousValue = null,
  newValue = null,
  details = '',
}) => {
  try {
    if (!req.user) return;
    await AuditLog.create({
      admin: req.user._id,
      adminEmail: req.user.email,
      action,
      targetType,
      targetId: String(targetId),
      previousValue,
      newValue,
      ip: req.ip || req.headers['x-forwarded-for'] || '',
      details,
    });
  } catch (error) {
    console.error('Failed to write audit log:', error.message);
  }
};
