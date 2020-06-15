import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe('pk_test_6hdy9n7Gzn1dOukWsM9MTTwB00g57LkBi6');

export const bookTour = async (tourID) => {
  try {
    // 1) Get checkout session from backend API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourID}`);

    // 2) Create checkout form and charge the credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
