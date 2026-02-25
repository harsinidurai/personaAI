# PersonaAI Deployment Guide

Complete guide to deploy PersonaAI to production.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Tuya credentials validated
- [ ] MongoDB connection verified
- [ ] JWT_SECRET changed to secure value
- [ ] Frontend API URL updated
- [ ] All environment variables documented

## Option 1: Deploy to Vercel (Recommended)

### Deploy Backend

1. Push code to GitHub (if not already)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo
git push -u origin main
```

2. Go to https://vercel.com and sign in

3. Click "New Project" → Select your GitHub repo

4. Framework: Node.js
   Root Directory: `backend`

5. Environment Variables:
   - `PORT` = 5000
   - `MONGO_URI` = your MongoDB connection string
   - `JWT_SECRET` = your secure secret key
   - `TUYA_ACCESS_ID` = your Tuya access ID
   - `TUYA_ACCESS_SECRET` = your Tuya access secret
   - `TUYA_AGENT_ID` = your Tuya agent ID
   - `TUYA_BASE_URL` = https://openapi.tuyain.com

6. Deploy!

Get your backend URL (e.g., `https://personaai-backend.vercel.app`)

### Deploy Frontend

1. Create another Vercel project for frontend

2. Framework: Vite
   Root Directory: `frontend`

3. Environment Variables:
   - `VITE_API_URL` = `https://personaai-backend.vercel.app/api`

4. Deploy!

## Option 2: Deploy to Railway (Simpler Alternative)

### Backend

1. Go to https://railway.app

2. New Project → GitHub

3. Select your repo

4. Add variables in Railway dashboard

5. No special configuration needed - Railway auto-detects Node.js

### Frontend

1. New Project → GitHub repo → frontend folder

2. Add `VITE_API_URL` variable

3. Deploy!

## Option 3: Deploy to Heroku (Traditional)

### Prerequisites

```bash
npm install -g heroku
heroku login
```

### Backend

1. Create Heroku app:

```bash
cd backend
heroku create your-app-name
```

2. Add MongoDB URL:

```bash
heroku config:set MONGO_URI=your_mongodb_url
heroku config:set JWT_SECRET=your_secret
heroku config:set TUYA_ACCESS_ID=your_id
heroku config:set TUYA_ACCESS_SECRET=your_secret
heroku config:set TUYA_AGENT_ID=your_agent_id
heroku config:set TUYA_BASE_URL=https://openapi.tuyain.com
```

3. Create `Procfile`:

```
web: node server.js
```

4. Deploy:

```bash
git push heroku main
```

### Frontend

```bash
cd frontend
npm run build

# Deploy dist/ to Netlify via drag-and-drop
# Or use Vercel as shown above
```

## Option 4: Deploy with Docker (Advanced)

### Create Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

### Create docker-compose.yml

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/personaai
      - JWT_SECRET=${JWT_SECRET}
      - TUYA_ACCESS_ID=${TUYA_ACCESS_ID}
      - TUYA_ACCESS_SECRET=${TUYA_ACCESS_SECRET}
      - TUYA_AGENT_ID=${TUYA_AGENT_ID}
      - TUYA_BASE_URL=https://openapi.tuyain.com
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  frontend:
    build: ./frontend
    ports:
      - "80:5173"
    environment:
      - VITE_API_URL=http://localhost:5000/api

volumes:
  mongo_data:
```

Run with:

```bash
docker-compose up
```

## Post-Deployment

### Test Your Deployment

1. Visit frontend URL
2. Register new account
3. Try each persona
4. Check chat history persists

### Monitor

- Check error logs
- Monitor database usage
- Set up uptime alerts

### Custom Domain

1. Buy domain (Namecheap, GoDaddy, etc.)
2. In Vercel/Railway settings → Domains
3. Add your domain
4. Update DNS records

## Environment Variables Summary

| Variable | Backend | Frontend | Example |
|----------|---------|----------|---------|
| `PORT` | ✓ | - | 5000 |
| `MONGO_URI` | ✓ | - | mongodb+srv://user:pass@cluster.mongodb.net/db |
| `JWT_SECRET` | ✓ | - | your_random_secret_key_here |
| `TUYA_ACCESS_ID` | ✓ | - | a1b2c3d4e5f6g7h8 |
| `TUYA_ACCESS_SECRET` | ✓ | - | secret123456789 |
| `TUYA_AGENT_ID` | ✓ | - | agent123456789 |
| `TUYA_BASE_URL` | ✓ | - | https://openapi.tuyain.com |
| `VITE_API_URL` | - | ✓ | https://personaai-backend.vercel.app/api |

## Troubleshooting Deployment

### Backend won't start
```
Check logs: vercel logs personaai-backend
Verify all environment variables are set
Test MONGO_URI manually
```

### Frontend shows blank page
```
Check VITE_API_URL is correct
Open DevTools Network tab
Look for failed API requests
Check browser console for errors
```

### Chat doesn't work
```
Verify backend is running
Check Tuya credentials are correct
Test backend API directly: /api/chat/send
Check backend logs for Tuya API errors
```

### CORS errors
```
Update CORS in backend/server.js
Add frontend URL to whitelist
Redeploy backend
```

## Production Best Practices

1. **Security**
   - Never commit .env files
   - Use strong JWT_SECRET (32+ chars)
   - Enable HTTPS only
   - Set secure cookies

2. **Monitoring**
   - Setup error tracking (Sentry)
   - Monitor API response times
   - Track user signups
   - Alert on errors

3. **Scaling**
   - Use MongoDB Atlas for production
   - Enable connection pooling
   - Cache frequent queries
   - Use CDN for frontend

4. **Backups**
   - Enable MongoDB backups
   - Test restore procedure
   - Keep migration scripts

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Heroku Docs: https://devcenter.heroku.com
- MongoDB Atlas: https://docs.atlas.mongodb.com
