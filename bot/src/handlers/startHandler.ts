import { Context } from 'grammy';

const WEBAPP_URL = process.env.WEBAPP_URL || 'http://localhost:3000';

export async function startHandler(ctx: Context) {
  const welcomeMessage = `
🚌 Welcome to tikat-tikat!

Book your bus tickets directly from Telegram. No need to install any apps!

Click the button below to start booking:
  `.trim();

  await ctx.reply(welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚌 Book Bus',
            web_app: { url: WEBAPP_URL }
          }
        ]
      ]
    }
  });
}

