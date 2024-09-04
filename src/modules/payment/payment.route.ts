import { Router } from 'express';
import { PaymentControllers } from './payment.controller';
import { PaymentValidations } from './payment.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-payment-intent',
  PaymentControllers.createPaymentIntent,
);
router.post(
  '/create-payment',
  validateRequest(PaymentValidations.createPaymentValidation),
  PaymentControllers.createPayment,
);

export const paymentRoutes = router;
