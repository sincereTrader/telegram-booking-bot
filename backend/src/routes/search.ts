import { Router } from 'express';
import { searchBuses } from '../controllers/searchController';
import { validateRequest } from '../utils/validation';
import { searchSchema } from '../utils/validation';
import { telegramAuthMiddleware } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(telegramAuthMiddleware(process.env.BOT_TOKEN || ''));

router.post('/', validateRequest(searchSchema), searchBuses);

export default router;

