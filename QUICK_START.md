# PersonaAI - Quick Start (2 Minutes)

## All Fixed ✅ All Working ✅ Ready to Deploy ✅

---

## Start the App (One Command)

```bash
npm run dev
```

**Then open**: http://localhost:5173

---

## What Happens

1. ✅ Starts backend (port 5000)
2. ✅ Starts frontend (port 5173)  
3. ✅ Frontend proxies API to backend
4. ✅ Shows full working app

**Wait**: 15-20 seconds first load

---

## Test It

1. Click "Register"
2. Enter:
   - Email: `test@example.com`
   - Password: `test123456`
3. Click "Register"
4. Click "Login"
5. Enter credentials
6. Click "Login"
7. See chat interface
8. Pick a persona (Teacher, Student, Friend, Doctor)
9. Type a message
10. Get AI response!

---

## Available Commands

```bash
npm run dev              # Both services ⭐
npm run dev:backend-only # Backend only
npm run dev:frontend-only # Frontend only
npm run setup            # Install deps
npm run build            # Build frontend
npm run build-all        # Build everything
```

---

## Project Structure

```
Frontend:   frontend/src/ (React + 3D)
Backend:    backend/src/ (Express)
Database:   MongoDB Atlas (Cloud) ✓
Config:     .env files (Ready) ✓
```

---

## What's Connected

✅ Frontend → Backend (API proxy)
✅ Backend → MongoDB (Atlas)
✅ Backend → Tuya AI (Configured)
✅ User Auth → JWT tokens
✅ Messages → Persistent DB

---

## Errors Fixed

- ✅ Package lock files (corrupted → fresh)
- ✅ Missing dependencies (added dev-server.js)
- ✅ Port conflicts (unified server)
- ✅ API proxy (Vite configured)
- ✅ Environment setup (all .env files)

---

## Deploy to Production

### Frontend (Vercel)
```bash
npm run build
# Upload frontend/dist/
```

### Backend (Railway/Heroku)
```bash
# Push to GitHub
# Connect Railway
# Deploy!
```

### Database
- Already on MongoDB Atlas
- Nothing to do ✓

---

## Features

- ✅ User authentication
- ✅ 3D avatars
- ✅ Chat interface
- ✅ AI responses
- ✅ Message history
- ✅ Multiple personas

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blank page | Wait 15s, refresh |
| API errors | Check backend logs |
| No avatar | Check browser console |
| Login fails | Check MongoDB connection |

---

## Documentation

- `README.md` - Full guide
- `DEPLOYMENT.md` - Deploy guide  
- `FIXED_AND_READY.md` - Status report
- `V0_PREVIEW_GUIDE.md` - v0 specific

---

## Now Run:

```bash
npm run dev
```

**That's it!** 🚀

Visit http://localhost:5173 and start chatting with AI! 🤖
