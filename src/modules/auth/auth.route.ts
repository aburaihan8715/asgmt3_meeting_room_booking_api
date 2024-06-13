import { Router } from 'express';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post('/sign-up', AuthControllers.signUpUser);
router.post('/login', AuthControllers.loginUser);

export const AuthRoutes = router;
