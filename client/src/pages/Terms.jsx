import React from 'react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-8">
      <div className="border-b border-purple-900/40 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Legal Agreement
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
          Terms of Service
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Effective for Navratri 2026 Season • Dandiya Jodi by Love Angle ❤️ (Indore, MP)
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">1. Nature of Platform</h2>
          <p>
            Dandiya Jodi by Love Angle is an online registration and cultural partner matchmaking platform operated exclusively for the Navratri 2026 festival in Indore, Madhya Pradesh. The service is strictly intended for individuals seeking a companion or group with whom to participate in traditional Garba and Dandiya Raas events.
          </p>
          <p className="font-semibold text-pink-300">
            Dandiya Jodi is NOT a matrimonial, dating, or romantic hookup service. Any misuse for unsolicited flirting, solicitation, or romantic badgering is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">2. Eligibility & Age Restriction</h2>
          <p>
            Participation is strictly restricted to individuals who are 18 years of age or older at the time of registration. Submission of false birthdate information will result in immediate disqualification without refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">3. Verification & Safety Moderation</h2>
          <p>
            All submitted profile details, Instagram accounts, and photographs are subject to manual administrative review by Love Angle. We reserve the full and unequivocal right to reject, suspend, or ban any profile that does not meet our safety standards, provides fraudulent information, or is the subject of verified safety complaints.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">4. Dual Consent Requirement</h2>
          <p>
            Registration does not grant automatic access to any user’s private contact details. Introduction and contact sharing are coordinated solely after both parties have explicitly indicated their affirmative consent ("Accept"). Either participant holds the unconditional right to decline any suggested match.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">5. Limitation of Liability</h2>
          <p>
            While Love Angle exercises rigorous human moderation, participants are responsible for their personal conduct, transportation, and event venue entry tickets at Garba venues. Dandiya Jodi does not organize the external venues (e.g. Saket Club, Abhivyakti) unless explicitly stated.
          </p>
        </section>
      </div>
    </div>
  );
}
