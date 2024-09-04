import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerValidationSchema),
  UserControllers.registerUser,
);

export const UserRoutes = router;
