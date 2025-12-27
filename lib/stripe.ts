import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn('Stripe publishable key missing. Make sure to set VITE_STRIPE_PUBLISHABLE_KEY in your .env file.');
}

export const getStripe = () => {
    return loadStripe(stripePublishableKey || '');
};
