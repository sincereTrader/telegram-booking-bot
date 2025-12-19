import { Bot, webhookCallback } from 'grammy';
import dotenv from 'dotenv';
import { startHandler } from './handlers/startHandler';

dotenv.config();

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is required');
}

const bot = new Bot(process.env.BOT_TOKEN);

// Register handlers
bot.command('start', startHandler);

// Error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Start bot
if (process.env.NODE_ENV === 'production') {
  // For production, use webhook
  const express = require('express');
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, 'express'));
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Bot webhook server running on port ${PORT}`);
  });
} else {
  // For development, use polling
  bot.start();
  console.log('Bot started in polling mode');
}

export default bot;

