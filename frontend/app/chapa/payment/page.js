'use client';
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const CHAPA_AUTH = 'CHASECK_TEST-m3tB5LFZotXUjIRE8xg1DsuwdM5zEZxH'; // Store your Chapa secret key in .env (DO NOT COMMIT THIS DIRECTLY)
  const TEXT_REF = 'chewatatest-' + Date.now(); // Unique reference for the transaction

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.chapa.co/v1/transaction/initialize',
        {
          amount: parseFloat(amount), // Parse amount as a float
          email: email, // Use the state variable
          first_name: 'Bilen', // Corrected first name
          last_name: 'Gizachew',
          phone_number: phone_number, // Use the state variable
          public_key: CHAPA_AUTH,
          tx_ref: TEXT_REF,
        },
        {
          headers: {
            Authorization: `Bearer ${CHAPA_AUTH}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirect to Chapa's checkout URL
      window.location.href = response.data.data.checkout_url; // Corrected path to checkout_url
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment creation failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Make Payment</h1>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone_number}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}