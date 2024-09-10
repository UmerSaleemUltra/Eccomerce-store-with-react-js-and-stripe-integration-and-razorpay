// src/PaymentButton.jsx
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Your Stripe publishable key
const stripePromise = loadStripe('pk_test_51Ptqx509wSWXmHDngNoR39GDEykthEIpHKL4tfsniaz8XMGJGEtpoVJJu5FCbo3tyfgpHy1bj84ZUtE0UJRXzfeM00g5et0OZK');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      alert(`Payment failed: ${error.message}`);
    } else {
      // Simulate successful payment
      alert(`Payment successful! Payment Method ID: ${paymentMethod.id}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        disabled={!stripe}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '10px'
        }}
      >
        Pay
      </button>
    </form>
  );
};

const PaymentButtons = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentButtons;
