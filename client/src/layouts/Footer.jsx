import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, MapPin, Sparkles, AlertCircle, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08010e] border-t border-purple-950 text-gray-400 text-sm">
      {/* Safety Notice Banner */}
      <div className="bg-gradient-to-r from-purple-950/80 via-pink-950/50 to-amber-950/60 border-b border-purple-900/40 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-pink-200 text-xs sm:text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
            <span>
              ❤️ <strong>Important Community Notice:</strong> This platform is exclusively for finding a Dandiya/Garba dance partner or group for Navratri. Respect, consent and safety come first.
            </span>
          </div>
          <Link
            to="/safety"
            className="text-xs text-brand-gold hover:text-white font-semibold underline shrink-0 transition"
          >
            Read Safety Rules &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💃</span>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                Dandiya Jodi
              </span>
              <Heart className="w-4 h-4 text-brand-pink fill-brand-pink" />
            </div>
            <p className="text-xs font-semibold text-purple-300">
              Managed with care by Love Angle ❤️
            </p>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Connecting genuine Garba & Dandiya lovers across Indore for Navratri 2026. Experience the rhythm, dance in harmony, and celebrate the divine festival with mutual respect and zero harassment.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300/90 font-medium">
              <MapPin className="w-4 h-4 text-brand-pink shrink-0" />
              <span>Indore, Madhya Pradesh • Dedicated Local Support</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition">How It Works</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-white transition">Pricing Plans</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white text-brand-pink font-medium transition">Register Profile</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">
              Safety & Moderation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/safety" className="hover:text-white transition">Safety Policy</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition">Privacy Guarantee</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
              </li>
              <li>
                <Link to="/safety#report" className="hover:text-white text-red-400 transition">Report Misconduct</Link>
              </li>
            </ul>
          </div>

          {/* Indore Venues & Help */}
          <div>
            <h4 className="text-white font-heading font-bold text-sm uppercase tracking-wider mb-4">
              Indore Helpdesk
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Need assistance with your registration or matching?
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>support@loveangle.in</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 98260 11111 (WhatsApp Only)</span>
              </div>
            </div>
            <div className="mt-4 p-2.5 rounded-lg bg-purple-950/40 border border-purple-800/30 text-xs text-purple-200">
              📍 Saket Club • Abhivyakti • Anand Bazar • Sayaji Club
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; 2026 Dandiya Jodi by Love Angle ❤️. All rights reserved. Strictly Navratri Garba matching.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-gray-300 transition">Terms</Link>
            <span>•</span>
            <Link to="/refund-policy" className="hover:text-gray-300 transition">Refunds</Link>
            <span>•</span>
            <Link to="/admin/login" className="text-purple-400/60 hover:text-purple-300 transition">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
