import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Room } from '../room/room.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';

// CREATE
const createBookingIntoDB = async (payload: TBooking) => {
  // 01 find the room
  const room = await Room.findById(payload.room).exec();
  if (!room) throw new AppError(404, 'Room not found!');

  // 02 Calculate total amount based on pricePerSlot and number of slots
  const totalAmount = room.pricePerSlot * payload.slots.length;

  const result = await Booking.create({ ...payload, totalAmount });

  const populatedResult = await Booking.findById(result._id)
    .populate('room')
    .populate('slots')
    .populate('user')
    .exec();

  return populatedResult;
};

// GET ALL
const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ isDeleted: { $ne: true } })
    .populate('room')
    .populate('slots')
    .populate('user')
    .exec();
  return result;
};

// GET MY BOOKINGS
const getMyBookingsFromDB = async (id: string) => {
  const result = await Booking.find(
    { user: id, isDeleted: { $ne: true } },
    { user: 0 },
  )
    .populate('room')
    .populate('slots');
  return result;
};

// UPDATE
const updateBookingInDB = async (
  id: string,
  payload: Partial<TBooking>,
) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );

  if (result && result.isConfirmed === 'confirmed') {
    const confirmedBookingIds = result.slots;
    confirmedBookingIds.forEach(async (id) => {
      await Slot.findByIdAndUpdate(id, { isBooked: true }, { new: true });
    });
  }

  if (result && result.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This booking already deleted!',
    );
  }
  return result;
};

// DELETE
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  updateBookingInDB,
  deleteBookingFromDB,
};
