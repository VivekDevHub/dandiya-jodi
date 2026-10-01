# 💃 DANDIYA JODI | INDORE NAVRATRI 2026 🕺
### by Love Angle ❤️

A **production-ready, fully responsive, dynamic MERN stack web application** built for **Navratri 2026 in Indore, Madhya Pradesh**. The platform enables genuine Garba and Dandiya dancers to register, verify their identities, choose transparent matchmaking plans, and safely find compatible dance partners or groups with **consent-first contact sharing**.

---

## 🌟 Key Highlights & Philosophy

* **Strictly Dandiya / Garba Matching**: This platform is **NOT** a dating or hookup app. Respect, safety, and mutual consent are foundational.
* **Women's Privacy & Safety**: Contact sharing is **OFF by default**. WhatsApp and Instagram handles are never exposed without verified affirmative dual consent from both participants.
* **18+ Age Enforcement**: Real-time validation and moderation rejection for applicants under 18 years old.
* **Indore Regional Proximity**: Focuses on Indore neighborhoods (Vijay Nagar, Palasia, Saket, Bhawarkua, Nipania, Rau, Annapurna, MG Road).
* **Weighted Compatibility Engine**:
  * Age Compatibility (25%)
  * Indore Location Proximity (20%)
  * Partner Preference Alignment (20%)
  * Dance Experience Level (15%)
  * Dance Styles Overlap (10%)
  * Festival Availability Dates (10%)
* **Dual Payment Architecture**:
  * **Razorpay Checkout**: Strict backend pricing in paise (₹199 Single Match = `19900`, ₹299 Double Match = `29900`), HMAC SHA-256 signature verification.
  * **Manual UPI QR Verification**: Upload payment screenshots for administrative review and approval.
* **Role-Based Admin Console**:
  * `SUPER_ADMIN`, `ADMIN`, `VERIFICATION_TEAM`, `MATCHING_TEAM`.
  * Real-time metrics, area breakdowns, profile verification, matching workbench, manual payment verification, incident report moderation, and audit logs.

---

## 🛠️ Technology Stack

### Frontend (`client/`)
* **React 18** + **Vite 6**
* **React Router DOM v6** (Nested routes, Protected routes)
* **Tailwind CSS v3** (Custom Navratri festive palette: deep purple `#0c0214`, royal pink `#db2777`, warm orange `#f97316`, royal gold `#eab308`)
* **TanStack Query v5** (Server state synchronization)
* **Zustand v5** (Global auth & registration state)
* **Lucide React** (Icons)
* **Framer Motion** (Fluid animations)
* **Canvas Confetti** (Festival celebration effects)
* **Axios** (API requests with automatic Bearer token interceptor)

### Backend (`server/`)
* **Node.js** + **Express.js** (ES Modules)
* **MongoDB** + **Mongoose v8** (Strict schemas, compound indexes, sanitized queries)
* **JWT** (JSON Web Tokens) & **bcryptjs** (Password hashing)
* **Multer** (Disk and memory file handling with 10MB limit and MIME validation)
* **Cloudinary** (Cloud image storage with automatic local disk serving fallback)
* **Razorpay Node SDK** (Order creation & signature verification)
* **Nodemailer** (Transactional email notifications)
* **Helmet**, **CORS**, **express-rate-limit**, **Morgan**
* **Zod v3** (Runtime schema validation for auth, registration, and payments)

---

## 📁 Folder Structure

```text
dandiya/
├── client/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── layouts/            # PublicLayout, Navbar, Footer, AdminLayout
│   │   ├── pages/              # Home, Register, HowItWorks, Plans, Safety, FAQ,
│   │   │                       # Contact, Terms, Privacy, RefundPolicy, Dashboard,
│   │   │                       # RegistrationSuccess, Login
│   │   ├── pages/admin/        # AdminDashboard, AdminRegistrations, AdminMatches,
│   │   │                       # AdminRegistrationDetail, AdminPayments,
│   │   │                       # AdminUsers, AdminReports, AdminSettings, AdminLogin
│   │   ├── services/           # Axios client & centralized API service layer
│   │   ├── store/              # Zustand authentication & session store
│   │   ├── index.css           # Custom festive Tailwind utilities & glassmorphism
│   │   ├── App.jsx             # Route definitions & guards
│   │   └── main.jsx            # React root & QueryClient provider
│   ├── index.html              # SEO meta tags & Razorpay checkout script
│   ├── tailwind.config.js      # Navratri color extensions & keyframe animations
│   ├── vite.config.js          # Vite config & API reverse proxy
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/             # MongoDB, constants, Cloudinary, Razorpay
│   │   ├── controllers/        # Auth, Registration, Upload, Payment, Match, Admin, Report
│   │   ├── middleware/         # Auth (JWT & Roles), Uploads (Multer), Errors, AuditLog
│   │   ├── models/             # User, Registration, Payment, Match, Report, AuditLog
│   │   ├── routes/             # Express API route modules
│   │   ├── services/           # Matching Engine, Payment Service, Notification Service
│   │   ├── validators/         # Zod schemas (18+ validation, phone, plan)
│   │   ├── tests/              # Automated backend test suite
│   │   ├── app.js              # Express app setup & security middleware
│   │   ├── server.js           # Server bootstrap & MongoDB connection
│   │   └── seed.js             # Realistic demo data seed script
│   ├── uploads/                # Local disk storage for photos & payment receipts
│   ├── .env                    # Server environment variables
│   └── package.json
│
├── .env.example                # Documented configuration template
├── README.md                   # Complete architectural documentation
└── package.json                # Root scripts (concurrent dev, seed, test, build)
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `server/.env`:

```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/dandiya_jodi
JWT_SECRET=dandiya_jodi_love_angle_secret_jwt_key_2026_super_secure
CLIENT_URL=http://localhost:5173

# Razorpay (Sandbox test keys - built-in order generator if keys are absent)
RAZORPAY_KEY_ID=rzp_test_loveangle2026
RAZORPAY_KEY_SECRET=rzp_secret_loveangle2026

# Cloudinary (Optional - server seamlessly stores to /uploads if left empty)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email / Notifications (Optional - logs formatted messages in dev if absent)
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASSWORD=
EMAIL_FROM="Dandiya Jodi by Love Angle <no-reply@loveangle.in>"
```

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
* Node.js v18+ (tested on Node v22)
* MongoDB running locally on port `27017` (e.g. `brew services start mongodb-community` or Docker)

### 2. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```

### 3. Seed Database with Realistic Indore 2026 Data
Populate super admin, verification agents, 12 realistic participants in Indore (Saket, Palasia, Vijay Nagar, Nipania, etc.), payments, matches, reports, and audit logs:
```bash
npm run seed
```

### 4. Run Development Servers
Start both the backend server (port 5001) and the frontend Vite server (port 5173) concurrently:
```bash
npm run dev
```

Visit in your browser:
* **Public Website**: `http://localhost:5173/`
* **Admin Login**: `http://localhost:5173/admin/login`
* **Backend Health**: `http://localhost:5001/api/health`

---

## 🔑 Pre-Configured Demo Accounts

| Role | Email | Password | Details |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@loveangle.in` | `Admin@123456` | Full platform control, audit logs, user management |
| **Verification Team** | `verifier@loveangle.in` | `Admin@123456` | Profile & payment screenshot verification |
| **Matchmaking Team** | `matcher@loveangle.in` | `Admin@123456` | Matching workbench & consent management |
| **Demo User A** | `aanya.mehta@gmail.com` | `User@123456` | Aanya Mehta (Vijay Nagar, Confirmed Match) |
| **Demo User B** | `aryan.patidar@gmail.com` | `User@123456` | Aryan Patidar (Vijay Nagar, Confirmed Match) |

*(Note: Fast 1-click login buttons are provided on both `/login` and `/admin/login` for rapid testing).*

---

## 🧪 Automated Testing

Run the automated test suite verifying 18+ validation, registration schemas, matching engine weights, and payment signature verification:

```bash
npm test
```

Expected output:
```text
🧪 Starting Dandiya Jodi Test Suite...

  ✅ PASS: Registration validator rejects applicants under 18 years old
  ✅ PASS: Registration validator accepts valid adult registration payload
  ✅ PASS: Matching algorithm computes high compatibility for complementary Indore pair
  ✅ PASS: Payment signature verification validates sandbox and valid signatures
  ✅ PASS: Contact sharing is restricted unless both users consent

================================
Results: 5 passed, 0 failed
================================
```

---

## 📡 REST API Reference

### Authentication
* `POST /api/auth/register` — Register user account
* `POST /api/auth/login` — User and staff login
* `POST /api/auth/logout` — Invalidate session
* `GET  /api/auth/me` — Get authenticated user & registration profile

### Registrations
* `POST /api/registrations` — Submit 7-step registration wizard
* `GET  /api/registrations/me` — Get logged-in user's registration
* `GET  /api/registrations/:id` — Get registration (Owner/Admin or safe public view)
* `PUT  /api/registrations/:id` — Update profile details
* `PATCH /api/registrations/consent` — Toggle contact sharing consent (`true` / `false`)

### Uploads
* `POST /api/uploads/profile` — Upload 1–5 profile pictures (Multer + Cloudinary/Disk)
* `POST /api/uploads/payment` — Upload payment screenshot

### Payments
* `POST /api/payments/create-order` — Create Razorpay order (paise backend pricing)
* `POST /api/payments/verify` — Verify Razorpay signature & finalize registration
* `POST /api/payments/manual` — Submit manual payment screenshot for review
* `GET  /api/payments/:registrationId` — Get payment records

### Matches
* `GET  /api/matches` — Get suggested matches for authenticated user
* `POST /api/matches/:id/consent` — Accept (`ACCEPT`) or decline (`DECLINE`) a match suggestion

### Administration (`/api/admin/*`, Requires Staff Role)
* `GET  /api/admin/dashboard` — Live counts, area distributions, plan charts
* `GET  /api/admin/registrations` — Server-side paginated list with multi-filters
* `GET  /api/admin/registrations/:id` — Full candidate details, photos, audit history
* `PATCH /api/admin/registrations/:id/status` — Approve, reject, or ban profile
* `GET  /api/admin/registrations/:id/matches` — Run matching algorithm against target
* `GET  /api/admin/matches` — List all matches and consent states
* `POST /api/admin/matches` — Create match suggestion (notifies both users)
* `PATCH /api/admin/matches/:id` — Update match status & share contacts safely
* `GET  /api/admin/payments` — View all transactions & screenshot queue
* `PATCH /api/admin/payments/:id` — Approve or reject payment receipt
* `GET  /api/admin/reports` — View safety violation incident reports
* `PATCH /api/admin/reports/:id` — Update incident status & resolution notes
* `GET  /api/admin/users` — User management (Super Admin & Admin)
* `PATCH /api/admin/users/:id` — Change role or ban/unban user
* `GET  /api/admin/audit-logs` — Administrative audit history

---

## 🛡️ Security & Privacy Implementation

1. **Never Trust Client Prices**: Plan amounts (`SINGLE_MATCH = 19900`, `DOUBLE_MATCH = 29900`) are strictly calculated on the server.
2. **Contact Shielding**: Phone numbers and WhatsApp numbers are never returned in public match responses (`toSafeMatchProfile()` excludes phone, email, and unapproved photos).
3. **Dual Affirmative Consent**: Contact sharing is only unlocked by administrators after **both** participants explicitly click "Yes, I'm Interested".
4. **Helmet & Rate Limiting**: Protection against brute-force attacks, XSS, and clickjacking.
5. **Audit Logging**: Every administrative action (profile approvals, bans, match creation, and receipt approvals) is permanently logged in the `AuditLog` collection.

---

## 🏗️ Production Build & Deployment

To generate an optimized frontend bundle:
```bash
npm run build
```
The compiled assets will be written to `client/dist/`.

For production server execution:
```bash
npm start
```

---

## ❤️ Credits
**Dandiya Jodi** is developed and operated by **Love Angle** for **Navratri 2026** in **Indore, Madhya Pradesh**.
Celebrate the divine rhythm. Dance with joy. Respect, consent, and safety come first. 💃🕺
