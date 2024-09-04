import { Router } from 'express';
import { RoomControllers } from './room.controller';
import validateRequest from '../../middlewares/validateRequest';
import { RoomValidations } from './room.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router
  .route('/')
  .post(
    auth(USER_ROLE.admin),
    validateRequest(RoomValidations.createRoomValidationSchema),
    RoomControllers.createRoom,
  )
  .get(RoomControllers.getAllRooms);

router
  .route('/:id')
  .get(RoomControllers.getRoom)
  .put(auth(USER_ROLE.admin), RoomControllers.updateRoom)
  .delete(auth(USER_ROLE.admin), RoomControllers.deleteRoom);

export const RoomRoutes = router;
