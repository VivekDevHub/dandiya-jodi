import { Report } from '../models/Report.js';
import { Registration } from '../models/Registration.js';
import { logAudit } from '../middleware/audit.middleware.js';

export const createReport = async (req, res, next) => {
  try {
    const { reportedRegistrationId, matchId, reason, description, evidence } = req.body;

    if (!reason || !description) {
      return res.status(400).json({
        success: false,
        message: 'Reason and description are required',
      });
    }

    let reportedRegistration = null;
    if (reportedRegistrationId) {
      reportedRegistration = await Registration.findById(reportedRegistrationId);
    }

    const report = await Report.create({
      reportedBy: req.user._id,
      reportedRegistration: reportedRegistration ? reportedRegistration._id : null,
      matchId: matchId || null,
      reason,
      description,
      evidence: evidence || '',
      status: 'OPEN',
    });

    res.status(201).json({
      success: true,
      message: 'Safety report submitted. Our moderation team takes safety very seriously and will investigate immediately.',
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReports = async (req, res, next) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'name email phone')
      .populate('reportedRegistration', 'registrationId fullName gender whatsappNumber')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { status, resolution } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    report.status = status || report.status;
    report.resolution = resolution || report.resolution;
    report.reviewedBy = req.user._id;
    await report.save();

    await logAudit({
      req,
      action: `Report ${report._id} marked as ${report.status}`,
      targetType: 'Report',
      targetId: report._id,
      newValue: { status: report.status, resolution: report.resolution },
    });

    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: report,
    });
  } catch (error) {
    next(error);
  }
};
