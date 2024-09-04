import Stripe from 'stripe';
// const stripe = new Stripe(`${process.env.PAYMENT_SECRET_KEY}`);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// CREATE
const createPaymentIntentIntoStripe = async (payload: {
  price: number;
}) => {
  const amount = Math.trunc(payload.price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  return { clientSecret: paymentIntent.client_secret };
};

const createPaymentIntoDB = async () => {
  return null;
};

export const PaymentServices = {
  createPaymentIntentIntoStripe,
  createPaymentIntoDB,
};
