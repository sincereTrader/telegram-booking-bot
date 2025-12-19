import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { redbusService } from '../services/redbusService';
import { AppErrorClass } from '../middleware/errorHandler';

export async function getSeatAvailability(req: AuthenticatedRequest, res: Response) {
  try {
    const { busId } = req.params;

    const seats = await redbusService.getSeatAvailability(busId);

    res.json({
      status: 'success',
      data: {
        busId,
        seats,
      },
    });
  } catch (error) {
    throw new AppErrorClass(
      error instanceof Error ? error.message : 'Failed to get seat availability',
      500
    );
  }
}

