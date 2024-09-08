import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const createSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string({ required_error: 'Room ID is required' }),
      date: z
        .string()
        .regex(dateRegex, { message: 'Invalid date format (YYYY-MM-DD)' }),
      startTime: z.string().regex(timeRegex, {
        message: 'Invalid start time format (HH:MM)',
      }),
      endTime: z
        .string()
        .regex(timeRegex, { message: 'Invalid end time format (HH:MM)' }),
      isBooked: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    })
    .refine(
      (body) => {
        const startTime = new Date(`1970-01-01T${body.startTime}:00`);
        const endTime = new Date(`1970-01-01T${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'Start time should be before End time !',
      },
    ),
});

const updateSlotValidationSchema = z.object({
  body: z
    .object({
      room: z.string({ required_error: 'Room ID is required' }).optional(),
      date: z
        .string()
        .regex(dateRegex, { message: 'Invalid date format (YYYY-MM-DD)' })
        .optional(),
      startTime: z
        .string()
        .regex(timeRegex, { message: 'Invalid start time format (HH:MM)' })
        .optional(),
      endTime: z
        .string()
        .regex(timeRegex, { message: 'Invalid end time format (HH:MM)' })
        .optional(),
      isBooked: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    })
    .refine(
      (body) => {
        if (!body.startTime || !body.endTime) return true;
        const startTime = new Date(`1970-01-01T${body.startTime}:00`);
        const endTime = new Date(`1970-01-01T${body.endTime}:00`);
        return endTime > startTime;
      },
      {
        message: 'Start time should be before End time!',
        path: ['endTime'],
      },
    ),
});

export const SlotValidations = {
  createSlotValidationSchema,
  updateSlotValidationSchema,
};
