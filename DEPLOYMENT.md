# PersonaAI - Deployment Guide

## Current Setup Status

✅ **Infrastructure Ready**
- Frontend: React + Vite (Port 5173)
- Backend: Express + MongoDB (Port 5000)
- Database: MongoDB Atlas (Connected)
- Unified Dev Server: dev-server.js (Runs both)

✅ **Environment Configuration**
- Backend: `.env` file configured
- Frontend: `.env` file configured  
- API Proxy: Vite configured to proxy `/api` to backend

✅ **Authentication**
- JWT setup in backend
- Token management in frontend
- MongoDB user storage

✅ **API Integration**
- Tuya AI: Configured
- MongoDB: Connected to Atlas
- CORS: Enabled for local development

---

## Running Locally

### Quick Start (Recommended for v0 Preview)
```bash
npm run dev
```
This starts both frontend and backend through the unified dev-server.js

**Access**: http://localhost:5173

### Advanced Startup Options
```bash
# Run backend only
npm run dev:backend-only

# Run frontend only  
npm run dev:frontend-only

# Full setup with all dependencies
npm run setup
npm run dev
```

---

## Deployment to Vercel

### Step 1: Prepare for Deployment

The app is designed as a **monorepo** but needs to be deployed in separate services.

#### Frontend Deployment (Recommended)
```bash
# Build frontend
npm run build

# Output: frontend/dist/
```

#### Backend Deployment
Backend runs as a Node.js service (Express).

### Step 2: Deploy Frontend to Vercel

1. **Connect Repository**
   - Push code to GitHub
   - Go to vercel.com
   - Click "New Project"
   - Select your GitHub repo
   - Select "PersonaAI" or "personaAI"

2. **Configure Project**
   - Framework: Vite (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   Add in Vercel Dashboard > Settings > Environment Variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel handles the rest!

### Step 3: Deploy Backend

#### Option A: Deploy to Railway (Recommended)
1. Go to railway.app
2. Create new project
3. Connect GitHub repo
4. Select "Node.js"
5. Set environment variables:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=...
   TUYA_ACCESS_ID=...
   TUYA_ACCESS_SECRET=...
   TUYA_AGENT_ID=...
   TUYA_BASE_URL=https://openapi.tuyaus.com
   ```
6. Deploy!

#### Option B: Deploy to Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set \
  MONGO_URI=mongodb+srv://... \
  JWT_SECRET=personaai_secret \
  TUYA_ACCESS_ID=... \
  TUYA_ACCESS_SECRET=... \
  TUYA_AGENT_ID=... \
  TUYA_BASE_URL=https://openapi.tuyaus.com

# Deploy
git subtree push --prefix backend heroku main
# Or manually:
cd backend && git init && git add . && git commit -m "deploy" && heroku git:remote -a your-app-name && git push heroku main
```

#### Option C: Deploy to AWS EC2
1. Create EC2 instance (Ubuntu 22.04)
2. Install Node.js and MongoDB client
3. Clone repo
4. Install dependencies: `npm run setup`
5. Create `.env` with credentials
6. Start with PM2: `pm2 start backend/server.js --name personaai-backend`

---

## Environment Variables Needed

### For Backend (backend/.env)
```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb+srv://jershagracelin:jersha12345@cluster0.osu23dz.mongodb.net/?appName=Cluster0

# JWT
JWT_SECRET=personaai_super_secret_key_54321

# Tuya AI Integration
TUYA_ACCESS_ID=taqgtanpysymavkthxfh
TUYA_ACCESS_SECRET=6a2bc203f4d94a128e712915c29b4a84
TUYA_AGENT_ID=aipt_fd8ira2nsjcw
TUYA_BASE_URL=https://openapi.tuyaus.com
```

### For Frontend (frontend/.env)
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# In production, change to:
# VITE_API_URL=https://your-backend-url.com/api
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│         Vercel (Frontend)               │
│  ┌──────────────────────────────────┐   │
│  │   React + Vite App (5173)        │   │
│  │  • Login/Register Pages          │   │
│  │  • 3D Avatar Component           │   │
│  │  • Chat Interface                │   │
│  │  • Zustand State Management      │   │
│  └──────────────────────────────────┘   │
│              ↓ (HTTPS API Calls)        │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│    Railway/Heroku (Backend)             │
│  ┌──────────────────────────────────┐   │
│  │  Express.js Server (5000)        │   │
│  │  • /api/auth/* (Auth Routes)     │   │
│  │  • /api/chat/* (Chat Routes)     │   │
│  │  • JWT Middleware                │   │
│  │  • Tuya AI Integration           │   │
│  └──────────────────────────────────┘   │
│              ↓                          │
└─────────────────────────────────────────┘
             ↓
┌─────────────────────────────────────────┐
│   MongoDB Atlas (Cloud Database)        │
│  ┌──────────────────────────────────┐   │
│  │  Users Collection                │   │
│  │  ChatSessions Collection         │   │
│  │  Messages Collection             │   │
│  └──────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

---

## Post-Deployment Checklist

After deploying to production:

- [ ] Frontend loads without errors
- [ ] Backend API is accessible
- [ ] Login/Register pages work
- [ ] JWT tokens are issued and stored
- [ ] Chat interface responds
- [ ] 3D avatars render properly
- [ ] AI responses from Tuya work
- [ ] Messages are saved in database
- [ ] CORS errors are resolved
- [ ] SSL certificates are valid

---

## Troubleshooting Deployment

### Frontend Shows Blank Page
**Cause**: API URL misconfigured

**Fix**:
1. Check `VITE_API_URL` environment variable
2. Verify backend URL is correct in Vercel settings
3. Check browser console for errors

### API 404 Not Found
**Cause**: Backend routes not matching

**Fix**:
1. Verify backend is running
2. Check route paths in `backend/src/routes/`
3. Verify CORS is enabled in `backend/server.js`

### MongoDB Connection Error
**Cause**: Invalid connection string or IP whitelist

**Fix**:
1. Verify connection string in `.env`
2. Check IP whitelist in MongoDB Atlas
3. Ensure password doesn't have special chars (URL encode if needed)

### Tuya AI Not Responding
**Cause**: Invalid credentials or region

**Fix**:
1. Verify `TUYA_ACCESS_ID` and `TUYA_ACCESS_SECRET`
2. Check `TUYA_BASE_URL` region (`.com` vs `.cn`)
3. Ensure agent is published in Tuya console

### CORS Errors
**Cause**: Frontend and backend on different origins

**Fix**:
1. Backend CORS is configured for all origins locally
2. In production, update backend to allow your Vercel domain

### Cold Start Issues
**Cause**: Server takes time to wake up

**Fix**:
1. Use a service that doesn't sleep (Railway, not Heroku free tier)
2. Implement health check endpoint
3. Use uptime monitoring service

---

## Scaling for Production

### Phase 1: Basic Setup (Current)
- Single backend instance
- MongoDB Atlas shared cluster
- Vercel frontend

### Phase 2: Optimize
- Add CDN for static assets
- Implement caching (Redis)
- Database indexing
- Error tracking (Sentry)

### Phase 3: Scale
- Multiple backend instances (load balancer)
- MongoDB replica set
- WebSocket server for real-time chat
- Microservices architecture

---

## Monitoring & Maintenance

### Setup Monitoring
```bash
# Error tracking
npm install @sentry/node

# Performance monitoring
npm install newrelic
```

### Update Dependencies
```bash
npm outdated
npm update
npm audit fix
```

### Backup Database
```bash
# MongoDB Atlas automatically backs up
# Manual backup:
mongodump --uri "mongodb+srv://..."
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Heroku Docs**: https://devcenter.heroku.com
- **MongoDB Atlas**: https://docs.atlas.mongodb.com
- **Express.js**: https://expressjs.com/en/guide/routing.html

---

## Next Steps

1. **Test locally**: `npm run dev`
2. **Push to GitHub**: `git push origin main`
3. **Deploy frontend**: Connect to Vercel
4. **Deploy backend**: Use Railway or Heroku
5. **Update `VITE_API_URL`** in Vercel to backend URL
6. **Test end-to-end**: Try full registration/login flow
7. **Monitor**: Check logs and error tracking

---

**Your app is ready to deploy!** 🚀
