import { Router } from 'express';
import { getBusDetails } from '../controllers/busesController';
import { telegramAuthMiddleware } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(telegramAuthMiddleware(process.env.BOT_TOKEN || ''));

router.get('/:busId', getBusDetails);

export default router;

