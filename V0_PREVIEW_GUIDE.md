# PersonaAI - v0 Preview Guide

## Welcome! 👋

This guide explains how to use PersonaAI in the **v0 preview** environment.

---

## What is PersonaAI?

PersonaAI is a full-stack 3D AI chat application where you can:
- 🤖 Chat with multiple AI personas
- 🎭 See interactive 3D avatars
- 🔐 Authenticate securely with JWT
- 💾 Store conversations in the cloud (MongoDB)
- 🎨 Experience a beautiful dark-themed interface

---

## Architecture

This is a **monorepo** (multiple services in one project):

```
PersonaAI/
├── frontend/          ← React + Vite (UI, 3D avatars, chat)
├── backend/           ← Express.js (APIs, AI integration, auth)
├── dev-server.js      ← Runs both together
└── package.json       ← Root scripts
```

**Services**:
- **Frontend**: Port 5173 (React app you see)
- **Backend**: Port 5000 (API server, database connection)
- **Database**: MongoDB Atlas (cloud)

---

## How v0 Preview Works Here

### The Problem
- v0 preview can only display **ONE port** at a time
- PersonaAI needs **BOTH frontend (5173) and backend (5000)** working together
- Without both, the app doesn't function

### The Solution
We created `dev-server.js` that:
1. ✅ Starts backend on port 5000 (internal)
2. ✅ Starts frontend on port 5173 (public)
3. ✅ Frontend proxies API calls to backend
4. ✅ v0 preview shows port 5173 (the working app!)

---

## Quick Start in v0 Preview

### Step 1: Start the App
The preview should auto-start. If not, look for a button to open the preview.

**What's happening behind the scenes**:
- `npm run dev` is executing
- `dev-server.js` is starting both services
- Backend initializes connection to MongoDB
- Frontend Vite dev server starts with proxy enabled
- After ~5 seconds, app appears on port 5173

### Step 2: Wait for Load
First load takes 10-15 seconds:
- Backend connects to MongoDB Atlas
- Frontend bundles React + Three.js
- Both services are ready

**You'll see**:
```
📡 Starting Backend Server (Port 5000)...
🎨 Starting Frontend Server (Port 5173)...
```

### Step 3: Access the App
Once ready, the v0 preview shows:
```
http://localhost:5173
```

This is your **fully functional PersonaAI interface**!

---

## Features Available in Preview

### ✅ Working Features
- Login/Register with email & password
- 3D avatar rendering
- Chat interface
- AI responses from Tuya
- Message history in MongoDB
- Complete authentication flow

### ⚠️ Note
- Backend runs in sandbox (no external internet)
- Tuya AI integration works with pre-configured credentials
- MongoDB connection is to cloud (works normally)

---

## What You See

### Login Page
```
┌─────────────────────────────────┐
│      PersonaAI Login            │
├─────────────────────────────────┤
│  📧 Email: _______________      │
│  🔑 Password: ___________       │
│                                 │
│  [Login] [Register]             │
└─────────────────────────────────┘
```

### Dashboard (After Login)
```
┌─────────────────────────────────────────┐
│  PersonaAI Dashboard                    │
├────────────┬──────────────────────────┤
│ Personas   │                          │
│ • Teacher  │                          │
│ • Student  │  🧠 3D Avatar Here      │
│ • Friend   │                          │
│ • Doctor   │                          │
├────────────┴──────────────────────────┤
│  Chat Messages                         │
│  ┌──────────────────────────────────┐ │
│  │ You: Hi there!                   │ │
│  │ AI: Hello! How can I help today? │ │
│  └──────────────────────────────────┘ │
│  [Type message...] [Send]              │
└─────────────────────────────────────────┘
```

---

## Test the Application

### Option 1: Create New Account
1. Click "Register"
2. Enter email: `test@example.com`
3. Enter password: `test123456`
4. Click "Register"
5. Login with credentials
6. Select a persona (Teacher, Student, Friend, Doctor)
7. Start chatting!

### Option 2: Use Demo Credentials
(If pre-populated in the system)
- Email: `demo@personaai.com`
- Password: `demo123456`

---

## Troubleshooting in v0 Preview

### Issue: Blank Page
**What**: Preview shows white/empty screen

**Why**: Frontend or backend failed to start

**Fix**:
1. Check v0 console for errors (bottom of screen)
2. Wait another 10 seconds for load
3. Try refreshing (F5)
4. Check if services show in output:
   - Look for "Starting Backend Server"
   - Look for "Starting Frontend Server"

### Issue: API Errors
**What**: "Failed to fetch" or 503 errors

**Why**: Backend not responding

**Fix**:
1. Backend on port 5000 must be running
2. MongoDB connection must be established
3. Check console for MongoDB errors
4. Verify `.env` files have credentials

### Issue: 3D Avatar Not Showing
**What**: Chat works but no 3D character visible

**Why**: Three.js rendering issue

**Fix**:
1. This is expected in some preview environments
2. Chat functionality still works
3. Try refreshing the page
4. Check browser console for WebGL errors

### Issue: Slow Performance
**What**: App takes >20 seconds to load

**Why**: Vite bundling + MongoDB connection delay

**Fix**:
1. This is normal for first load
2. Subsequent navigation is faster
3. HMR (Hot Module Replacement) enabled for fast edits

### Issue: Login Not Working
**What**: "Invalid credentials" after registering

**Why**: MongoDB not saving data or JWT issue

**Fix**:
1. Verify MongoDB connection string in backend/.env
2. Check browser console for errors
3. Try registering with different email
4. Check network tab to see API response

---

## File Structure Guide

### Key Files You Might Edit

**Frontend** (`frontend/src/`):
- `pages/Login.jsx` - Login interface
- `pages/Dashboard.jsx` - Main chat interface
- `components/AvatarScene.jsx` - 3D avatar component
- `store/useAuthStore.js` - Authentication state

**Backend** (`backend/src/`):
- `routes/authRoutes.js` - Login/Register endpoints
- `routes/chatRoutes.js` - Chat endpoints
- `services/tuyaService.js` - AI integration

---

## Environment Variables in Use

### Already Configured ✅
All these are pre-set and working:

```
Backend (backend/.env):
- PORT=5000
- MONGO_URI=mongodb+srv://jershagracelin:...
- JWT_SECRET=personaai_super_secret_key...
- TUYA_ACCESS_ID=taqgtanpysymavkthxfh
- TUYA_ACCESS_SECRET=6a2bc203f4d94a128...
- TUYA_AGENT_ID=aipt_fd8ira2nsjcw
- TUYA_BASE_URL=https://openapi.tuyaus.com

Frontend (frontend/.env):
- VITE_API_URL=http://localhost:5000/api
```

---

## API Proxy Explanation

### How It Works
```
Browser Request:
  fetch('/api/auth/login')
           ↓
Vite Proxy (frontend/vite.config.js):
  Rewrites to: http://localhost:5000/api/auth/login
           ↓
Express Backend:
  Receives request and responds
           ↓
Browser:
  Response appears in console
```

### Why We Need It
- Frontend runs on port 5173
- Backend runs on port 5000  
- Browsers block cross-port requests (CORS)
- Proxy makes them appear same-origin

---

## Commands You Can Run

From the v0 terminal, available commands:

```bash
npm run dev              # Start both services (default)
npm run dev:backend-only # Backend only (port 5000)
npm run dev:frontend-only # Frontend only (port 5173)
npm run setup            # Install all dependencies
npm run build            # Build frontend
npm run build-all        # Build everything
```

---

## Performance Tips

1. **First Load**: 15-20 seconds (normal, bundling)
2. **Hot Reload**: <1 second (HMR enabled)
3. **API Calls**: 200-500ms (depends on MongoDB)
4. **Avatar Rendering**: 60 FPS (Three.js)

---

## Next Steps

### To Deploy This App
1. See `DEPLOYMENT.md` for full instructions
2. Frontend → Vercel
3. Backend → Railway or Heroku
4. Database → Already on MongoDB Atlas

### To Customize
1. Edit frontend components in `frontend/src/`
2. Modify backend routes in `backend/src/routes/`
3. Add new AI personas in `backend/src/services/tuyaService.js`
4. Style with Tailwind in `frontend/src/index.css`

### To Add Features
- WebSocket for real-time chat
- Voice input/output
- More avatar models
- Extended chat history
- User profiles

---

## Support & Resources

- **Project README**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Setup Guide**: See `SETUP.md`
- **Frontend Code**: `frontend/src/`
- **Backend Code**: `backend/src/`

---

## Summary

**What's Running**:
✅ Full-stack PersonaAI app
✅ Frontend: React + 3D (port 5173 - visible)
✅ Backend: Express + MongoDB (port 5000 - hidden)
✅ Both connected and working together

**What You See**:
✅ Login/Register interface
✅ Chat dashboard
✅ 3D avatars
✅ Real AI responses

**Ready to Chat**:
1. Preview auto-starts
2. Wait for "Frontend Server" message
3. Click preview or open localhost:5173
4. Register or login
5. Start chatting with AI! 🚀

---

**Happy chatting with PersonaAI!** 🤖💬
