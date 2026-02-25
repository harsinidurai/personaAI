# PersonaAI - System Architecture

Complete system design and data flow documentation.

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      PERSONAAI SYSTEM                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐          ┌──────────────────────┐    │
│  │    FRONTEND          │          │     BACKEND          │    │
│  │  (React + Vite)      │◄────────►│  (Express.js)        │    │
│  │                      │ HTTP/API │                      │    │
│  │ - Login/Register     │          │ - Authentication     │    │
│  │ - Chat Interface     │          │ - Chat Management    │    │
│  │ - 3D Avatar          │          │ - Tuya Integration   │    │
│  │ - Persona Selector   │          │                      │    │
│  └──────────────────────┘          └────────┬─────────────┘    │
│         │ (localhost:5173)                   │ (localhost:5000) │
│         │                                    │                  │
│         │                          ┌─────────▼──────────┐      │
│         │                          │   MONGODB          │      │
│         │                          │                    │      │
│         │                          │ - Users            │      │
│         │                          │ - ChatSessions     │      │
│         │                          │ - Messages         │      │
│         │                          └────────────────────┘      │
│         │                                                       │
│         │                          ┌─────────────────────┐     │
│         │                          │  TUYA AI AGENT      │     │
│         │                          │                     │     │
│         └─────────────────────────►│ - LLM Processing   │     │
│            (User Messages)         │ - Persona Logic    │     │
│                                    │ - Response Gen     │     │
│                                    └─────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
FRONTEND (React)
├── App.jsx (Router)
│   ├── Login Page
│   ├── Register Page
│   └── Dashboard
│       ├── Sidebar Component
│       │   ├── Persona Selector
│       │   ├── Gender Toggle
│       │   └── Chat History
│       ├── ChatWindow Component
│       │   ├── Message Display
│       │   └── Input Form
│       └── AvatarScene Component
│           └── 3D Avatar (Three.js)
│
├── Store (Zustand)
│   ├── useAuthStore (login/register)
│   └── useChatStore (messages/sessions)
│
├── Services
│   └── api.js (Axios instance)
│
└── Styles
    └── TailwindCSS

BACKEND (Express)
├── server.js (Express app)
├── config/db.js (MongoDB connection)
│
├── Routes
│   ├── authRoutes.js
│   │   ├── POST /register
│   │   └── POST /login
│   └── chatRoutes.js
│       ├── POST /send
│       ├── GET /sessions
│       └── GET /history/:id
│
├── Controllers
│   ├── authController.js
│   │   ├── register()
│   │   └── login()
│   └── chatController.js
│       ├── sendMessage()
│       ├── getSessions()
│       └── getHistory()
│
├── Models
│   ├── User.js
│   ├── ChatSession.js
│   └── Message.js
│
├── Middleware
│   └── authMiddleware.js (JWT verification)
│
├── Services
│   └── tuyaService.js (Tuya API calls)
│
└── Utils
    └── tuyaSign.js (HMAC signing)
```

## Data Flow Diagram

### Authentication Flow

```
User Registration
─────────────────
1. User enters name, email, password
2. Frontend: POST /api/auth/register
3. Backend:
   - Validate input
   - Check email exists
   - Hash password (bcryptjs)
   - Save to MongoDB
4. Frontend: Redirect to login

User Login
──────────
1. User enters email, password
2. Frontend: POST /api/auth/login
3. Backend:
   - Find user
   - Compare password hash
   - Generate JWT token
4. Frontend: Save token in localStorage
5. Authenticated requests include JWT
```

### Chat Flow

```
Chat Message
────────────
1. User types message + selects persona
2. Frontend: Validates input
3. Frontend: POST /api/chat/send
   {
     message: "Hello",
     persona: "Teacher",
     gender: "female",
     sessionId: "optional"
   }

4. Backend receives:
   - Verify JWT token
   - Create/find ChatSession
   - Save user message to MongoDB

5. Backend calls Tuya AI:
   - Build persona prompt
   - Sign request (HMAC-SHA256)
   - POST to Tuya API
   - Get AI response

6. Backend:
   - Save AI response to MongoDB
   - Return response to frontend

7. Frontend:
   - Display in chat
   - Show typing animation
   - 3D avatar responds
   - Update history
```

### Session Management

```
Chat Session Lifecycle
──────────────────────
User clicks "New Chat"
         ↓
No session ID set
         ↓
First message sent
         ↓
Backend creates ChatSession
         ↓
Session ID returned to frontend
         ↓
All subsequent messages use same session
         ↓
Messages saved with sessionId
         ↓
History displayed when session clicked
```

## API Endpoint Flow

```
Frontend Application
    │
    ├─► POST /api/auth/register
    │   └─► Create User → MongoDB
    │
    ├─► POST /api/auth/login
    │   └─► Find User → Return JWT Token
    │
    ├─► POST /api/chat/send (+ JWT)
    │   └─► Create/Update Session
    │   └─► Save Message
    │   └─► Call Tuya AI
    │   └─► Save Response
    │   └─► Return Response
    │
    ├─► GET /api/chat/sessions (+ JWT)
    │   └─► Query Sessions → MongoDB
    │   └─► Return Sessions List
    │
    └─► GET /api/chat/history/:sessionId (+ JWT)
        └─► Query Messages → MongoDB
        └─► Return Messages
```

## Database Schema

```
USERS Collection
────────────────
{
  _id: ObjectId
  name: String
  email: String (unique)
  password: String (hashed)
  createdAt: Date
  updatedAt: Date
}

CHATSESSIONS Collection
──────────────────────
{
  _id: ObjectId
  userId: ObjectId (ref: User)
  persona: String ("Teacher"|"Student"|"Friend"|"Doctor")
  gender: String ("male"|"female")
  title: String
  createdAt: Date
  updatedAt: Date
}

MESSAGES Collection
───────────────────
{
  _id: ObjectId
  sessionId: ObjectId (ref: ChatSession)
  sender: String ("user"|"ai")
  message: String
  emotion: String
  gesture: String
  createdAt: Date
  updatedAt: Date
}
```

## Authentication Flow

```
┌─────────────────────────────────────────┐
│         User Interaction                 │
└────────────────┬────────────────────────┘
                 │
                 ▼
    ┌────────────────────────┐
    │  Frontend (React)      │
    │  - Store token         │
    │  - Set Authorization   │
    └────────┬───────────────┘
             │
             ▼
  ┌──────────────────────────────────┐
  │  API Request Headers             │
  │  Authorization: Bearer <token>   │
  └──────────────┬───────────────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │  Backend Middleware             │
    │  - Extract token                │
    │  - Verify JWT                   │
    │  - Attach user to request       │
    └────────┬─────────────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │  Protected Route           │
    │  - User context available  │
    │  - Process request         │
    └────────┬────────────────────┘
             │
             ▼
   ┌────────────────────────┐
   │  Database Operation    │
   │  - Query with userId   │
   │  - Return data         │
   └────────────────────────┘
```

## 3D Avatar Flow

```
AI Response
    │
    ├─► Parse emotion tag
    │   (happy, sad, thinking, etc.)
    │
    ├─► Parse gesture tag
    │   (wave, nod, smile, etc.)
    │
    ├─► Send to 3D Component
    │   └─► AvatarScene.jsx
    │       └─► React Three Fiber
    │           ├─► Load Avatar Model
    │           ├─► Apply Emotion
    │           ├─► Apply Gesture
    │           ├─► Render Animation
    │           └─► Display to User
    │
    └─► Display Text Chat
```

## Deployment Architecture (Vercel Example)

```
Your Domain (personaai.app)
    │
    ├─► Vercel CDN
    │   └─► frontend/dist (React app)
    │
    └─► Vercel Functions
        └─► backend API (Express routes)
            │
            ├─► Environment Variables
            │   └─► .env secrets
            │
            └─► MongoDB Atlas
                └─► Cloud Database
```

## Request/Response Cycle

```
1. USER ACTION (Frontend)
   ┌─────────────────────────┐
   │ Type message & click    │
   │ Send                    │
   └────────┬────────────────┘
            │
2. FRONTEND PROCESSING
   ├─ Validate input
   ├─ Clear input field
   ├─ Show loading state
   └─ Add message to UI (optimistic update)

3. API CALL
   ┌─────────────────────────────────────────┐
   │ POST /api/chat/send                     │
   │ Headers: Authorization: Bearer <token>  │
   │ Body: {message, persona, gender, ...}   │
   └────────┬────────────────────────────────┘
            │
4. BACKEND PROCESSING
   ├─ Verify JWT token
   ├─ Find/create session
   ├─ Save user message
   ├─ Call Tuya AI API
   ├─ Parse response
   └─ Save AI message

5. API RESPONSE
   ┌──────────────────────────────────────────┐
   │ {                                        │
   │   sessionId: "...",                      │
   │   reply: "AI response text",             │
   │   emotion: "happy",                      │
   │   gesture: "wave"                        │
   │ }                                        │
   └────────┬─────────────────────────────────┘
            │
6. FRONTEND DISPLAY
   ├─ Hide loading
   ├─ Display AI message
   ├─ Trigger 3D animation
   ├─ Save to local state
   └─ Update chat history

7. USER SEES RESPONSE
   ┌────────────────────────┐
   │ AI response in chat    │
   │ 3D avatar animating    │
   │ Can type new message   │
   └────────────────────────┘
```

## File Upload/Download Flow

```
Not currently implemented, but here's how it would work:

File Upload
───────────
User selects file
    ↓
Frontend validates (size, type)
    ↓
POST /api/chat/upload + JWT
    ↓
Backend validates
    ↓
Save to storage (Vercel Blob, AWS S3, etc.)
    ↓
Store reference in MongoDB
    ↓
Return URL to frontend

File Display
────────────
Message contains file reference
    ↓
Frontend renders download link
    ↓
User downloads from storage service
```

## Error Handling Flow

```
Error Occurs
    │
    ├─ Frontend Error
    │  ├─ Validation error → Show message to user
    │  ├─ Network error → Show offline message
    │  └─ Parse error → Log to console
    │
    └─ Backend Error
       ├─ Auth error → Return 401
       ├─ Validation error → Return 400
       ├─ Not found → Return 404
       ├─ Server error → Return 500
       └─ All errors logged to console
           (in production: sent to error tracker)
```

## Security Layers

```
Layer 1: Frontend
├─ Input validation
├─ XSS prevention (React escapes by default)
└─ Secure storage (localStorage for token)

Layer 2: Network
├─ HTTPS in production
├─ CORS validation
└─ Request signing (Tuya API)

Layer 3: Backend
├─ JWT verification
├─ Input sanitization
├─ Rate limiting (optional)
└─ HTTPS/TLS

Layer 4: Database
├─ MongoDB user permissions
├─ Indexed fields for performance
├─ Backups enabled
└─ Connection string in env

Layer 5: External API
├─ HMAC-SHA256 signing
├─ Access ID/Secret secured
└─ Rate limiting from Tuya
```

## Performance Optimization

```
Frontend
────────
├─ Code splitting (Vite)
├─ Lazy loading routes
├─ Memoized components
├─ Debounced input
└─ Compressed assets

Backend
───────
├─ Token caching
├─ Database indexing
├─ Connection pooling
├─ Query optimization
└─ Response compression

Database
────────
├─ Indexed fields
├─ Proper data types
├─ Archived old data
└─ Regular backups

External APIs
─────────────
├─ Token reuse
├─ Batch requests
├─ Caching responses
└─ Rate limit handling
```

## Scalability Plan

```
Current (Single Server)
───────────────────────
┌──────────────────┐
│ Frontend (5173)  │ ←──┐
├──────────────────┤    │ Users
│ Backend (5000)   │    │
├──────────────────┤    │
│ MongoDB (27017)  │ ←──┘
└──────────────────┘

Future (Distributed)
───────────────────
┌─────────────────────────────────┐
│ Load Balancer                   │
├─────────────────────────────────┤
├─ Backend Instance 1 (5000)      │
├─ Backend Instance 2 (5000)      │
├─ Backend Instance 3 (5000)      │
├─────────────────────────────────┤
│ MongoDB Atlas (Replica Set)     │
├─ Primary                        │
├─ Secondary 1                    │
├─ Secondary 2                    │
└─────────────────────────────────┘
```

---

## Summary

This architecture provides:
- **Separation of Concerns**: Frontend, Backend, Database
- **Security**: JWT, hashing, HMAC signing
- **Scalability**: Stateless backend, persistent database
- **Reliability**: Error handling, data persistence
- **Performance**: Caching, indexing, optimization
- **Flexibility**: Easy to add features, change AI provider

See other documentation for setup, deployment, and customization guides.
