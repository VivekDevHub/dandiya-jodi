import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ_DATA = [
  {
    q: 'Is this a dating website?',
    a: 'No. Dandiya Jodi is designed specifically and exclusively for finding Dandiya/Garba dance partners or groups for Navratri in Indore. Respect, consent, and safety come first. It is not a dating or matrimonial platform.',
    category: 'General',
  },
  {
    q: 'Who can register on Dandiya Jodi?',
    a: 'Any Garba enthusiast aged 18 and above who lives in or is visiting Indore for Navratri 2026 can register. Registrations from anyone under 18 will be rejected immediately.',
    category: 'Registration',
  },
  {
    q: 'Is my WhatsApp number public?',
    a: 'No. We never expose your WhatsApp number, phone number, or private information publicly. Contact details are only coordinated through our moderation team after mutual verified consent from both participants.',
    category: 'Privacy',
  },
  {
    q: 'Will my Instagram be shared?',
    a: 'Your Instagram handle is primarily collected for our moderation team to verify identity and authenticity. It is never displayed publicly to strangers and is only shared when a mutual match has been explicitly confirmed by both dancers.',
    category: 'Privacy',
  },
  {
    q: 'Is the registration fee refundable?',
    a: 'Registration fees cover profile verification and administrative compatibility matching. As per our published refund policy, fees are non-refundable once verification has been performed, except in cases of duplicate technical billing errors.',
    category: 'Payment',
  },
  {
    q: 'Can I request a specific area in Indore?',
    a: 'Yes! During registration you can select your Indore neighborhood (such as Vijay Nagar, Palasia, Saket, Bhawarkua, Nipania, Rau, etc.) or specify a custom locality. Our matching algorithm awards 20% weight to location proximity.',
    category: 'Matching',
  },
  {
    q: 'Is a match guaranteed?',
    a: 'No. While our team and algorithms work diligently to find suitable partners for all verified users, registration does not guarantee an identical mutual match as matches depend on mutual dancer availability, age preferences, and dual consent.',
    category: 'Matching',
  },
  {
    q: 'Can I request two matches?',
    a: 'Yes. If you choose the Double Match plan (₹299), our team will prioritize and coordinate up to 2 verified partner matches across your available festival dates.',
    category: 'Plans',
  },
];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Support & Clarity
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-5xl text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Everything you need to know about Dandiya Jodi, our Indore matching process, and safety rules.
        </p>

        {/* Search bar */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. dating, refund, privacy)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-purple-950/60 border border-purple-800 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-pink"
          />
        </div>
      </div>

      {/* Accordion */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-purple-800/50 overflow-hidden transition"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 text-white hover:text-brand-gold transition"
              >
                <span className="font-heading font-bold text-sm sm:text-base">
                  {faq.q}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-brand-pink shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-purple-900/30">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="text-center py-10 text-gray-400 text-sm">
            No questions matched your search query. Feel free to contact our team directly.
          </div>
        )}
      </div>

      {/* Bottom Help callout */}
      <div className="text-center space-y-2 pt-6">
        <p className="text-xs text-gray-400">
          Still have an unanswered question?
        </p>
        <Link
          to="/contact"
          className="inline-block text-xs font-semibold text-brand-gold hover:text-white underline"
        >
          Contact Love Angle Support in Indore &rarr;
        </Link>
      </div>
    </div>
  );
}
