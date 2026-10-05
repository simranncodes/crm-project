# LeadDesk Mini

A full-stack Lead Management System built with the MERN stack (MongoDB, Express, React, Node.js). Visitors submit leads through a modern SaaS landing page; admins log in securely to search, filter, and manage them from a dashboard.

## Live Demo

- Frontend: _add your Vercel URL after deployment_
- Backend API: _add your Render URL after deployment_

## Features

- **Public landing page** — hero, features, why-us, how-it-works, testimonials, and CTA sections, fully responsive with subtle animations.
- **Lead capture form** — client-side validation (React Hook Form) and server-side validation (express-validator + Mongoose), so invalid data can never reach the database even if the client is bypassed.
- **Secure admin authentication** — bcrypt-hashed passwords, JWTs stored in httpOnly cookies (not localStorage), protected API routes and protected frontend routes.
- **Admin dashboard** — live stats cards (total / new / contacted / closed), searchable & filterable lead table, pagination, and an inline status-update dropdown.
- **Robust error handling** — centralized Express error handler normalizes validation errors, duplicate-key errors, invalid IDs, and JWT errors into consistent JSON responses; the app never crashes on bad input.
- **Polished UX** — loading screens, skeleton loading states, empty states, error states, toast notifications, and a logout confirmation dialog.

## Tech Stack

**Frontend:** React 19, Vite, React Router DOM, Tailwind CSS, Axios, React Hook Form, React Hot Toast, Lucide Icons
**Backend:** Node.js, Express.js
**Database:** MongoDB Atlas + Mongoose
**Auth:** JWT, bcryptjs, cookie-parser (httpOnly cookies)
**Validation:** React Hook Form (client), express-validator + Mongoose schema validation (server)

## Folder Structure

```
leaddesk-mini/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/      # auth, lead, dashboard controllers
│   ├── middleware/        # auth, error handler, 404, async wrapper
│   ├── models/            # Lead, Admin (Mongoose schemas)
│   ├── routes/             # authRoutes, leadRoutes, dashboardRoutes
│   ├── utils/               # generateToken, seedAdmin script
│   ├── validators/          # express-validator rule sets
│   ├── app.js                # Express app + middleware wiring
│   └── server.js              # Entry point, connects DB, starts server
│
└── frontend/
    └── src/
        ├── api/            # Axios instance with interceptors
        ├── components/     # Navbar, Footer, LeadForm, LeadTable, Sidebar, StatsCards, ui/*
        ├── context/         # AuthContext (Context API)
        ├── pages/            # LandingPage, Login, Dashboard, NotFound
        ├── routes/            # ProtectedRoute
        ├── App.jsx
        └── main.jsx
```

## Local Installation

### Prerequisites
- Node.js 18+
- A MongoDB Atlas cluster (or local MongoDB instance)

### 1. Clone and install
```bash
git clone <your-repo-url>
cd leaddesk-mini

cd backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

**backend/.env** (copy from `backend/.env.example`):
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/leaddesk
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@leaddesk.com
ADMIN_PASSWORD=Admin@12345
```

**frontend/.env** (copy from `frontend/.env.example`):
```
VITE_API_URL=http://localhost:5000/api
```

### 3. Seed the admin account
```bash
cd backend
npm run seed:admin
```
This creates the first admin login using `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.

### 4. Run both servers
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```
Visit `http://localhost:5173`.

## Environment Variables Reference

| Variable | Location | Description |
|---|---|---|
| `PORT` | backend | Port the Express server listens on |
| `MONGO_URI` | backend | MongoDB Atlas connection string |
| `JWT_SECRET` | backend | Secret used to sign JWTs — keep this private |
| `JWT_EXPIRES_IN` | backend | JWT lifetime (e.g. `7d`) |
| `CLIENT_URL` | backend | Deployed frontend URL, used for CORS |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | backend | Used only by the `seed:admin` script |
| `VITE_API_URL` | frontend | Base URL of the deployed backend API |

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Authenticate admin, sets httpOnly JWT cookie |
| POST | `/api/auth/logout` | Private | Clears the auth cookie |
| GET | `/api/auth/me` | Private | Returns the currently authenticated admin |
| POST | `/api/leads` | Public | Submit a new lead (landing page form) |
| GET | `/api/leads` | Private | List leads — supports `page`, `limit`, `search`, `status` query params |
| PATCH | `/api/leads/:id` | Private | Update a lead's status |
| GET | `/api/dashboard/stats` | Private | Aggregate counts (total/new/contacted/closed) |
| GET | `/api/health` | Public | Health check |

## Deployment Guide

### Backend → Render
1. Push this repo to GitHub.
2. Create a new **Web Service** on Render, pointing to the `backend/` directory.
3. Build command: `npm install` — Start command: `npm start`.
4. Add the environment variables listed above (use your production `CLIENT_URL` — the Vercel URL).
5. Set `NODE_ENV=production`.

### Frontend → Vercel
1. Import the repo into Vercel, set the root directory to `frontend/`.
2. Framework preset: Vite.
3. Add environment variable `VITE_API_URL` pointing to your Render backend, e.g. `https://your-api.onrender.com/api`.
4. Deploy. The included `vercel.json` handles client-side routing rewrites.

### Database → MongoDB Atlas
1. Create a free cluster on MongoDB Atlas.
2. Whitelist `0.0.0.0/0` (or Render's IPs) under Network Access.
3. Create a database user and copy the connection string into `MONGO_URI`.

## Screenshots

_Add screenshots here after running the app locally:_
- `docs/screenshot-landing.png` — Landing page
- `docs/screenshot-login.png` — Admin login
- `docs/screenshot-dashboard.png` — Admin dashboard

## Future Improvements

- Role-based access control (multiple admin roles/permissions)
- Email notifications on new lead submission
- CSV export of leads
- Rich lead detail view with notes/activity timeline
- Dark mode toggle (color tokens are already scaffolded via Tailwind's `darkMode: 'class'`)
- Automated tests (Jest/Supertest for backend, Vitest/RTL for frontend)
- Rate limiting on public endpoints (e.g. `express-rate-limit` on `/api/leads` POST)

## License

Built as an internship qualification assignment. Free to use and adapt.
