import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SlotControllers } from './slot.controller';
import { SlotValidations } from './slot.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);
router.get('/availability', SlotControllers.getAllSlots);

router
  .route('/:id')
  .get(SlotControllers.getSlot)
  .put(SlotControllers.updateSlot)
  .delete(SlotControllers.deleteSlot);

export const SlotRoutes = router;
