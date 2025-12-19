import { z } from 'zod';

export const searchSchema = z.object({
  source: z.string().min(1, 'Source is required'),
  destination: z.string().min(1, 'Destination is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
});

export const reserveBookingSchema = z.object({
  busId: z.string().min(1, 'Bus ID is required'),
  seatIds: z.array(z.string()).min(1, 'At least one seat must be selected'),
  source: z.string().optional(),
  destination: z.string().optional(),
  travelDate: z.string().optional(),
  passengerDetails: z.object({
    name: z.string().min(1, 'Name is required'),
    age: z.number().int().min(1).max(120),
    gender: z.enum(['male', 'female', 'other']),
  }),
});

export function validateRequest<T>(schema: z.ZodSchema<T>) {
  return (req: any, res: any, next: any) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 'fail',
          message: 'Validation error',
          errors: error.errors,
        });
      }
      next(error);
    }
  };
}

