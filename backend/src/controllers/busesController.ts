import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { redbusService } from '../services/redbusService';
import { AppErrorClass } from '../middleware/errorHandler';

export async function getBusDetails(req: AuthenticatedRequest, res: Response) {
  try {
    const { busId } = req.params;

    const bus = await redbusService.getBusDetails(busId);

    if (!bus) {
      throw new AppErrorClass('Bus not found', 404);
    }

    res.json({
      status: 'success',
      data: {
        bus,
      },
    });
  } catch (error) {
    throw new AppErrorClass(
      error instanceof Error ? error.message : 'Failed to get bus details',
      500
    );
  }
}

