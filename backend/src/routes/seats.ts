import { Router } from 'express';
import { getSeatAvailability } from '../controllers/seatsController';
import { telegramAuthMiddleware } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(telegramAuthMiddleware(process.env.BOT_TOKEN || ''));

router.get('/:busId', getSeatAvailability);

export default router;

