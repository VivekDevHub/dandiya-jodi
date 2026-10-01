import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Is Dandiya Jodi a dating or matrimonial service?',
      a: 'No. Dandiya Jodi by Love Angle is specifically curated for finding verified dance partners or groups for Navratri celebrations in Indore. Respect, consent, and mutual love for Garba and Dandiya come first.',
    },
    {
      q: 'How does profile verification work?',
      a: 'Our Indore moderation team reviews every submission manually, checking Instagram profiles and application details to ensure real, respectful festival attendees.',
    },
    {
      q: 'Will my phone number or WhatsApp details be displayed publicly?',
      a: 'Never. Contact details are strictly shielded. We only introduce matches after mutual consent is confirmed by both dancers on our secure platform.',
    },
    {
      q: 'Which Navratri venues in Indore do you support?',
      a: 'We cover all major Indore Garba hubs including Saket Club, Abhivyakti Garba Grounds, Sayaji Navratri Utsav, Anand Bazar, and community circles across Vijay Nagar, Palasia, Nipania, and Rau.',
    },
    {
      q: 'What is the difference between Single Match and Double Match plans?',
      a: 'The Single Match plan (₹199) assists in finding 1 suitable dance partner. The Double Match plan (₹299) offers more flexibility by providing up to 2 partner suggestions across different festival nights.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-12 bg-festival-plum/30 border-t border-purple-900/30 relative">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festival-cardSoft border border-festival-border text-festival-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Everything you need to know about Dandiya Jodi in Indore.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="bg-festival-card/80 border border-festival-border/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-festival-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-purple-900/40 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
