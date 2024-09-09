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
  const result = await BookingServices.getAllBookingsFromDB(req.query);

  if (!result || result?.result.length < 1) {
    return sendNotFoundDataResponse(res);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

// GET ONE
const getBooking = catchAsync(async (req: Request, res: Response) => {
  const booking = await BookingServices.getBookingFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking retrieved successfully!',
    data: booking,
  });
});
// GET MY BOOKINGS
const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getMyBookingsFromDB(
    req.user?.id,
    req.query,
  );

  if (!result || result.result.length < 1)
    return sendNotFoundDataResponse(res);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User bookings retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

// UPDATE
const updateBookingConfirm = catchAsync(
  async (req: Request, res: Response) => {
    const updatedBooking =
      await BookingServices.updateBookingConfirmIntoDB(
        req.params.id,
        req.body,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking updated successfully!',
      data: updatedBooking,
    });
  },
);

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
  updateBookingConfirm,
  deleteBooking,
  getBooking,
};
