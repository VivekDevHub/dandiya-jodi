import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setForm({ name: '', email: '', phone: '', message: '' });
      setSent(false);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Indore Support
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          Contact Love Angle
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Have inquiries about Navratri 2026 partner matching, venue collaborations, or registration verification? Reach out to our local team in Indore.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-purple-800/60 space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">
              Indore Event Coordination Office
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Love Angle manages festival partner matchmaking and youth cultural events across Indore, Madhya Pradesh.
            </p>

            <div className="space-y-3 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
                <span>Saket Nagar / Old Palasia, Indore, MP 452001</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>support@loveangle.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 98260 11111 (WhatsApp Helpdesk 10 AM – 8 PM)</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-purple-800/40 space-y-2">
            <h4 className="font-heading font-bold text-sm text-amber-300">
              ⚡ Verification Timeline Note
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Profiles submitted on Dandiya Jodi are usually verified within 2 to 4 business hours by our human moderation team.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-8 rounded-3xl border border-purple-800/60 shadow-xl">
          {sent ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="font-heading font-bold text-xl text-white">Message Received!</h3>
              <p className="text-xs text-gray-300">
                Thank you for contacting Dandiya Jodi. Our team will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-white mb-2">
                Send Us a Message
              </h3>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Patidar"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. yourname@gmail.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 9826012345"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Message</label>
                <textarea
                  required
                  rows="4"
                  placeholder="How can we assist you regarding Navratri matching?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-purple-950/50 border border-purple-800 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand-pink"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl font-heading font-bold text-xs bg-gradient-to-r from-brand-pink to-brand-gold text-white shadow-lg hover:opacity-95 transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
