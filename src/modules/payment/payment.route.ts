import { Router } from 'express';
import { PaymentControllers } from './payment.controller';

const router = Router();

router.post(
  '/create-payment-intent',
  PaymentControllers.createPaymentIntent,
);
router.post('/create-payment', PaymentControllers.createPayment);

export const paymentRoutes = router;
