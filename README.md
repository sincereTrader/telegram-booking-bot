# tikat-tikat - Telegram Bus Booking Bot

A Telegram-based bus booking bot that allows users to search and book buses directly within Telegram using the WebApp platform.

## Project Structure

- `bot/` - Telegram bot implementation using grammY
- `backend/` - Express.js API server
- `frontend/` - React Mini-App frontend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- Copy `.env.example` files in each workspace
- Fill in required values (Telegram bot token, database URL, etc.)

3. Run development servers:
```bash
npm run dev
```

## Development

Each workspace can be run independently:
- `npm run dev --workspace=bot` - Run Telegram bot
- `npm run dev --workspace=backend` - Run API server
- `npm run dev --workspace=frontend` - Run frontend dev server

