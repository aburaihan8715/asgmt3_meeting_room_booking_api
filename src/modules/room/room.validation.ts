import { z } from 'zod';

const createRoomValidationSchema = z.object({
  body: z.object({
    roomName: z.string({ required_error: 'Room name is required' }).trim(),
    roomNo: z.number({ required_error: 'Room no is required' }).int(),
    floorNo: z.number({ required_error: 'Floor no is required' }).int(),
    capacity: z.number({ required_error: 'Capacity is required' }).int(),
    pricePerSlot: z.number({
      required_error: 'Price per slot is required',
    }),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    isDeleted: z.boolean().optional(),
    isBooked: z.boolean().optional(),
  }),
});
const updateRoomValidationSchema = z.object({
  body: z.object({
    roomName: z.string().trim().optional(),
    roomNo: z.number().int().optional(),
    floorNo: z.number().int().optional(),
    capacity: z.number().int().optional(),
    pricePerSlot: z.number().optional(),
    amenities: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    coverImage: z.string().optional(),
    isDeleted: z.boolean().optional(),
    isBooked: z.boolean().optional(),
  }),
});

export const RoomValidations = {
  createRoomValidationSchema,
  updateRoomValidationSchema,
};
