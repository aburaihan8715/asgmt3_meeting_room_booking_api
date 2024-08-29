import express, { Request, Response } from 'express';

import globalErrorHandler from './middlewares/globalErrorHandler';

import notFoundRouteHandler from './middlewares/notFoundRouteHandler';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes';

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
app.use('/api', router);
// app.use('/api/users', UserRoutes);
// app.use('/api/auth', AuthRoutes);
// app.use('/api/rooms', RoomRoutes);
// app.use('/api/slots', SlotRoutes);
// app.use('/api/bookings', Routes.bookingRoutes);
// app.use('/api/my-bookings', Routes.myBookingRoutes);

// NOT FOUND ROUTE HANDLER
app.use(notFoundRouteHandler);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
