import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    required: [true, 'Room ID is required'],
    ref: 'Room',
  },
  slots: [
    {
      type: Schema.Types.ObjectId,
      required: [true, 'Slot ID is required'],
      ref: 'Slot',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User',
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  totalAmount: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  isConfirmed: {
    type: String,
    default: 'unconfirmed',
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
