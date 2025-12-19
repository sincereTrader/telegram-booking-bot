import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { redbusService } from '../services/redbusService';
import { db } from '../db/connection';
import { AppErrorClass } from '../middleware/errorHandler';

export async function searchBuses(req: AuthenticatedRequest, res: Response) {
  try {
    const { source, destination, date } = req.body;
    const userId = req.user?.id;

    // Log search query
    if (userId) {
      await db.query(
        'INSERT INTO search_history (user_id, source, destination, search_date, created_at) VALUES ($1, $2, $3, $4, NOW())',
        [userId, source, destination, date]
      );
    }

    // Fetch buses from mock API
    const buses = await redbusService.searchBuses(source, destination, date);

    res.json({
      status: 'success',
      data: {
        buses,
      },
    });
  } catch (error) {
    throw new AppErrorClass(
      error instanceof Error ? error.message : 'Failed to search buses',
      500
    );
  }
}

