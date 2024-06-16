import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// CREATE
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const newBooking = await BookingServices.createBookingIntoDB(req.body);

  if (!newBooking) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Failed to creating new booking in DB',
    );
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: newBooking,
  });
});

// GET ALL
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingServices.getAllBookingsFromDB();

  if (!bookings || bookings.length < 1) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'All bookings retrieved successfully!',
    data: bookings,
  });
});

// GET MY BOOKINGS
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const user = await User.findById(req.user?.id);

  if (!user) throw new AppError(404, 'User not found!');

  const booking = await BookingServices.getMyBookingsFromDB(user._id);

  if (!booking || booking.length < 1) return sendNotFoundDataResponse(res);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User bookings retrieved successfully!',
    data: booking,
  });
});

// UPDATE
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const updatedBooking = await BookingServices.updateBookingInDB(
    req.params.id,
    req.body,
  );

  if (!updatedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to update booking in DB');
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully"!',
    data: updatedBooking,
  });
});

// DELETE
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const deletedBooking = await BookingServices.deleteBookingFromDB(
    req.params.id,
  );

  if (!deletedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete booking in DB');
  }
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully!',
    data: deletedBooking,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyBookings,
  updateBooking,
  deleteBooking,
};
