import { Schema, model } from 'mongoose';
import { TRoom } from './room.interface';

const roomSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Room name is required'],
    trim: true,
    unique: true,
  },
  roomNo: {
    type: Number,
    required: [true, 'Room no is required'],
  },
  floorNo: {
    type: Number,
    required: [true, 'Floor no is required'],
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
  },
  pricePerSlot: {
    type: Number,
    required: [true, 'Price per slot is required'],
  },
  amenities: [String],
  isDeleted: Boolean,
});

export const Room = model<TRoom>('Room', roomSchema);
