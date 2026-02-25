# PersonaAI Setup Checklist

Use this checklist to track your setup progress.

## Pre-Setup Requirements

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 8+ installed (`npm --version`)
- [ ] Git installed (for version control)
- [ ] Text editor (VS Code, Sublime, etc.)
- [ ] Terminal/Command Prompt open

## Get Tuya Credentials (10 minutes)

- [ ] Go to https://iot.tuya.com
- [ ] Create account or login
- [ ] Create new Cloud Project
- [ ] Choose data center (Asia/India recommended)
- [ ] Create AI Agent
- [ ] Select GPT-5-mini model
- [ ] Publish the agent
- [ ] Copy Access ID
- [ ] Copy Access Secret
- [ ] Copy Agent ID
- [ ] Note your Base URL (e.g., https://openapi.tuyain.com)

## Setup MongoDB

Choose ONE:

### Option A: Local MongoDB
- [ ] Install MongoDB Community Edition
- [ ] Start MongoDB service (`mongod`)
- [ ] MongoDB connection string: `mongodb://127.0.0.1:27017/personaai`

### Option B: MongoDB Atlas (Cloud)
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create account
- [ ] Create cluster (Free tier is fine)
- [ ] Verify email
- [ ] Create database user
- [ ] Add your IP to whitelist
- [ ] Copy connection string
- [ ] Note connection string

## Clone/Extract Project

- [ ] Extract PersonaAI zip or clone from GitHub
- [ ] Open terminal in project root
- [ ] Verify you see `backend/`, `frontend/`, and markdown files

## Install Dependencies

Run in terminal:
```bash
npm run setup
```

- [ ] No errors during installation
- [ ] Both `backend/node_modules` and `frontend/node_modules` exist

## Configure Backend

- [ ] Open `backend/.env` (create if doesn't exist)
- [ ] Set `PORT=5000`
- [ ] Set `MONGO_URI` (your MongoDB connection)
- [ ] Set `JWT_SECRET=your_random_secret_key`
- [ ] Set `TUYA_ACCESS_ID=your_id`
- [ ] Set `TUYA_ACCESS_SECRET=your_secret`
- [ ] Set `TUYA_AGENT_ID=your_agent_id`
- [ ] Set `TUYA_BASE_URL=https://openapi.tuyain.com`
- [ ] Save file
- [ ] No spaces around `=` signs

## Start MongoDB

If using local MongoDB:
- [ ] Open new terminal window
- [ ] Run `mongod`
- [ ] See "Waiting for connections on port 27017"
- [ ] Keep this window open

## Start Backend

In original terminal:
```bash
npm run dev:backend
```

- [ ] See "Backend running on http://localhost:5000"
- [ ] No errors in console
- [ ] Keep running

## Start Frontend (New Terminal)

```bash
npm run dev:frontend
```

- [ ] See "Local: http://localhost:5173"
- [ ] No errors in console
- [ ] Keep running

## Test Frontend

- [ ] Open http://localhost:5173 in browser
- [ ] See PersonaAI login page
- [ ] Design looks good (dark theme)

## Create Test Account

- [ ] Click "Register"
- [ ] Enter name: "Test User"
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "password123"
- [ ] Confirm password: "password123"
- [ ] Click "Register"
- [ ] See success message

## Login

- [ ] Back at login page
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "password123"
- [ ] Click "Login"
- [ ] Redirected to Dashboard

## Dashboard Loaded

- [ ] Left sidebar visible (Persona selector, history)
- [ ] Middle section (Chat window)
- [ ] Right side (3D Avatar)
- [ ] No console errors

## Test Chat

- [ ] Persona selected (Teacher)
- [ ] Gender selected (Female)
- [ ] Type message: "Hello"
- [ ] Click Send or press Enter
- [ ] See loading animation
- [ ] Response appears in chat
- [ ] No errors in console

## Switch Personas

- [ ] Change persona to "Student"
- [ ] Send message: "Hi there"
- [ ] See Student response
- [ ] Try "Friend" persona
- [ ] Try "Doctor" persona
- [ ] All work without errors

## Test Gender Toggle

- [ ] Change gender to "Male"
- [ ] Send new message
- [ ] Female avatar appears but label says Male
- [ ] Change back to "Female"

## Test Chat History

- [ ] Check left sidebar
- [ ] See previous chats listed
- [ ] Click on old chat
- [ ] Messages load from history
- [ ] Correct persona shown

## Test New Chat

- [ ] Click "+ New Chat" button
- [ ] Chat window clears
- [ ] Start new conversation
- [ ] New chat appears in history

## Test Logout

- [ ] Click "Logout" button (bottom of sidebar)
- [ ] Redirected to login page
- [ ] Can login again
- [ ] Session persists (chats still there)

## API Testing (Optional)

Test backend API directly:

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"User","email":"user2@test.com","password":"pass123"}'
```
- [ ] Get success message with userId

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
- [ ] Get token and user data

### Test Chat (need token from login)
```bash
curl -X POST http://localhost:5000/api/chat/send \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message":"Hello","persona":"Teacher","gender":"female"}'
```
- [ ] Get AI response

## Performance Check

- [ ] Frontend loads in < 2 seconds
- [ ] Responses appear in < 3 seconds
- [ ] No lag when typing
- [ ] 3D avatar renders smoothly
- [ ] Switching personas is instant

## Code Review (Optional)

- [ ] Backend structure looks clean
- [ ] Frontend components are organized
- [ ] `.env` has all required variables
- [ ] No sensitive data in code files

## Documentation Review

- [ ] START_HERE.md is helpful
- [ ] GETTING_STARTED.md is clear
- [ ] README.md has all needed info
- [ ] DEPLOY.md covers deployment

## Final Success Check

- [ ] All items above are checked
- [ ] Application runs without errors
- [ ] All features work as expected
- [ ] No sensitive data exposed
- [ ] Ready to customize or deploy

## Troubleshooting Completed

- [ ] Tried all troubleshooting steps if issues occurred
- [ ] Documented any custom configurations
- [ ] Made notes on what didn't work

## Ready for Next Steps

Choose one:

- [ ] **CUSTOMIZE**: Edit personas, colors, features
- [ ] **DEPLOY**: Follow DEPLOY.md to go live
- [ ] **ENHANCE**: Add voice, better 3D, more features
- [ ] **MAINTAIN**: Keep running locally, use regularly

## Success! 🎉

You now have:
- ✅ Running backend (Node.js + Express + MongoDB)
- ✅ Running frontend (React + Vite)
- ✅ 3D avatar system
- ✅ AI chat with multiple personas
- ✅ User authentication
- ✅ Persistent chat history

## Next Actions

1. **Customize Personas**
   - Edit `backend/src/controllers/chatController.js`
   - Change prompts for each persona
   - Test responses

2. **Update Styling**
   - Edit TailwindCSS classes
   - Change colors in components
   - Customize UI to your brand

3. **Add Features**
   - Voice input/output
   - Better 3D model
   - More personas
   - Quiz mode
   - Real-time chat

4. **Deploy**
   - Follow DEPLOY.md
   - Choose platform (Vercel, Railway, Heroku)
   - Share with the world!

## Questions?

1. Check console for error messages
2. Review GETTING_STARTED.md
3. Read troubleshooting in README.md
4. Check browser DevTools (F12)
5. Search backend logs

## Keep It Running

```bash
# Daily startup:
mongod                    # Terminal 1
npm run dev              # Terminal 2 (in project root)

# Visit: http://localhost:5173
```

---

**Congratulations!** You've successfully set up PersonaAI! 🚀
