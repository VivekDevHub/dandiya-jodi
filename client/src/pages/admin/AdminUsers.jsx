import React, { useState, useEffect } from 'react';
import { UserCheck, ShieldAlert, Shield, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { adminService } from '../../services/api';

const ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'VERIFICATION_TEAM',
  'MATCHING_TEAM',
  'USER',
];

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAllUsers();
      if (res.data?.success) {
        setUsers(res.data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await adminService.updateUser(userId, { role: newRole });
      setNotice(`Updated role to ${newRole}`);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleBan = async (user) => {
    try {
      const willBan = !user.isBanned;
      await adminService.updateUser(user._id, {
        isBanned: willBan,
        banReason: willBan ? 'Administrative safety decision' : null,
      });
      setNotice(`User ${willBan ? 'banned' : 'unbanned'} successfully`);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
            User Accounts & Role Permissions
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Manage administrative staff roles and enforce account suspension bans. Total: {users.length}
          </p>
        </div>
        <button
          onClick={fetchUsers}
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

      <div className="glass-card rounded-3xl border border-purple-800/60 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-950/60 text-gray-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Name</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Phone</th>
                <th className="py-3.5 px-4">System Role</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/30 text-gray-300">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400">
                    Loading users...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {u.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-purple-200">
                      {u.email}
                    </td>
                    <td className="py-3.5 px-4">{u.phone || '—'}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u._id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-purple-950/70 border border-purple-800 text-[11px] font-semibold text-brand-gold focus:outline-none"
                      >
                        {ROLES.map((r) => (
                          <option key={r} value={r}>
                            {r.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.isBanned
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {u.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleToggleBan(u)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                          u.isBanned
                            ? 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
                            : 'bg-red-600/30 hover:bg-red-600/50 text-red-300'
                        }`}
                      >
                        {u.isBanned ? 'Unban Account' : 'Ban Account'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
