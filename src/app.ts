import express, { Request, Response } from 'express';
import { UserRoutes } from './modules/user/user.route';
import { AuthRoutes } from './modules/auth/auth.route';

const app = express();

//parsers
app.use(express.json());

// HOME ROUTE
app.get('/', (req: Request, res: Response) => {
  res.send('Hello for testing...');
});

app.use('/api/users', UserRoutes);
app.use('/api/auth', AuthRoutes);

export default app;
