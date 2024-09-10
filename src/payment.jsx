// src/PaymentButton.jsx
import React from 'react';

const PaymentButton = ({ product }) => {
  const handlePayment = () => {
    const options = {
      key: 'rzp_test_GQ6XaPC6gMPNwH', // Enter the Key ID you got from Razorpay
      amount: product.price * 100, // Amount in paise (₹10 = 1000 paise)
      currency: 'USD',
      name: product.title,
      description: 'Payment for ' + product.title,
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Sidiq',
        email: 'customer@example.com',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Pay ₹{product.price}
    </button>
  );
};

export default PaymentButton;
