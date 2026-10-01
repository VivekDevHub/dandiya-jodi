import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, Shield, Clock, XCircle, RefreshCw } from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolutionText, setResolutionText] = useState({});
  const [notice, setNotice] = useState('');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllReports();
      if (res.data?.success) {
        setReports(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleUpdateReport = async (reportId, status) => {
    try {
      setNotice('');
      const resolution = resolutionText[reportId] || '';
      const res = await adminService.updateReport(reportId, {
        status,
        resolution,
      });
      if (res.data?.success) {
        setNotice(`Report marked as ${status}`);
        fetchReports();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Safety & Moderation Reports
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review reported safety violations, inappropriate behavior, and identity disputes.
          </p>
        </div>
        <button
          onClick={fetchReports}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition flex items-center gap-1.5 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-purple-950/80 border border-brand-pink text-xs text-white">
          {notice}
        </div>
      )}

      <div className="space-y-4">
        {loading ? (
          <div className="py-12 text-center text-gray-400 text-xs">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="glass-card p-10 rounded-2xl text-center text-gray-400 text-xs">
            No incident reports found. Community guidelines are being honored!
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="glass-card p-6 rounded-3xl border border-red-900/40 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="font-heading font-bold text-sm text-white">
                    {report.reason}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      report.status === 'RESOLVED'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : report.status === 'INVESTIGATING'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <span className="text-[11px] text-gray-400">
                  Reported {new Date(report.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-gray-300 bg-purple-950/40 p-3 rounded-xl border border-purple-900/40 leading-relaxed">
                "{report.description}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
                <div>
                  Reported By: <strong className="text-white">{report.reportedBy?.name}</strong> ({report.reportedBy?.email})
                </div>
                {report.reportedRegistration && (
                  <div>
                    Reported Registration: <strong className="text-brand-gold">{report.reportedRegistration.registrationId}</strong> ({report.reportedRegistration.fullName})
                  </div>
                )}
              </div>

              {/* Resolution control */}
              <div className="border-t border-purple-900/30 pt-3 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  placeholder="Add resolution or investigation notes..."
                  value={resolutionText[report._id] || report.resolution || ''}
                  onChange={(e) =>
                    setResolutionText({ ...resolutionText, [report._id]: e.target.value })
                  }
                  className="w-full sm:flex-1 px-3 py-2 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleUpdateReport(report._id, 'INVESTIGATING')}
                    className="px-3 py-2 rounded-xl text-[11px] font-bold bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition"
                  >
                    Investigating
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateReport(report._id, 'RESOLVED')}
                    className="px-3 py-2 rounded-xl text-[11px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow"
                  >
                    Mark Resolved
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateReport(report._id, 'DISMISSED')}
                    className="px-3 py-2 rounded-xl text-[11px] font-bold bg-white/5 hover:bg-white/10 text-gray-400 transition"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
