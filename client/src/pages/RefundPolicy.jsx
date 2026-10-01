import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-8">
      <div className="border-b border-purple-900/40 pb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
          Fair & Transparent Policy
        </span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-white mt-1">
          Refund & Cancellation Policy
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Effective for Navratri 2026 Season • Dandiya Jodi by Love Angle ❤️ (Indore, MP)
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">1. Nature of the Registration Fee</h2>
          <p>
            The registration fees (₹199 for Single Match or ₹299 for Double Match) cover the immediate administrative costs of human identity verification, Instagram cross-verification, and algorithmic processing for the Navratri 2026 festival season in Indore.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">2. Non-Refundable Scenarios</h2>
          <p>Registration fees are generally non-refundable in the following situations, subject to applicable consumer protection laws:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Where a profile is rejected due to inaccurate, misleading, or fraudulent information provided by the registrant.</li>
            <li>Where an applicant is under the mandatory minimum age of 18 years.</li>
            <li>Where an applicant changes their personal festival plans or decides not to attend Garba events.</li>
            <li>Where an applicant declines suggested compatible matches or fails to reach mutual consent with candidates.</li>
            <li>Where an account is banned due to harassment, inappropriate behavior, or community safety violations.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">3. Eligible Refund Scenarios</h2>
          <p>Refunds will be promptly processed in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li><strong>Duplicate Billing:</strong> If technical payment gateway issues result in duplicate charges for a single registration, the extra deduction will be refunded in full within 5–7 business days.</li>
            <li><strong>Technical Payment Failures:</strong> In cases where an amount is debited from your bank account or UPI app but not credited to our system, our payment gateway (Razorpay) will auto-reconcile or refund the amount.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">4. No Match Guarantee Clarification</h2>
          <p>
            Match availability depends on mutual candidate compatibility, gender preferences, Indore neighborhood proximity, and mutual consent. Dandiya Jodi does not guarantee that every registration will result in a confirmed mutual dance partnership.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-heading font-bold text-lg text-white">5. How to Request Billing Assistance</h2>
          <p>
            For payment inquiries, duplicate charge claims, or billing queries, contact <strong className="text-brand-gold">billing@loveangle.in</strong> or WhatsApp +91 98260 11111 with your Registration ID and bank transaction reference.
          </p>
        </section>
      </div>
    </div>
  );
}
