import mongoose from 'mongoose';
import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    room: z
      .string({ required_error: 'Room ID is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Room ID',
      }),
    slots: z.array(
      z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid Slot ID',
      }),
    ),
    user: z
      .string({ required_error: 'User ID is required' })
      .refine((val) => mongoose.Types.ObjectId.isValid(val), {
        message: 'Invalid User ID',
      }),
    date: z.string({ required_error: 'Date is required' }),
    totalAmount: z.number().optional(),
    isDeleted: z.boolean().optional().default(false),
    isConfirmed: z.string().optional().default('unconfirmed'),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    room: z.string().optional(),
    slot: z.array(z.string()).optional(),
    user: z.string().optional(),
    date: z.string().optional(),
    totalAmount: z.number().optional(),
    isDeleted: z.boolean().optional(),
    isConfirmed: z.string().optional(),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
