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
app.use(
  cors({
    origin: [
      'https://meeting-room-booking-client.netlify.app',
      'http://localhost:5173',
    ],
    credentials: true,
  }),
);

// HOME ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Hello for testing...');
});

// ROUTES
app.use('/api', router);

// NOT FOUND ROUTE HANDLER
app.use(notFoundRouteHandler);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
