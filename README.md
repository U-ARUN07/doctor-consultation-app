# MediCare+ - Doctor Consultation Application

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://medicare-frontend-arun.vercel.app/)

MediCare+ is a comprehensive full-stack web application designed to facilitate seamless interactions between doctors and patients. It features appointment booking, video consultations, secure authentication, and profile management.

## 🚀 Features

- **User Roles**: Distinct dashboards and functionalities for **Doctors** and **Patients**.
- **Authentication**:
  - Secure Email/Password login & signup.
  - **Google OAuth** integration for easy access.
  - JWT-based session management.
- **Doctor Discovery**:
  - Browse doctors by specialization and category.
  - Search functionality.
  - Detailed doctor profiles with reviews and ratings.
- **Appointment Management**:
  - Book appointments with available doctors.
  - Manage availability (for doctors).
  - View upcoming and past appointments.
- **Video Consultation**: Real-time video calls integrated using **ZegoCloud**.
- **Payments**: Secure payment processing via **Razorpay**.
- **Responsive Design**: Modern, mobile-friendly UI built with **Tailwind CSS** and **Radix UI**.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/) (Icons)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Video Call**: [ZegoCloud UIKit](https://www.zegocloud.com/)
- **Utilities**: `date-fns`, `clsx`, `tailwind-merge`

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
- **Authentication**: [Passport.js](https://www.passportjs.org/) (Google Strategy), JWT, Bcryptjs
- **Validation**: `express-validator`
- **Security**: `helmet`, `cors`
- **Logging**: `morgan`

## 📂 Project Structure

```
doctor-consultation-app/
├── backend/                # Express.js API Server
│   ├── config/             # DB and Passport config
│   ├── middleware/         # Auth and Error handling middleware
│   ├── modal/              # Mongoose Models (Doctor, Patient, etc.)
│   ├── routes/             # API Routes
│   └── server.js           # Entry point
│
└── frontend/               # Next.js Client Application
    ├── src/
    │   ├── app/            # Next.js App Router Pages
    │   ├── components/     # Reusable UI Components
    │   ├── lib/            # Utilities and Types
    │   └── store/          # Zustand State Stores
    └── public/             # Static Assets
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URI)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd doctor-consultation-app
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/api/auth/google/callback

# Razorpay (Optional for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:8000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Start the frontend development server:
```bash
npm run dev
# App runs on http://localhost:3000
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **Auth** | `/api/auth/google` | Initiate Google Login |
| **Auth** | `/api/auth/doctor/login` | Doctor Login |
| **Auth** | `/api/auth/patient/login` | Patient Login |
| **Doctor** | `/api/doctor` | Get all doctors |
| **Doctor** | `/api/doctor/:id` | Get doctor details |
| **Patient** | `/api/patient/profile` | Get patient profile |
| **Appt** | `/api/appointment` | Book/Manage appointments |

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the ISC License.
