import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [activePaymentId, setActivePaymentId] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [notice, setNotice] = useState('');

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllPayments({ limit: 50 });
      if (res.data?.success) {
        setPayments(res.data.data.payments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleUpdatePaymentStatus = async (paymentId, status) => {
    try {
      setNotice('');
      const res = await adminService.verifyPayment(paymentId, {
        status,
        adminNotes,
      });
      if (res.data?.success) {
        setNotice(`Payment marked as ${status}`);
        setSelectedScreenshot(null);
        setActivePaymentId(null);
        setAdminNotes('');
        fetchPayments();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Payments & Receipt Verification
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Review online Razorpay transactions and inspect manual UPI screenshots.
          </p>
        </div>
        <button
          onClick={fetchPayments}
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

      {/* Table */}
      <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-950/60 text-gray-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">User / Reg ID</th>
                <th className="py-3.5 px-4">Plan & Amount</th>
                <th className="py-3.5 px-4">Provider</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Screenshot</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400">
                    Loading payments data...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-gray-400">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p._id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 whitespace-nowrap text-gray-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">
                        {p.registrationId?.fullName || p.userId?.name || 'Participant'}
                      </div>
                      <div className="font-mono text-[11px] text-brand-gold">
                        {p.registrationId?.registrationId || 'DJ-2026-N/A'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-bold text-white">
                        ₹{(p.amount / 100).toFixed(0)}
                      </div>
                      <div className="text-[11px] text-gray-400">
                        {p.plan === 'DOUBLE_MATCH' ? 'Double Match' : 'Single Match'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="flex items-center gap-1 font-medium text-purple-200">
                        {p.provider === 'RAZORPAY' ? (
                          <>
                            <CreditCard className="w-3.5 h-3.5 text-brand-pink" />
                            Razorpay
                          </>
                        ) : (
                          <>
                            <QrCode className="w-3.5 h-3.5 text-brand-gold" />
                            Manual UPI
                          </>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'VERIFIED'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : p.status === 'REJECTED'
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {p.screenshotUrl ? (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedScreenshot(p.screenshotUrl);
                            setActivePaymentId(p._id);
                            setAdminNotes(p.adminNotes || '');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-purple-950 border border-purple-700 text-brand-gold hover:text-white flex items-center gap-1 text-[11px] font-semibold transition"
                        >
                          <Eye className="w-3 h-3" />
                          View Receipt
                        </button>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                      {p.status !== 'VERIFIED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdatePaymentStatus(p._id, 'VERIFIED')}
                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow"
                        >
                          Approve
                        </button>
                      )}
                      {p.status !== 'REJECTED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdatePaymentStatus(p._id, 'REJECTED')}
                          className="px-3 py-1 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-[11px] transition"
                        >
                          Reject
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screenshot Inspection Modal */}
      {selectedScreenshot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full p-6 rounded-3xl border border-purple-800 space-y-4 relative">
            <button
              onClick={() => {
                setSelectedScreenshot(null);
                setActivePaymentId(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading font-bold text-base text-white">
              UPI Payment Screenshot Review
            </h3>

            <div className="rounded-2xl overflow-hidden border border-purple-800/60 bg-black max-h-96 flex items-center justify-center">
              <img
                src={selectedScreenshot}
                alt="Payment screenshot"
                className="max-h-96 w-auto object-contain"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-300">
                Verification Notes (Optional)
              </label>
              <input
                type="text"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. UTR verified against merchant bank statement"
                className="w-full px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-800 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleUpdatePaymentStatus(activePaymentId, 'VERIFIED')}
                className="py-2.5 rounded-xl font-heading font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve Payment
              </button>
              <button
                type="button"
                onClick={() => handleUpdatePaymentStatus(activePaymentId, 'REJECTED')}
                className="py-2.5 rounded-xl font-heading font-bold text-xs bg-red-600 hover:bg-red-500 text-white transition flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                Reject Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
