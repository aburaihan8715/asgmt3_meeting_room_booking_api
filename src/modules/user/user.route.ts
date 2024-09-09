import { Router } from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = Router();

router.post(
  '/register',
  validateRequest(UserValidations.registerValidationSchema),
  UserControllers.registerUser,
);

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.patch(
  '/make-admin',
  auth(USER_ROLE.admin),
  UserControllers.makeAdmin,
);

export const UserRoutes = router;
