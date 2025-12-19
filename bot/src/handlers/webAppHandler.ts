import { Context } from 'grammy';

// This handler can be used for web app data callbacks if needed
export async function webAppHandler(ctx: Context) {
  // Handle web app data if sent from mini-app
  if (ctx.webAppData) {
    const data = ctx.webAppData.data;
    // Process web app data
    console.log('WebApp data received:', data);
  }
}

