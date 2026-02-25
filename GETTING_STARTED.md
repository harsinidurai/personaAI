# PersonaAI - Getting Started Guide

Welcome! Let's get PersonaAI running on your local machine in minutes.

## What is PersonaAI?

An AI chat application where you talk to multiple personalities (Teacher, Student, Friend, Doctor) displayed as interactive 3D avatars. The AI is powered by Tuya AI Agent.

## 5-Minute Quick Start

### 1. Prerequisites Check

```bash
# Check Node.js version (need 16+)
node --version

# Check npm version (need 8+)
npm --version

# If missing, install from https://nodejs.org/
```

### 2. Start MongoDB

Choose one:

**Local MongoDB:**
```bash
mongod
# Runs on mongodb://127.0.0.1:27017
```

**Or Use MongoDB Atlas (Cloud):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster
3. Get connection string (copy for later)

### 3. Install Dependencies

Open terminal in project root:

```bash
# One command to install everything
npm run setup

# Or manually:
npm install
cd backend && npm install
cd ../frontend && npm install
```

### 4. Configure Backend

Edit `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personaai
JWT_SECRET=my_super_secret_key_12345

TUYA_ACCESS_ID=your_access_id
TUYA_ACCESS_SECRET=your_access_secret
TUYA_AGENT_ID=your_agent_id
TUYA_BASE_URL=https://openapi.tuyain.com
```

### 5. Start Everything

```bash
npm run dev
```

This will start:
- Backend on http://localhost:5000
- Frontend on http://localhost:5173

### 6. Open Your Browser

Visit: **http://localhost:5173**

Register → Login → Start chatting!

## Getting Tuya Credentials (10 mins)

1. Go to https://iot.tuya.com
2. Click "Sign Up" → Create free account
3. Verify email → Login
4. Click "Create Cloud Project"
5. Name: "PersonaAI"
6. Data Center: Choose your region (India recommended for low latency)
7. Create → Go to project settings
8. Click "API" tab
9. Generate Access ID & Secret
10. Create "AI Agent"
11. Select GPT-5-mini model
12. Publish agent
13. Copy agent ID
14. Paste all three values into `backend/.env`

## Directory Overview

```
PersonaAI/
├── backend/           → Express + MongoDB server
│   └── .env          → Your Tuya credentials go here
├── frontend/          → React + 3D avatar UI
├── QUICKSTART.md     → Fast setup (this file)
├── README.md         → Full documentation
├── DEPLOY.md         → Production deployment
└── PROJECT_SUMMARY.md → Architecture overview
```

## Common Commands

```bash
# Start everything
npm run dev

# Start just backend
npm run dev:backend

# Start just frontend
npm run dev:frontend

# Install dependencies
npm run setup

# Build for production
npm run build
```

## Troubleshooting

### "Cannot find module" error
```bash
cd backend && npm install
cd ../frontend && npm install
```

### "MongoDB connection failed"
```bash
# Make sure MongoDB is running
mongod

# Or use MongoDB Atlas cloud connection
```

### "Port 5000/5173 already in use"
```bash
# Kill the process using the port
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Tuya API error"
- Check credentials in `.env`
- Verify agent is published
- Check region is correct
- Reload page if just created

### "3D avatar not showing"
- Check browser console (F12)
- Ensure WebGL is enabled
- Try different browser

## File Locations

| File | What | Edit to |
|------|------|---------|
| `backend/.env` | Credentials | Add your Tuya keys |
| `frontend/src/pages/Login.jsx` | Login UI | Customize design |
| `backend/src/controllers/chatController.js` | AI behavior | Change persona prompts |
| `frontend/src/components/AvatarScene.jsx` | 3D avatar | Customize avatar |

## First Steps After Setup

1. **Register**: Create an account
2. **Login**: Use your credentials
3. **Select Persona**: Choose Teacher first
4. **Type Message**: "Hello, teach me Python"
5. **See Response**: AI responds as selected persona
6. **Try Others**: Switch between personas
7. **View History**: See past conversations in sidebar

## Feature Overview

- **Personas**: Teacher, Student, Friend, Doctor
- **Gender**: Choose male or female avatar
- **History**: All chats saved automatically
- **3D Avatar**: Interactive animated character
- **Real-time**: Instant AI responses

## Performance Tips

- Keep MongoDB running in background
- Don't run 100+ browser tabs
- Use Chrome/Firefox for best performance
- Clear browser cache if seeing old messages

## Security Notes

- Never commit `.env` files
- Change JWT_SECRET in production
- Use strong passwords
- Enable HTTPS when deployed
- Don't share Tuya credentials

## Next Steps

After everything works:

1. **Customize Personas**: Edit `backend/src/controllers/chatController.js`
2. **Change Colors**: Edit `frontend/src/components/Sidebar.jsx`
3. **Add Features**: Check `PROJECT_SUMMARY.md` for ideas
4. **Deploy**: Follow `DEPLOY.md` for production

## Video Walkthrough

[Coming soon - check back later]

## FAQ

**Q: Can I use this offline?**
A: MongoDB must run locally. Tuya requires internet connection.

**Q: Is this free?**
A: Yes! Tuya has free tier. MongoDB Atlas has free tier too.

**Q: Can I use different AI?**
A: Yes, edit `tuyaService.js` to use OpenAI/Anthropic instead.

**Q: How do I deploy?**
A: See `DEPLOY.md` for Vercel/Railway/Heroku guides.

**Q: Can I add more features?**
A: Yes! Project is fully customizable with clear architecture.

## Need Help?

1. Check error messages in console
2. Read the full `README.md`
3. Check `DEPLOY.md` for production issues
4. Review `PROJECT_SUMMARY.md` for architecture

## Success Checklist

- [ ] Node.js installed (16+)
- [ ] MongoDB running
- [ ] `backend/.env` has Tuya credentials
- [ ] `npm run dev` starts without errors
- [ ] Frontend loads at localhost:5173
- [ ] Can register new account
- [ ] Can login
- [ ] Can send messages
- [ ] AI responds (may need real Tuya credentials)
- [ ] Can switch personas
- [ ] Can view chat history

Once all checkboxes are done, you're ready to customize and deploy!

---

## Quick Reference

| Task | Command |
|------|---------|
| Start development | `npm run dev` |
| Start only backend | `npm run dev:backend` |
| Start only frontend | `npm run dev:frontend` |
| Install everything | `npm run setup` |
| Build for production | `npm run build` |

## Directory Tree

```
PersonaAI/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json (root)
├── README.md
├── QUICKSTART.md
├── GETTING_STARTED.md (this file)
├── DEPLOY.md
├── PROJECT_SUMMARY.md
└── .gitignore
```

Enjoy building with PersonaAI! 🚀
