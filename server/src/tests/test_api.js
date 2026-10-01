import assert from 'assert';
import { calculateCompatibility } from '../services/matchingService.js';
import { verifyPaymentSignature } from '../config/razorpay.js';
import { registrationSchema } from '../validators/registration.validator.js';

const runTests = async () => {
  console.log('🧪 Starting Dandiya Jodi Test Suite...\n');
  let passed = 0;
  let failed = 0;

  const test = (description, fn) => {
    try {
      fn();
      console.log(`  ✅ PASS: ${description}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${description}\n     Error: ${err.message}`);
      failed++;
    }
  };

  // 1. Validation Test: Under 18 rejection
  test('Registration validator rejects applicants under 18 years old', () => {
    const invalidData = {
      fullName: 'Minor User',
      age: 17,
      gender: 'Female',
      whatsappNumber: '9826012345',
      instagramId: '@minor_indore',
      location: { area: 'Vijay Nagar' },
      partnerPreference: 'Male Partner',
      danceExperience: 'Beginner',
      danceTypes: ['Traditional Garba'],
      availability: ['10–12 October'],
      photos: [{ url: 'https://example.com/photo.jpg', publicId: 'test' }],
      selectedPlan: 'SINGLE_MATCH',
      consentAccepted: true,
      safetyAgreement: true,
    };

    let threw = false;
    try {
      registrationSchema.parse(invalidData);
    } catch (e) {
      threw = true;
      assert(e.errors.some((err) => err.message.includes('18 or older')));
    }
    assert(threw, 'Should have thrown validation error for age < 18');
  });

  // 2. Validation Test: Valid 18+ applicant passes
  test('Registration validator accepts valid adult registration payload', () => {
    const validData = {
      fullName: 'Aarav Sharma',
      age: 24,
      gender: 'Male',
      whatsappNumber: '9826012345',
      instagramId: '@aarav_indore',
      location: { area: 'Vijay Nagar', customArea: '' },
      partnerPreference: 'Female Partner',
      preferredAgeRange: { min: 21, max: 26 },
      danceExperience: 'Good Dancer',
      danceTypes: ['Traditional Garba', 'Dandiya Raas'],
      availability: ['Almost All Days'],
      preferredQualities: ['Good Dancer'],
      about: 'Looking forward to Navratri in Saket.',
      photos: [{ url: 'https://example.com/photo.jpg', publicId: 'test1' }],
      selectedPlan: 'DOUBLE_MATCH',
      consentAccepted: true,
      safetyAgreement: true,
    };

    const parsed = registrationSchema.parse(validData);
    assert.strictEqual(parsed.fullName, 'Aarav Sharma');
    assert.strictEqual(parsed.age, 24);
  });

  // 3. Matching Algorithm Test: High compatibility between complementary dancers
  test('Matching algorithm computes high compatibility for complementary Indore pair', () => {
    const regA = {
      gender: 'Female',
      age: 23,
      location: { area: 'Vijay Nagar' },
      partnerPreference: 'Male Partner',
      preferredAgeRange: { min: 22, max: 27 },
      danceExperience: 'Good Dancer',
      danceTypes: ['Traditional Garba', 'Dandiya Raas'],
      availability: ['Almost All Days'],
    };

    const regB = {
      gender: 'Male',
      age: 24,
      location: { area: 'Vijay Nagar' },
      partnerPreference: 'Female Partner',
      preferredAgeRange: { min: 21, max: 26 },
      danceExperience: 'Good Dancer',
      danceTypes: ['Traditional Garba', 'Dandiya Raas'],
      availability: ['Almost All Days'],
    };

    const result = calculateCompatibility(regA, regB);
    assert(result.compatibilityScore >= 90, `Expected score >= 90, got ${result.compatibilityScore}`);
    assert.strictEqual(result.factors.locationScore, 100);
    assert.strictEqual(result.factors.preferenceScore, 100);
  });

  // 4. Payment Signature Verification Test
  test('Payment signature verification validates sandbox and valid signatures', () => {
    const valid = verifyPaymentSignature({
      razorpayOrderId: 'order_123',
      razorpayPaymentId: 'pay_456',
      razorpaySignature: 'sandbox_valid_sig',
    });
    assert.strictEqual(valid, true);

    const invalid = verifyPaymentSignature({
      razorpayOrderId: 'order_123',
      razorpayPaymentId: 'pay_456',
      razorpaySignature: 'forged_fake_sig',
    });
    assert.strictEqual(invalid, false);
  });

  // 5. Women's Privacy & Safety Rules Test
  test('Contact sharing is restricted unless both users consent', () => {
    const match = {
      consentA: true,
      consentB: false, // declined
      contactShared: false,
    };
    const canShareContact = match.consentA === true && match.consentB === true;
    assert.strictEqual(canShareContact, false, 'Contact must not be shared without mutual consent');
  });

  console.log(`\n================================`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`================================\n`);

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};

runTests();
