# Medical Appointment Booking

StayHealthy is a non-profit healthcare platform that helps patients in remote and underserved communities find doctors and request accessible medical appointments online.

## Features

- Search doctors by speciality and review availability.
- Book and cancel appointments, with the latest appointment visible throughout the app.
- Create patient or doctor accounts, sign in, and edit profile details.
- Request an instant consultation and submit a patient review.
- Responsive, accessible interface with mobile navigation.

## Tech Stack

- Frontend: React, Vite, React Router, plain CSS.
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs.

## Setup

Requirements: Node.js 20.19+ (or 22.12+). A MongoDB installation or Atlas account is not needed for local development.

### Frontend

```bash
npm install
npm run dev
```

Set `VITE_API_URL` in a root `.env` file when the API is not available at `http://localhost:8181`.

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

`MONGO_URI` is optional for local development. Leave it empty to use a temporary in-memory MongoDB, or provide a MongoDB connection string to use a persistent database. Placeholder Atlas URIs containing `CLUSTER` or `USERNAME` also fall back to in-memory MongoDB. Set `JWT_SECRET` in `backend/.env`; the API defaults to port `8181`.

## Build

```bash
npm run build
```

The production frontend is generated in `dist/`; serve that directory with a static host configured to fall back to `index.html` for client-side routes.

## Environment Variables

Backend (`backend/.env`):

| Variable | Description |
| --- | --- |
| `MONGO_URI` | Optional MongoDB connection string; unset or empty uses in-memory MongoDB locally |
| `JWT_SECRET` | Secret used to sign access tokens |
| `PORT` | API port (defaults to `8181`) |

Frontend (optional root `.env`):

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | Backend origin (defaults to `http://localhost:8181`) |
