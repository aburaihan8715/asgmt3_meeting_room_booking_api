import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';

const router = Router();

router.post(
  '/signup',
  validateRequest(UserValidations.signupValidationSchema),
  UserControllers.signUpUser,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
