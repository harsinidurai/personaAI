# START HERE - PersonaAI

Welcome to PersonaAI! This is your entry point to the project.

## What is PersonaAI?

A full-stack AI chat application where you talk to interactive 3D animated AI personas (Teacher, Student, Friend, Doctor) powered by Tuya AI.

## Choose Your Path

### 🚀 I want to START IMMEDIATELY
→ Read **GETTING_STARTED.md** (10 minutes to running)

### ⚡ I want the QUICK VERSION  
→ Read **QUICKSTART.md** (5 minutes)

### 📚 I want to understand the FULL PROJECT
→ Read **PROJECT_SUMMARY.md** (overview of everything)

### 🌍 I want to DEPLOY to production
→ Read **DEPLOY.md** (step-by-step deployment)

### 📖 I need COMPLETE DOCUMENTATION
→ Read **README.md** (everything in detail)

## File Guide

```
START_HERE.md ← You are here
├── GETTING_STARTED.md ← Best for beginners (START HERE)
├── QUICKSTART.md ← Ultra-fast setup guide
├── PROJECT_SUMMARY.md ← Project overview
├── README.md ← Full documentation
├── DEPLOY.md ← Production deployment
└── backend/ + frontend/ ← Source code
```

## 30-Second Overview

**Stack:**
- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite + TailwindCSS  
- 3D: React Three Fiber
- AI: Tuya AI Agent

**Features:**
- Multiple AI Personas (Teacher/Student/Friend/Doctor)
- 3D animated avatar
- Chat history with persistence
- User authentication
- Gender selection for avatars

## 2-Minute Setup

```bash
# 1. Install dependencies
npm run setup

# 2. Configure backend/.env with your Tuya credentials

# 3. Start everything
npm run dev

# 4. Open http://localhost:5173 in browser
```

## Checklist

- [ ] Node.js 16+ installed
- [ ] MongoDB running (local or cloud)
- [ ] Tuya account created
- [ ] Backend/.env configured
- [ ] `npm run dev` works
- [ ] Frontend loads
- [ ] Can login & chat

## Recommended Reading Order

1. **This file** (you're reading it!) - 1 min
2. **GETTING_STARTED.md** - 5 mins
3. **Try it** - run `npm run dev` - 2 mins
4. **PROJECT_SUMMARY.md** - 5 mins
5. **README.md** if you need details - 10 mins

## What to Do First

### Option A: Get it Running (Recommended)
1. Open terminal
2. Run: `npm run setup`
3. Edit: `backend/.env` (add Tuya credentials)
4. Run: `npm run dev`
5. Open: http://localhost:5173

### Option B: Learn First
1. Read GETTING_STARTED.md
2. Read PROJECT_SUMMARY.md
3. Understand the architecture
4. Then run it

### Option C: Production Ready
1. Read README.md for full docs
2. Read DEPLOY.md for deployment
3. Setup + Deploy directly

## Key Files to Know

| File | Purpose |
|------|---------|
| `backend/server.js` | Backend entry point |
| `backend/.env` | Credentials (create this!) |
| `backend/src/controllers/chatController.js` | AI behavior/personas |
| `frontend/src/App.jsx` | Frontend entry point |
| `frontend/src/components/AvatarScene.jsx` | 3D avatar display |
| `frontend/src/components/ChatWindow.jsx` | Chat interface |

## Common Questions

**Q: Where do I put my Tuya credentials?**
A: In `backend/.env` file

**Q: How long to setup?**
A: 5-10 minutes if you have Node.js and MongoDB

**Q: Do I need to code?**
A: No, just configure `.env` and run `npm run dev`

**Q: Can I customize it?**
A: Yes! See PROJECT_SUMMARY.md for ideas

**Q: How do I deploy?**
A: See DEPLOY.md for complete guides

## Troubleshooting

### Setup fails
```bash
# Try:
rm -rf node_modules
npm run setup
```

### MongoDB not working
```bash
# Install or start MongoDB:
mongod
```

### Port already in use
```bash
# Change PORT in backend/.env or kill process
```

### Chat doesn't work
- Check Tuya credentials in `.env`
- Check MongoDB is running
- Check backend logs for errors

See full troubleshooting in GETTING_STARTED.md or README.md

## Tech Stack Overview

```
Frontend (Port 5173)
├── React 18
├── Vite
├── TailwindCSS
├── React Router
├── Zustand (state)
├── Axios (API)
└── React Three Fiber (3D)

Backend (Port 5000)
├── Express.js
├── MongoDB
├── JWT (auth)
├── Axios (HTTP)
└── Tuya AI API (integration)

Database
└── MongoDB (local or Atlas)
```

## Next Steps After Setup

### Customize
- Change persona names
- Modify AI behavior
- Update colors/styling
- Add new features

### Deploy
- Backend to Vercel/Railway
- Frontend to Vercel/Netlify
- See DEPLOY.md for guides

### Enhance
- Add voice input/output
- Improve 3D avatar
- Add more personas
- Enable real-time chat

## Resources

- [Node.js](https://nodejs.org/) - Install Node.js
- [MongoDB](https://www.mongodb.com/) - Database
- [Tuya IoT](https://iot.tuya.com/) - AI Agent
- [React Docs](https://react.dev/)
- [Vercel](https://vercel.com/) - Deployment

## Support

Stuck? Follow this order:
1. Check error message in console
2. Read GETTING_STARTED.md
3. Read troubleshooting section
4. Check README.md for detailed docs
5. Review PROJECT_SUMMARY.md

## Ready?

Choose one:

```bash
# 🚀 GET STARTED NOW
npm run setup
# then read GETTING_STARTED.md

# 📚 READ FIRST, CODE LATER
# Open GETTING_STARTED.md in your editor

# 🌍 PRODUCTION READY
# Read DEPLOY.md for deployment steps
```

---

**Happy building with PersonaAI!** 🎉

For immediate setup: → **GETTING_STARTED.md**
