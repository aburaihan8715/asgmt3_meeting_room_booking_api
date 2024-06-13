import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUsers);
router
  .route('/:id')
  .get(UserControllers.getUser)
  .patch(UserControllers.updateUser)
  .delete(UserControllers.deleteUser);

export const UserRoutes = router;
