import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-8">
      <div className="border-b border-purple-900/40 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Your Privacy Matters
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Updated for Navratri 2026 Season • Dandiya Jodi by Love Angle ❤️ (Indore, MP)
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">1. Information We Collect</h2>
          <p>
            To facilitate secure, genuine, and compatible Garba partner matching in Indore, we collect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Personal Identity:</strong> Full Name, verified Age (18+), Gender.</li>
            <li><strong>Contact Details:</strong> WhatsApp Number and active Instagram handle.</li>
            <li><strong>Location:</strong> Indore neighborhood / area preference.</li>
            <li><strong>Dance Attributes:</strong> Dance experience level, styles, availability dates, and partner qualities.</li>
            <li><strong>Visual Media:</strong> 1 to 5 profile photographs uploaded for verification.</li>
            <li><strong>Billing Data:</strong> Payment transaction ID, order records, or manual payment receipts.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">2. How We Use Your Information</h2>
          <p>We use your information solely for the following legitimate purposes:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Human verification of identity and profile authenticity.</li>
            <li>Algorithmic compatibility calculations for Indore Navratri partner matching.</li>
            <li>Facilitating safe, consent-based contact introductions.</li>
            <li>Payment verification and transactional receipt logging.</li>
            <li>Safety moderation and investigation of reported misconduct.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">3. Strict Protection of Women's Privacy</h2>
          <p className="font-semibold text-pink-300">
            We never sell, rent, or publicly expose your private contact information.
          </p>
          <p>
            Your WhatsApp number and private details remain strictly masked and inaccessible to other users until <strong>BOTH</strong> you and your suggested match have expressly provided affirmative consent to be introduced. Even then, introduction is moderated by the Love Angle team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">4. Data Retention & Deletion Rights</h2>
          <p>
            Festival registration records and uploaded media are retained through the conclusion of Navratri 2026 for safety audits. Any participant may request complete deletion of their profile and media from our active database by sending a written email to <strong className="text-white">privacy@loveangle.in</strong> with their Registration ID.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">5. Contact Our Privacy Officer</h2>
          <p>
            For privacy inquiries or deletion requests, contact our Indore privacy desk at <strong className="text-brand-gold">privacy@loveangle.in</strong> or via our WhatsApp helpline at +91 98260 11111.
          </p>
        </section>
      </div>
    </div>
  );
}
