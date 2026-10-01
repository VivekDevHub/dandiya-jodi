import React, { useState, useEffect } from 'react';
import { Settings, Shield, Clock, Save, RefreshCw } from 'lucide-react';
import { adminService } from '../../services/api';

export default function AdminSettings() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [registrationsOpen, setRegistrationsOpen] = useState(true);
  const [notice, setNotice] = useState('');

  const fetchAuditLogs = async () => {
    try {
      setLoadingLogs(true);
      const res = await adminService.getAuditLogs();
      if (res.data?.success) {
        setAuditLogs(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogs(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const handleSaveSettings = () => {
    setNotice('Platform configuration saved successfully.');
    setTimeout(() => setNotice(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            Platform Settings & Audit Logs
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Indore Navratri 2026 event dates, registration controls, and administrative audit trails.
          </p>
        </div>
      </div>

      {notice && (
        <div className="p-3.5 rounded-xl bg-purple-950/80 border border-brand-pink text-xs text-white">
          {notice}
        </div>
      )}

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
          <h3 className="font-heading font-bold text-base text-white">
            Indore Navratri 2026 Event Parameters
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-gray-400 block mb-1">Target Festival Dates</label>
              <input
                type="text"
                disabled
                value="10 October 2026 – 19 October 2026"
                className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-800 text-gray-300"
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-1">Operating Region</label>
              <input
                type="text"
                disabled
                value="Indore, Madhya Pradesh"
                className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-800 text-gray-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-gray-300 font-medium">Public Registration Status:</span>
              <button
                type="button"
                onClick={() => setRegistrationsOpen(!registrationsOpen)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  registrationsOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                {registrationsOpen ? 'Registrations OPEN' : 'Registrations PAUSED'}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveSettings}
              className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold bg-brand-pink text-white hover:bg-pink-600 transition"
            >
              Update Event Settings
            </button>
          </div>
        </div>

        {/* Pricing reference box */}
        <div className="glass-card p-6 rounded-3xl border border-purple-800/60 space-y-4">
          <h3 className="font-heading font-bold text-base text-white">
            Active Matchmaking Plans
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-800/40 flex justify-between items-center">
              <div>
                <strong className="text-white">Single Match Pass</strong>
                <div className="text-[11px] text-gray-400">1 Dandiya partner match</div>
              </div>
              <span className="font-heading font-extrabold text-lg text-white">₹199</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-brand-pink/40 flex justify-between items-center">
              <div>
                <strong className="text-white">Double Match Pass</strong>
                <div className="text-[11px] text-gray-400">Up to 2 Dandiya partner matches</div>
              </div>
              <span className="font-heading font-extrabold text-lg text-brand-gold">₹299</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden shadow-2xl space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4">
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Administrative Audit Logs
            </h3>
            <p className="text-xs text-gray-400">
              Tracking status updates, profile verifications, and match authorizations.
            </p>
          </div>
          <button
            onClick={fetchAuditLogs}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        <div className="divide-y divide-purple-900/30 text-xs">
          {loadingLogs ? (
            <div className="py-8 text-center text-gray-400">Loading audit history...</div>
          ) : auditLogs.length === 0 ? (
            <div className="py-8 text-center text-gray-400">No audit records found.</div>
          ) : (
            auditLogs.map((log) => (
              <div key={log._id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-gray-300">
                <div>
                  <strong className="text-white">{log.adminEmail || log.admin?.email || 'Admin'}</strong>
                  <span className="text-gray-400 mx-1.5">•</span>
                  <span className="text-purple-200">{log.action}</span>
                  {log.details && <span className="text-gray-400 text-[11px]"> ({log.details})</span>}
                </div>
                <div className="text-[11px] text-gray-500 shrink-0">
                  {new Date(log.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
