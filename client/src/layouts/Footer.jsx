import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, MapPin, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#090112] border-t border-purple-950 text-slate-400 text-sm relative">
      {/* Community Respect Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-festival-card to-pink-950 border-b border-purple-900/40 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-pink-200 font-medium">
            <ShieldCheck className="w-4 h-4 text-festival-gold shrink-0" />
            <span>
              <strong>Indore Navratri Community:</strong> Exclusively for finding genuine Garba & Dandiya partners. 100% consent-based.
            </span>
          </div>
          <a
            href="#safety"
            className="text-xs text-festival-gold hover:text-white font-bold underline shrink-0 transition"
          >
            Safety Guidelines &rarr;
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💃</span>
              <span className="font-heading font-black text-2xl text-white tracking-tight">
                DANDIYA JODI
              </span>
              <Heart className="w-4 h-4 text-festival-pink fill-festival-pink" />
            </div>

            <div className="text-xs font-semibold text-purple-300">
              by Love Angle • Indore • Navratri 2026
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Helping Indore's dance enthusiasts connect safely, find their rhythm, and celebrate the divine festival of Navratri with joy and dignity.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/loveangle.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-festival-card border border-festival-border hover:border-festival-pink text-pink-300 hover:text-white flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-festival-pink" />
                <span>Indore, Madhya Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white transition">Safety</a>
              </li>
              <li>
                <a href="#plans" className="hover:text-white transition">Plans</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition">FAQ</a>
              </li>
              <li>
                <Link to="/register" className="text-festival-pink font-semibold hover:text-pink-300 transition">
                  Find My Jodi ❤️
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
              </li>
              <li>
                <Link to="/safety" className="hover:text-white transition">Community Safety</Link>
              </li>
            </ul>
          </div>

          {/* Indore Helpdesk */}
          <div>
            <h4 className="text-white font-heading font-bold text-xs uppercase tracking-wider mb-4">
              Indore Helpdesk
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Need assistance with registration or matching?
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-festival-gold shrink-0" />
                <span>support@loveangle.in</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-festival-gold shrink-0" />
                <span>+91 98260 11111 (WhatsApp)</span>
              </div>
            </div>
            <div className="mt-4 p-2.5 rounded-xl bg-festival-card border border-purple-900/40 text-[11px] text-amber-200/90 font-medium">
              📍 Saket Club • Abhivyakti • Anand Bazar • Sayaji
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-purple-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 Love Angle. All rights reserved. Dandiya Jodi Indore.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/admin/login" className="text-purple-400 hover:text-purple-300 transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
