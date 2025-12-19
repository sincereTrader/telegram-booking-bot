import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { AppErrorClass } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username?: string;
    first_name?: string;
    last_name?: string;
  };
}

// Validate Telegram WebApp initData
export function validateTelegramWebAppData(initData: string, botToken: string): boolean {
  try {
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');

    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const calculatedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    return calculatedHash === hash;
  } catch (error) {
    return false;
  }
}

export function telegramAuthMiddleware(botToken: string) {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const initData = req.headers['x-telegram-init-data'] as string;

      if (!initData) {
        throw new AppErrorClass('Telegram initData is required', 401);
      }

      // Validate initData
      if (!validateTelegramWebAppData(initData, botToken)) {
        throw new AppErrorClass('Invalid Telegram initData', 401);
      }

      // Parse user data from initData
      const urlParams = new URLSearchParams(initData);
      const userParam = urlParams.get('user');
      
      if (userParam) {
        const user = JSON.parse(userParam);
        req.user = {
          id: user.id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        };
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

