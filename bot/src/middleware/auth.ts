import { Context, NextFunction } from 'grammy';

export interface AuthenticatedContext extends Context {
  user?: {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
}

export async function authMiddleware(ctx: AuthenticatedContext, next: NextFunction) {
  if (ctx.from) {
    ctx.user = {
      id: ctx.from.id,
      username: ctx.from.username,
      first_name: ctx.from.first_name,
      last_name: ctx.from.last_name,
    };
  }
  await next();
}

