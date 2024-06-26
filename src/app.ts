import express, { Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { RoomRoutes } from './modules/room/room.route';
import notFoundRouteHandler from './middlewares/notFoundRouteHandler';
import { SlotRoutes } from './modules/slot/slot.route';
import { Routes } from './modules/booking/booking.route';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// HOME ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Hello for testing...');
});

// ROUTES
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);
app.use('/api/slots', SlotRoutes);
app.use('/api/bookings', Routes.bookingRoutes);
app.use('/api/my-bookings', Routes.myBookingRoutes);

// NOT FOUND ROUTE HANDLER
app.use(notFoundRouteHandler);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
