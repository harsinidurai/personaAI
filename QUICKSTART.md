# PersonaAI - Quick Start Guide

Get PersonaAI running in 5 minutes!

## Step 1: Download & Extract

Extract this project to your desired location.

## Step 2: Install MongoDB (if not already installed)

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Windows
Download from: https://www.mongodb.com/try/download/community

### Linux
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

### Or Use MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Use in `backend/.env` as `MONGO_URI`

## Step 3: Get Tuya Credentials

1. Go to https://iot.tuya.com/
2. Create a free account or login
3. Create a new Cloud Project
4. Create an AI Agent
5. Copy your:
   - Access ID
   - Access Secret
   - Agent ID

## Step 4: Setup Backend

```bash
cd backend
npm install
```

Create `.env` file with your credentials:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personaai
JWT_SECRET=change_this_to_something_random_and_long

TUYA_ACCESS_ID=your_access_id_here
TUYA_ACCESS_SECRET=your_access_secret_here
TUYA_AGENT_ID=your_agent_id_here
TUYA_BASE_URL=https://openapi.tuyain.com
```

Start backend:

```bash
npm run dev
```

✅ Backend running at: **http://localhost:5000**

## Step 5: Setup Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

## Step 6: Start Chatting!

1. Open browser: **http://localhost:5173**
2. Click "Register"
3. Create an account
4. Login
5. Choose a persona (Teacher/Student/Friend/Doctor)
6. Start chatting!

## Troubleshooting

### Backend won't start
- Make sure MongoDB is running: `mongod`
- Check `.env` file has all variables
- Check port 5000 is free

### Frontend won't start
- Check port 5173 is free
- Delete `node_modules` and `npm install` again

### Getting "Cannot find module" error
- Run `npm install` in that directory again
- Delete `node_modules` folder and retry

### Chat not working
- Check backend console for errors
- Verify Tuya credentials in `.env`
- Check MongoDB is connected

## Next Steps

### Deploy to Production

**Backend on Vercel:**
```bash
npm i -g vercel
cd backend
vercel
```

**Frontend on Vercel:**
```bash
cd frontend
vercel
```

### Customize Personas

Edit `backend/src/controllers/chatController.js` function `buildPersonaPrompt()` to customize how each persona behaves.

### Add Voice

Replace the simple 3D avatar in `frontend/src/components/AvatarScene.jsx` with:
- Text-to-speech (Web Speech API)
- Animation based on emotion
- Custom avatar models (Three.js)

## File Structure Quick Reference

```
backend/
  ├── server.js          ← Main entry point
  ├── .env               ← Your credentials go here
  └── src/
      ├── routes/        ← API endpoints
      ├── controllers/   ← Business logic
      └── services/      ← Tuya AI integration

frontend/
  ├── vite.config.js     ← Build config
  ├── .env.local         ← Frontend env (optional)
  └── src/
      ├── pages/         ← Login, Register, Dashboard
      ├── components/    ← React components
      └── store/         ← State management
```

## Common Commands

```bash
# Backend
npm run dev      # Start development server
npm start        # Start production server

# Frontend
npm run dev      # Start dev server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build
```

## Tips

- Use VS Code with REST Client extension to test API
- Use MongoDB Compass to visualize your data
- Check browser DevTools Network tab if chat fails
- Save responses in chat for reference

## Help

Read full README.md for:
- Detailed API documentation
- Deployment guides
- Architecture explanation
- Customization options

Happy building! 🚀
