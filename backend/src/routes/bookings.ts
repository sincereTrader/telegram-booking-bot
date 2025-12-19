import { Router } from 'express';
import { reserveBooking, getBooking } from '../controllers/bookingsController';
import { validateRequest } from '../utils/validation';
import { reserveBookingSchema } from '../utils/validation';
import { telegramAuthMiddleware } from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(telegramAuthMiddleware(process.env.BOT_TOKEN || ''));

router.post('/reserve', validateRequest(reserveBookingSchema), reserveBooking);
router.get('/:bookingId', getBooking);

export default router;

