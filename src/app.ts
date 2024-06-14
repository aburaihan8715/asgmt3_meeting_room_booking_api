import express, { Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import { RoomRoutes } from './modules/room/room.route';
import notFoundRouteHandler from './middlewares/notFoundRouteHandler';

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());

// HOME ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Hello for testing...');
});

// ROUTES
app.use('/api/auth', UserRoutes);
app.use('/api/rooms', RoomRoutes);

// NOT FOUND ROUTE HANDLER
app.use(notFoundRouteHandler);

// GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;
