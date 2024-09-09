import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Room } from '../room/room.model';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Slot } from '../slot/slot.model';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

// CREATE
const createBookingIntoDB = async (payload: TBooking) => {
  // 01 Find the room
  const room = await Room.findById(payload.room);
  if (!room) throw new AppError(httpStatus.NOT_FOUND, 'Room not found!');

  // 02 Check if the booking already exists
  const booking = await Booking.findOne({
    room: room._id,
    user: payload.user,
    slots: payload.slots,
    date: payload.date,
  });

  if (booking) {
    throw new AppError(httpStatus.CONFLICT, 'The booking already exists!');
  }

  // 03 Calculate total amount based on pricePerSlot and number of slots
  const totalAmount = room.pricePerSlot * payload.slots.length;

  // 04 Create the booking
  const result = await Booking.create({ ...payload, totalAmount });

  // 05 Update the room and slots to set `isBooked` to true
  // 05.1 Update room `isBooked` status
  room.isBooked = true;
  await room.save();

  // 05.2 Update the slots `isBooked` status
  await Slot.updateMany(
    { _id: { $in: payload.slots } }, // Find the slots in the payload
    { $set: { isBooked: true } }, // Set `isBooked` to true
  );

  // 06 Populate and return the result
  const populatedResult = await Booking.findById(result._id)
    .populate('room')
    .populate('slots')
    .populate('user');

  return populatedResult;
};

// GET ALL
const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const bookingQuery = new QueryBuilder(
    Booking.find({ isDeleted: { $ne: true } })
      .populate('room')
      .populate('slots')
      .populate('user'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingQuery.modelQuery;
  const meta = await bookingQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET MY BOOKINGS
const getMyBookingsFromDB = async (
  id: string,
  query: Record<string, unknown>,
) => {
  const user = await User.findById(id);

  if (!user) throw new AppError(httpStatus.NOT_FOUND, 'User not found!');

  const myBookingQuery = new QueryBuilder(
    Booking.find({ user: id, isDeleted: { $ne: true } }, { user: 0 })
      .populate('room')
      .populate('slots'),
    query,
  )
    .search([])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await myBookingQuery.modelQuery;
  const meta = await myBookingQuery.countTotal();

  return {
    meta,
    result,
  };
};

// GET ONE
const getBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found !');
  }

  if (result && result.isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Booking has been deleted!',
    );
  }
  return result;
};

// UPDATE CONFIRM
const updateBookingConfirmIntoDB = async (
  id: string,
  payload: Partial<TBooking>,
) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking not found!');
  }

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

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'This booking not found!');
  }
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getMyBookingsFromDB,
  deleteBookingFromDB,
  updateBookingConfirmIntoDB,
  getBookingFromDB,
};
