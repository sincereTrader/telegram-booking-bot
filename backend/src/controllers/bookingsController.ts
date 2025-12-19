import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { db } from '../db/connection';
import { AppErrorClass } from '../middleware/errorHandler';

export async function reserveBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { busId, seatIds, source, destination, travelDate, passengerDetails } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppErrorClass('User authentication required', 401);
    }

    // Get or create user
    let userResult = await db.query(
      'SELECT id FROM users WHERE telegram_id = $1',
      [userId]
    );

    let dbUserId: number;
    if (userResult.rows.length === 0) {
      const insertResult = await db.query(
        'INSERT INTO users (telegram_id, username, first_name, last_name, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
        [userId, req.user.username || null, req.user.first_name || null, req.user.last_name || null]
      );
      dbUserId = insertResult.rows[0].id;
    } else {
      dbUserId = userResult.rows[0].id;
    }

    // Create booking reservation (expires in 15 minutes)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const bookingResult = await db.query(
      `INSERT INTO bookings (user_id, bus_id, source, destination, travel_date, seat_numbers, status, created_at, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'reserved', NOW(), $7)
       RETURNING id, status, expires_at`,
      [
        dbUserId,
        busId,
        source || 'N/A',
        destination || 'N/A',
        travelDate ? new Date(travelDate) : new Date(),
        seatIds,
        expiresAt
      ]
    );

    const booking = bookingResult.rows[0];

    res.json({
      status: 'success',
      data: {
        bookingId: booking.id.toString(),
        status: booking.status,
        expiresAt: booking.expires_at,
      },
    });
  } catch (error) {
    throw new AppErrorClass(
      error instanceof Error ? error.message : 'Failed to reserve booking',
      500
    );
  }
}

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { bookingId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppErrorClass('User authentication required', 401);
    }

    const result = await db.query(
      `SELECT b.* FROM bookings b
       JOIN users u ON b.user_id = u.id
       WHERE b.id = $1 AND u.telegram_id = $2`,
      [bookingId, userId]
    );

    if (result.rows.length === 0) {
      throw new AppErrorClass('Booking not found', 404);
    }

    res.json({
      status: 'success',
      data: {
        booking: result.rows[0],
      },
    });
  } catch (error) {
    throw new AppErrorClass(
      error instanceof Error ? error.message : 'Failed to get booking',
      500
    );
  }
}

