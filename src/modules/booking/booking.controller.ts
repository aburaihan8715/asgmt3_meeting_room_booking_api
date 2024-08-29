import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { BookingServices } from './booking.service';
import sendNotFoundDataResponse from '../../utils/sendNotFoundDataResponse';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

// CREATE
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const newBooking = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully !',
    data: newBooking,
  });
});

// GET ALL
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingServices.getAllBookingsFromDB();

  if (!bookings || bookings.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully!',
    data: bookings,
  });
});

// GET MY BOOKINGS
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const myBookings = await BookingServices.getMyBookingsFromDB(
    req.user?.id,
  );

  if (!myBookings || myBookings.length < 1)
    return sendNotFoundDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully!',
    data: myBookings,
  });
});

// UPDATE
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const updatedBooking = await BookingServices.updateBookingInDB(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking updated successfully!',
    data: updatedBooking,
  });
});

// DELETE
const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const deletedBooking = await BookingServices.deleteBookingFromDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
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
