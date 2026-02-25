# PersonaAI - Setup Guide

## Overview
PersonaAI is a 3D AI Chat Application with multiple personas powered by Tuya AI.

### Architecture
- **Frontend**: React + Vite + Three.js (Port 5173)
- **Backend**: Express + MongoDB (Port 5000)
- **Database**: MongoDB (Cloud - Cluster0)

## Environment Setup

### Backend Configuration (Already Set)
Location: `backend/.env`
- MongoDB URI: Connected to Cluster0
- Tuya AI Integration: Configured
- JWT Secret: Set

### Frontend Configuration (Already Set)
Location: `frontend/.env`
- API URL: http://localhost:5000/api
- Vite Proxy: Configured to forward /api requests to backend

## Starting the Application

### Option 1: Run Both (Development)
```bash
npm run dev
```
This runs both backend and frontend using the start.js script.

### Option 2: Run Frontend Only (v0 Preview)
```bash
npm run dev:frontend-only
cd frontend && npm run dev
```
The frontend will proxy API calls to localhost:5000 if backend is running.

### Option 3: Run Backend Only
```bash
npm run dev:backend
cd backend && npm run dev
```

## Features
- ✅ User Authentication (Register/Login)
- ✅ 3D Avatar Rendering (Three.js)
- ✅ AI Chat with Multiple Personas (Tuya AI)
- ✅ Message History
- ✅ Real-time Chat Interface

## Credentials
Once registered, you can log in with your email and password.

### Test Account (After Setup)
- Email: test@example.com
- Password: test123456

## Technologies
- React 18+
- Vite
- Three.js / React Three Fiber
- Express.js
- MongoDB
- JWT Authentication
- Tuya AI Integration

## Troubleshooting

### Backend Connection Issues
If the frontend shows connection errors:
1. Ensure backend is running: `npm run dev:backend`
2. Check MongoDB connection in `backend/.env`
3. Verify API URL in `frontend/.env`

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Change `port` in `frontend/vite.config.js`

## Deployment
- Frontend: Vercel
- Backend: Heroku, Railway, or similar
- Database: MongoDB Atlas

For more details, check individual package.json files in `/backend` and `/frontend`.
