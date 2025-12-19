# Setup Guide for tikat-tikat Telegram Bus Booking Bot

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or use SQLite for MVP)
- Telegram Bot Token from @BotFather

## Step 1: Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (bot, backend, frontend).

## Step 2: Database Setup

### Option A: PostgreSQL (Recommended for Production)

1. Create a PostgreSQL database:
```bash
createdb tikat_tikat
```

2. Run the schema:
```bash
psql -d tikat_tikat -f database/schema.sql
```

### Option B: SQLite (For MVP/Development)

Update `backend/src/db/connection.ts` to use SQLite if preferred.

## Step 3: Environment Variables

### Bot (`bot/.env`)
```
BOT_TOKEN=your_telegram_bot_token_here
WEBAPP_URL=https://your-frontend-url.com
```

### Backend (`backend/.env`)
```
PORT=4000
DATABASE_URL=postgresql://user:password@localhost:5432/tikat_tikat
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
BOT_TOKEN=your_telegram_bot_token_here
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:4000
```

## Step 4: Create Telegram Bot

1. Open Telegram and search for @BotFather
2. Send `/newbot` command
3. Follow instructions to create a bot
4. Copy the bot token and add it to `bot/.env` and `backend/.env`
5. Set up WebApp:
   - Send `/newapp` to @BotFather
   - Select your bot
   - Provide app title and description
   - Upload a photo (optional)
   - Provide the WebApp URL (your frontend URL)

## Step 5: Run Development Servers

### Option A: Run All Services Together
```bash
npm run dev
```

### Option B: Run Services Individually

Terminal 1 - Bot:
```bash
cd bot
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

Terminal 3 - Frontend:
```bash
cd frontend
npm run dev
```

## Step 6: Test the Bot

1. Open Telegram and search for your bot
2. Send `/start` command
3. Click the "Book Bus" button
4. The Mini-App should open in Telegram

## Troubleshooting

### Bot not responding
- Check that `BOT_TOKEN` is correct in `bot/.env`
- Ensure bot is running (`npm run dev` in bot directory)

### Frontend not loading
- Check that `VITE_API_URL` matches your backend URL
- Ensure backend is running on the correct port
- Check browser console for errors

### Database connection errors
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database exists and schema is applied

### Authentication errors
- Ensure `BOT_TOKEN` is set in backend `.env`
- Verify Telegram WebApp initData is being sent correctly
- Check backend logs for authentication errors

## Production Deployment

### Backend
Deploy to Railway, Render, or Fly.io:
- Set environment variables
- Ensure database is accessible
- Set `NODE_ENV=production`

### Frontend
Deploy to Vercel, Netlify, or serve from backend:
- Set `VITE_API_URL` to production backend URL
- Build: `npm run build` in frontend directory
- Serve the `dist` folder

### Bot
- Use webhook mode in production
- Set webhook URL to your backend endpoint
- Update `WEBAPP_URL` in bot config to production frontend URL

## Architecture

- **Bot**: Handles Telegram commands and serves WebApp button
- **Backend**: Express API with PostgreSQL database
- **Frontend**: React Mini-App that runs inside Telegram

## API Endpoints

- `POST /api/search` - Search buses
- `GET /api/buses/:busId` - Get bus details
- `GET /api/seats/:busId` - Get seat availability
- `POST /api/bookings/reserve` - Reserve booking
- `GET /api/bookings/:bookingId` - Get booking details

