import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const bookingRoutes = Router();
const myBookingRoutes = Router();

myBookingRoutes.get(
  '/',
  auth(USER_ROLE.user),
  BookingControllers.getMyBookings,
);

bookingRoutes
  .route('/')
  .post(
    auth(USER_ROLE.user),
    validateRequest(BookingValidations.createBookingValidationSchema),
    BookingControllers.createBooking,
  )
  .get(auth(USER_ROLE.admin), BookingControllers.getAllBookings);

bookingRoutes
  .route('/:id')
  .patch(
    auth(USER_ROLE.admin),
    validateRequest(BookingValidations.updateBookingValidationSchema),
    BookingControllers.updateBookingConfirm,
  )
  .delete(auth(USER_ROLE.admin), BookingControllers.deleteBooking)
  .get(auth(USER_ROLE.admin), BookingControllers.getBooking);

export const Routes = {
  bookingRoutes,
  myBookingRoutes,
};
