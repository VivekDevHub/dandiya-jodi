import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Registration } from './models/Registration.js';
import { Payment } from './models/Payment.js';
import { Match } from './models/Match.js';
import { Report } from './models/Report.js';
import { AuditLog } from './models/AuditLog.js';
import {
  ROLES,
  PROFILE_STATUS,
  PAYMENT_STATUS,
  MATCH_STATUS,
  MATCH_RECORD_STATUS,
} from './config/constants.js';
import { calculateCompatibility } from './services/matchingService.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('🔄 Cleaning existing collections...');

    await Promise.all([
      User.deleteMany({}),
      Registration.deleteMany({}),
      Payment.deleteMany({}),
      Match.deleteMany({}),
      Report.deleteMany({}),
      AuditLog.deleteMany({}),
    ]);

    console.log('✨ Creating Admin & Staff Users...');

    const superAdmin = await User.create({
      name: 'Vivek Sharma (Love Angle Lead)',
      email: 'admin@loveangle.in',
      phone: '9826011111',
      role: ROLES.SUPER_ADMIN,
      passwordHash: 'Admin@123456',
    });

    const verifier = await User.create({
      name: 'Pooja Verma (Verification Team)',
      email: 'verifier@loveangle.in',
      phone: '9826022222',
      role: ROLES.VERIFICATION_TEAM,
      passwordHash: 'Admin@123456',
    });

    const matcher = await User.create({
      name: 'Rohan Joshi (Matchmaker)',
      email: 'matcher@loveangle.in',
      phone: '9826033333',
      role: ROLES.MATCHING_TEAM,
      passwordHash: 'Admin@123456',
    });

    console.log('✨ Creating Demo Participant Profiles for Indore Navratri 2026...');

    const demoProfiles = [
      {
        name: 'Aanya Mehta',
        email: 'aanya.mehta@gmail.com',
        phone: '9826112345',
        gender: 'Female',
        age: 23,
        instagram: '@aanya_garba',
        area: 'Vijay Nagar',
        preference: 'Male Partner',
        minAge: 22,
        maxAge: 27,
        danceExp: 'Good Dancer',
        danceTypes: ['Traditional Garba', 'Dandiya Raas'],
        availability: ['Almost All Days'],
        qualities: ['Good Dancer', 'Friendly Personality', 'Similar Dance Level'],
        about: 'Indore native, CA student. Absolutely love traditional 2-taali and 3-taali Garba! Looking for a dedicated dance partner for Abhivyakti & Saket club nights.',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        plan: 'DOUBLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Aryan Patidar',
        email: 'aryan.patidar@gmail.com',
        phone: '9826223456',
        gender: 'Male',
        age: 24,
        instagram: '@aryan_indori',
        area: 'Vijay Nagar',
        preference: 'Female Partner',
        minAge: 21,
        maxAge: 26,
        danceExp: 'Good Dancer',
        danceTypes: ['Traditional Garba', 'Dandiya Raas', 'Bollywood Garba'],
        availability: ['Almost All Days'],
        qualities: ['Good Dancer', 'Similar Age', 'Good Communication'],
        about: 'Tech consultant working remotely in Indore. Practicing Garba routines every evening. Looking for someone enthusiastic and respectful to dance at Saket Club and Anand Bazar.',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        plan: 'DOUBLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Tanvi Kulkarni',
        email: 'tanvi.k@gmail.com',
        phone: '9826334567',
        gender: 'Female',
        age: 22,
        instagram: '@tanvi.dances',
        area: 'Palasia / Old Palasia',
        preference: 'Male Partner',
        minAge: 22,
        maxAge: 26,
        danceExp: 'Advanced / Experienced',
        danceTypes: ['Dandiya Raas', 'Couple/Duo Performance'],
        availability: ['10–12 October', '13–15 October'],
        qualities: ['Good Dancer', 'Similar Dance Level'],
        about: 'Kathak trained, Navratri enthusiast! Won best dressed dancer at Saket last year. Need a coordinated partner for high-energy Raas rounds.',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Yashwardhan Chouksey',
        email: 'yash.chouksey@gmail.com',
        phone: '9826445678',
        gender: 'Male',
        age: 25,
        instagram: '@yash_chouksey',
        area: 'Palasia / Old Palasia',
        preference: 'Female Partner',
        minAge: 21,
        maxAge: 25,
        danceExp: 'Advanced / Experienced',
        danceTypes: ['Dandiya Raas', 'Couple/Duo Performance'],
        availability: ['10–12 October', '13–15 October'],
        qualities: ['Good Dancer', 'Good Communication'],
        about: 'Architect in Indore. Love traditional chaniya choli aesthetic and synced couple steps. Ready to practice before the main festival nights.',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Sneha Porwal',
        email: 'sneha.porwal@gmail.com',
        phone: '9826556789',
        gender: 'Female',
        age: 26,
        instagram: '@sneha_p_indore',
        area: 'Saket / Tilak Nagar',
        preference: 'Male Partner',
        minAge: 24,
        maxAge: 30,
        danceExp: 'Some Experience',
        danceTypes: ['Traditional Garba', 'Bollywood Garba'],
        availability: ['Almost All Days'],
        qualities: ['Friendly Personality', 'Similar Age'],
        about: 'Content writer from Saket. Looking for a genuine, cheerful partner who enjoys the festive vibe without feeling pressured to do acrobatics!',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Kabir Malviya',
        email: 'kabir.malviya@gmail.com',
        phone: '9826667890',
        gender: 'Male',
        age: 27,
        instagram: '@kabir_malviya',
        area: 'Saket / Tilak Nagar',
        preference: 'Female Partner',
        minAge: 23,
        maxAge: 29,
        danceExp: 'Some Experience',
        danceTypes: ['Traditional Garba', 'Bollywood Garba'],
        availability: ['Almost All Days'],
        qualities: ['Friendly Personality', 'Good Communication'],
        about: 'Marketing lead at an Indore startup. Energetic and easy-going. Let’s enjoy Garba nights at Sayaji & Tilak Nagar grounds!',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Divya Agrawal',
        email: 'divya.agrawal@gmail.com',
        phone: '9826778901',
        gender: 'Female',
        age: 21,
        instagram: '@divya_agr',
        area: 'Bhawarkua / Rajendra Nagar',
        preference: 'Male Partner',
        minAge: 20,
        maxAge: 24,
        danceExp: 'Beginner',
        danceTypes: ['Bollywood Garba', 'Open to All'],
        availability: ['10–12 October'],
        qualities: ['Friendly Personality', 'Similar Age'],
        about: 'DAVV student. First time registering for an official Dandiya partner. Excited to learn new steps and enjoy Navratri with respectful company.',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.PROFILE_REVIEW,
        paymentStatus: PAYMENT_STATUS.PAYMENT_VERIFICATION_PENDING,
      },
      {
        name: 'Manan Singhal',
        email: 'manan.singhal@gmail.com',
        phone: '9826889012',
        gender: 'Male',
        age: 22,
        instagram: '@manan_s',
        area: 'Bhawarkua / Rajendra Nagar',
        preference: 'Female Partner',
        minAge: 20,
        maxAge: 24,
        danceExp: 'Beginner',
        danceTypes: ['Bollywood Garba', 'Open to All'],
        availability: ['10–12 October'],
        qualities: ['Friendly Personality', 'Similar Dance Level'],
        about: 'Engineering student in Indore. Looking for someone to attend collegiate Garba circles and have fun.',
        photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.PROFILE_REVIEW,
        paymentStatus: PAYMENT_STATUS.PAYMENT_PENDING,
      },
      {
        name: 'Riya Solanki',
        email: 'riya.solanki@gmail.com',
        phone: '9826990123',
        gender: 'Female',
        age: 25,
        instagram: '@riya_solanki_ind',
        area: 'Nipania / Mahalaxmi Nagar',
        preference: 'Dandiya Group',
        minAge: 22,
        maxAge: 28,
        danceExp: 'Good Dancer',
        danceTypes: ['Traditional Garba', 'Dandiya Raas'],
        availability: ['Almost All Days'],
        qualities: ['Good Dancer', 'Friendly Personality'],
        about: 'Living in Nipania. Love forming a tight, synchronized group circle for 3-taali rounds. Groups welcome!',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
        plan: 'DOUBLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Gaurav Jain',
        email: 'gaurav.jain@gmail.com',
        phone: '9826001234',
        gender: 'Male',
        age: 26,
        instagram: '@gaurav_jain_in',
        area: 'Nipania / Mahalaxmi Nagar',
        preference: 'Female Partner',
        minAge: 22,
        maxAge: 27,
        danceExp: 'Good Dancer',
        danceTypes: ['Traditional Garba', 'Dandiya Raas'],
        availability: ['Almost All Days'],
        qualities: ['Good Dancer', 'Similar Age'],
        about: 'Chartered Financial Analyst in Indore. Looking for a partner who enjoys both traditional Gujarati and energetic Malwi Garba beats.',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
        plan: 'DOUBLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Pooja Trivedi',
        email: 'pooja.trivedi@gmail.com',
        phone: '9826113456',
        gender: 'Female',
        age: 24,
        instagram: '@pooja_garba_indore',
        area: 'Annapurna / Sudama Nagar',
        preference: 'Male Partner',
        minAge: 23,
        maxAge: 28,
        danceExp: 'Some Experience',
        danceTypes: ['Traditional Garba', 'Bollywood Garba'],
        availability: ['13–15 October'],
        qualities: ['Friendly Personality', 'Good Communication'],
        about: 'Graphic designer from Sudama Nagar. Looking for a respectful dance partner for the second half of Navratri.',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
      {
        name: 'Nikhil Kashyap',
        email: 'nikhil.kashyap@gmail.com',
        phone: '9826224567',
        gender: 'Male',
        age: 28,
        instagram: '@nikhil_kashyap',
        area: 'Rau / AB Road / Bypass',
        preference: 'Female Partner',
        minAge: 22,
        maxAge: 28,
        danceExp: 'Good Dancer',
        danceTypes: ['Dandiya Raas', 'Bollywood Garba'],
        availability: ['Almost All Days'],
        qualities: ['Good Dancer', 'Friendly Personality'],
        about: 'Automobile engineer at Pithampur corridor, residing on AB Road. Excited for Navratri 2026.',
        photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
        plan: 'SINGLE_MATCH',
        profileStatus: PROFILE_STATUS.VERIFIED,
        paymentStatus: PAYMENT_STATUS.VERIFIED,
      },
    ];

    const createdRegistrations = [];

    for (let i = 0; i < demoProfiles.length; i++) {
      const p = demoProfiles[i];
      const user = await User.create({
        name: p.name,
        email: p.email,
        phone: p.phone,
        role: ROLES.USER,
        passwordHash: 'User@123456',
      });

      const regId = `DJ-2026-${String(i + 1).padStart(3, '0')}${Math.floor(10 + Math.random() * 89)}`;

      const registration = await Registration.create({
        registrationId: regId,
        userId: user._id,
        fullName: p.name,
        age: p.age,
        gender: p.gender,
        whatsappNumber: p.phone,
        instagramId: p.instagram,
        location: {
          area: p.area,
          customArea: '',
        },
        partnerPreference: p.preference,
        preferredAgeRange: {
          min: p.minAge,
          max: p.maxAge,
        },
        danceExperience: p.danceExp,
        danceTypes: p.danceTypes,
        availability: p.availability,
        preferredQualities: p.qualities,
        about: p.about,
        photos: [
          {
            url: p.photo,
            publicId: `demo_${i + 1}`,
            isApproved: true,
          },
        ],
        selectedPlan: p.plan,
        consentAccepted: true,
        safetyAgreement: true,
        profileStatus: p.profileStatus,
        paymentStatus: p.paymentStatus,
        matchStatus: p.profileStatus === PROFILE_STATUS.VERIFIED && p.paymentStatus === PAYMENT_STATUS.VERIFIED
          ? MATCH_STATUS.MATCHING
          : MATCH_STATUS.NOT_STARTED,
        contactSharingConsent: true,
        verifiedBy: p.profileStatus === PROFILE_STATUS.VERIFIED ? verifier._id : null,
        verifiedAt: p.profileStatus === PROFILE_STATUS.VERIFIED ? new Date() : null,
      });

      // Create Payment Record
      const isManual = i % 3 === 0;
      await Payment.create({
        registrationId: registration._id,
        userId: user._id,
        plan: p.plan,
        amount: p.plan === 'DOUBLE_MATCH' ? 29900 : 19900,
        currency: 'INR',
        provider: isManual ? 'MANUAL' : 'RAZORPAY',
        razorpayOrderId: isManual ? undefined : `order_sim_${i + 100}`,
        razorpayPaymentId: isManual ? undefined : `pay_sim_${i + 500}`,
        razorpaySignature: isManual ? undefined : 'sandbox_valid_sig',
        screenshotUrl: isManual
          ? 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=600&q=80'
          : null,
        status: p.paymentStatus === PAYMENT_STATUS.VERIFIED ? 'VERIFIED' : 'PENDING',
        verifiedBy: p.paymentStatus === PAYMENT_STATUS.VERIFIED ? verifier._id : null,
        verifiedAt: p.paymentStatus === PAYMENT_STATUS.VERIFIED ? new Date() : null,
      });

      createdRegistrations.push(registration);
    }

    console.log(`✅ Created ${createdRegistrations.length} registrations with payments`);

    console.log('✨ Creating Demo Matches & Mutual Consents...');

    // Match 1: Aanya & Aryan (High score, both in Vijay Nagar, Both consented & contact shared!)
    const regAanya = createdRegistrations[0];
    const regAryan = createdRegistrations[1];
    const match1Score = calculateCompatibility(regAanya, regAryan);

    const match1 = await Match.create({
      registrationA: regAanya._id,
      registrationB: regAryan._id,
      compatibilityScore: match1Score.compatibilityScore,
      factors: match1Score.factors,
      status: MATCH_RECORD_STATUS.CONTACT_SHARED,
      consentA: true,
      consentB: true,
      consentATimestamp: new Date(Date.now() - 3600 * 1000 * 24),
      consentBTimestamp: new Date(Date.now() - 3600 * 1000 * 12),
      contactShared: true,
      contactSharedAt: new Date(),
      createdBy: matcher._id,
      adminNotes: 'High compatibility pair in Vijay Nagar. Both verified, consent received and introduced successfully.',
    });

    regAanya.matchStatus = MATCH_STATUS.CONTACT_PENDING;
    regAryan.matchStatus = MATCH_STATUS.CONTACT_PENDING;
    await Promise.all([regAanya.save(), regAryan.save()]);

    // Match 2: Tanvi & Yashwardhan (Palasia, Pending Consent)
    const regTanvi = createdRegistrations[2];
    const regYash = createdRegistrations[3];
    const match2Score = calculateCompatibility(regTanvi, regYash);

    await Match.create({
      registrationA: regTanvi._id,
      registrationB: regYash._id,
      compatibilityScore: match2Score.compatibilityScore,
      factors: match2Score.factors,
      status: MATCH_RECORD_STATUS.PENDING_CONSENT,
      consentA: true,
      consentB: null, // waiting for Yashwardhan
      consentATimestamp: new Date(),
      createdBy: matcher._id,
      adminNotes: 'Suggested match for couple performance in Palasia.',
    });

    // Create a demo safety report
    console.log('✨ Creating Demo Safety Report...');
    await Report.create({
      reportedBy: superAdmin._id,
      reportedRegistration: createdRegistrations[7]._id,
      reason: 'Fake profile or inaccurate information',
      description: 'Profile photo looks downloaded from an external stock account without face verification.',
      status: 'INVESTIGATING',
    });

    // Create sample audit logs
    console.log('✨ Creating Demo Audit Logs...');
    await AuditLog.create({
      admin: superAdmin._id,
      adminEmail: superAdmin.email,
      action: 'Verified profile for Aanya Mehta',
      targetType: 'Registration',
      targetId: regAanya._id.toString(),
      newValue: { profileStatus: PROFILE_STATUS.VERIFIED },
      ip: '127.0.0.1',
      details: 'Approved after Instagram verification.',
    });

    console.log(`
🎉 ==============================================================
   DANDIYA JODI INDORE 2026 - SEED DATA CREATED SUCCESSFULLY!
==============================================================
   Super Admin:
   Email:    admin@loveangle.in
   Password: Admin@123456

   Verification Team:
   Email:    verifier@loveangle.in
   Password: Admin@123456

   Matchmaker Team:
   Email:    matcher@loveangle.in
   Password: Admin@123456

   Demo User (Aanya Mehta - Confirmed Match):
   Email:    aanya.mehta@gmail.com
   Password: User@123456

   Demo User (Aryan Patidar - Confirmed Match):
   Email:    aryan.patidar@gmail.com
   Password: User@123456
==============================================================
    `);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
