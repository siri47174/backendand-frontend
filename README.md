# Sendo Driver Management App

A full-stack Transport Management System (TMS) built with React (frontend) and Node.js/Express/MongoDB (backend).

---

## Quick Start

### 1. Install Dependencies
```bash
npm run install
```
This installs both backend and frontend dependencies.

### 2. Configure Environment
Edit `backend/.env` — the MongoDB URI is already configured. Fill in:
```
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
JWT_SECRET_KEY=any_random_secret_string
```

### 3. Start the App
```bash
npm start
```
This starts both backend (port 5001) and frontend (port 3001) simultaneously.

Or start individually:
```bash
npm run start:backend   # starts backend on :5001
npm run start:frontend  # starts frontend on :3001
```

### 4. Open in Browser
```
http://localhost:3001
```
**No login required** — the app opens directly to the dashboard.

---

## Features

### Vehicle Management
| Page | Description |
|------|-------------|
| Vehicle Onboarding | Register new vehicles with documents |
| Truck Maintenance | Track regular/tyre/RTO/material maintenance with 4-tab form |
| Documents | Track RC, insurance, fitness, permits with expiry alerts |
| Diesel | Diesel fill-up tracking |
| Expenses | Vehicle and other expenses with tab view |
| Oil Service | Oil change records |
| Spare Parts | Spare parts usage tracking |
| Vehicle Tyre | Tyre management |
| Live Fleet Tracking | Real-time GPS fleet map |

### Driver Management
| Page | Description |
|------|-------------|
| Driver Onboarding | Complete driver registration with documents |
| Attendance | Mark and approve driver attendance |
| Attendance Records | Historical attendance with reports |
| Leave Requests | Admin approval of driver leaves |
| Driver Advance | Request and track salary advances |
| Salary | Payroll processing and payslips |
| Deduction | Driver deduction tracking |
| Timesheet | Duty start/stop timer with records |
| Live Tracking | Real-time driver GPS location |
| Vehicle Tracking | Track vehicles on fleet map |

### Vendor Management
| Page | Description |
|------|-------------|
| Vendor Onboarding | Register new transport vendors |
| Trip Sheet | Full trip management with freight calculation |
| Advance | Vendor advance payments |
| Deductions | Deduction tracking per trip |
| Payments | Payment processing with UTR tracking |

### Customer Management
| Page | Description |
|------|-------------|
| Customer Onboarding | Register new customers |
| Agreements | Contract management with rate details |
| Invoice | Invoice creation with GST calculation |
| GST Filing | GST entry tracking with filing status |
| Payment Status | Payment collection with balance tracking |
| MIS Reports | Management dashboard with profit/loss |

### Expense Management
| Page | Description |
|------|-------------|
| Vehicle Expenses | Track all vehicle-related costs |
| Other Expenses | Office and miscellaneous expenses |

---

## Backend API Routes

| Prefix | File | Key Endpoints |
|--------|------|---------------|
| `/api` | AuthRouter.js | login, logout, forgot-password, reset-password |
| `/onboarding` | OnboardingRouters.js | drivers, vehicles, timesheet |
| `/vehicle` | VehicleRoute.js | diesel, oil-service, spare-parts, truck-maintenance, expenses, other-expenses |
| `/trip` | TripRouter.js | start-trip, stop-trip, trip-sheet |
| `/advance` | AdvanceApproval.js | vendor-advance, vendor-deduction, vendor-payment |
| `/customer` | CustomerRouter.js | invoices, payment-status, agreements, gst |
| `/attendance` | AttendanceRoute.js | attendance records |
| `/home` | Home.js | vehicle history, parking |

---

## Tech Stack
- **Frontend**: React 18, React Router v6, Axios, Recharts, styled-components
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, Multer, JWT
- **Database**: MongoDB Atlas (cloud-hosted, URI in .env)
