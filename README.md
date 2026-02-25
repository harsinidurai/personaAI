# PersonaAI - 3D AI Chat Application

A full-stack web application where you chat with AI personas displayed as 3D animated characters. Features multiple personas (Teacher, Student, Friend, Doctor), each with unique behaviors and communication styles.

## Features

- **Multiple AI Personas**: Teacher, Student, Friend, Doctor
- **3D Avatar System**: React Three Fiber for interactive 3D avatars
- **Real-time Chat**: Powered by Tuya AI Agent
- **User Authentication**: JWT-based secure authentication
- **Chat History**: Persistent storage of conversations in MongoDB
- **Gender Selection**: Choose male or female avatar for each persona
- **Responsive Design**: Beautiful dark theme UI with TailwindCSS

## Project Structure

```
PersonaAI/
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # MongoDB schemas
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth middleware
│   │   ├── services/       # Tuya AI integration
│   │   └── utils/          # Helper functions
│   ├── server.js           # Express app
│   ├── package.json
│   └── .env                # Environment variables
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/          # Login, Register, Dashboard
│   │   ├── components/     # React components
│   │   ├── store/          # Zustand stores (Auth, Chat)
│   │   ├── services/       # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── index.html
│
└── README.md
```

## Prerequisites

- Node.js 16+ and npm/pnpm
- MongoDB running locally or connection string ready
- Tuya AI Account with Agent credentials

## Quick Start

### 1. Setup Backend

```bash
cd backend
npm install
```

Create/update `.env` file:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personaai
JWT_SECRET=your_super_secret_jwt_key_change_in_production

TUYA_ACCESS_ID=YOUR_TUYA_ACCESS_ID
TUYA_ACCESS_SECRET=YOUR_TUYA_ACCESS_SECRET
TUYA_AGENT_ID=YOUR_TUYA_AGENT_ID
TUYA_BASE_URL=https://openapi.tuyain.com
```

Start MongoDB (if local):

```bash
# On macOS with Homebrew
brew services start mongodb-community

# Or manually:
mongod
```

Run backend:

```bash
npm run dev
```

Backend should run at `http://localhost:5000`

### 2. Setup Frontend

```bash
cd ../frontend
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend should run at `http://localhost:5173`

## How to Get Tuya Credentials

1. Create account at [Tuya IoT Platform](https://iot.tuya.com/)
2. Create a new Cloud Project
3. Create an AI Agent
4. Get your:
   - Access ID
   - Access Secret
   - Agent ID
5. Add them to your backend `.env` file

## Usage

1. Open `http://localhost:5173` in browser
2. Register a new account
3. Login with your credentials
4. Select a persona (Teacher/Student/Friend/Doctor)
5. Choose avatar gender
6. Start chatting!

The AI will respond based on the selected persona's personality and teaching style.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Chat

- `POST /api/chat/send` - Send message and get AI response
- `GET /api/chat/sessions` - Get all chat sessions
- `GET /api/chat/history/:sessionId` - Get messages from a session

## Deployment

### Deploy Backend to Vercel/Heroku

**Vercel:**

```bash
npm i -g vercel
cd backend
vercel
# Follow prompts, add environment variables
```

**Heroku:**

```bash
heroku create your-app-name
heroku config:set PORT=5000 MONGO_URI=your_mongo_uri ...
git push heroku main
```

### Deploy Frontend to Vercel/Netlify

**Vercel:**

```bash
cd frontend
vercel
# Update VITE_API_URL to your backend URL
```

**Netlify:**

```bash
cd frontend
npm run build
# Drag dist/ folder to Netlify
```

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/personaai
JWT_SECRET=your_super_secret_jwt_key

TUYA_ACCESS_ID=your_access_id
TUYA_ACCESS_SECRET=your_access_secret
TUYA_AGENT_ID=your_agent_id
TUYA_BASE_URL=https://openapi.tuyain.com
```

### Frontend (.env.local)

```
VITE_API_URL=http://localhost:5000/api
```

## Technologies Used

### Backend
- Express.js - Web framework
- MongoDB + Mongoose - Database
- JWT - Authentication
- Axios - HTTP client
- bcryptjs - Password hashing

### Frontend
- React 18 - UI library
- Vite - Build tool
- TailwindCSS - Styling
- React Router - Navigation
- Zustand - State management
- React Three Fiber - 3D rendering
- Axios - HTTP client

## Troubleshooting

### MongoDB Connection Error

```
Make sure MongoDB is running:
mongod
```

### Tuya API Error

- Verify credentials in `.env`
- Check Tuya region URL is correct
- Ensure agent is published in Tuya console

### CORS Error

- Backend CORS is enabled for localhost:5173
- If deploying, update CORS origin in backend

### 3D Avatar Not Rendering

- Check browser console for Three.js errors
- Ensure WebGL is supported in your browser

## Future Enhancements

- [ ] Lip sync animation with speech recognition
- [ ] Gesture animations based on emotion
- [ ] Voice input/output
- [ ] Board mode for teaching
- [ ] Learning profile tracking
- [ ] Quiz mode
- [ ] Voice synthesis (TTS)
- [ ] Mobile optimization

## License

MIT License - feel free to use this project!

## Support

For issues or questions:
1. Check environment variables are correctly set
2. Verify MongoDB is running
3. Check backend logs for errors
4. Check browser console for frontend errors

Happy chatting! 🎉
