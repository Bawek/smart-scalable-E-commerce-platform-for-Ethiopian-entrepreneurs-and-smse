'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function SuccessInfoPage() {
  const params = useSearchParams();
  const [paymentData, setPaymentData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tx_ref = params.get('tx_ref');

useEffect(() => {
    const verify = async () => {
      if (!tx_ref) return;
      try {
        const res = await axios.get(`http://localhost:8000/api/verify/${tx_ref}`);
                console.log(res.data, 'response');

setPaymentData(res.data);
console.log(res.data, 'response data');
       
      } catch (err) {
        console.error('Verification failed:', err);
        console.log(err.response.data, 'error response',err);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [tx_ref]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Verifying your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <h2 className="text-xl font-bold">Verification Failed</h2>
        <p className="mt-2">{error}</p>
        <a href="/support" className="mt-4 inline-block text-blue-600">
          Contact Support
        </a>
      </div>
    );
  }
  

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      {console.log(paymentData, 'payment data')}
      <div className="text-green-500 text-6xl mb-4">✓</div>
      <h1 className="text-2xl font-bold mb-2">Payment Confirmed</h1>
      
      <div className="bg-gray-50 p-4 rounded-lg mt-6 text-left space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Amount:</span>
          <span className="font-medium">
            {paymentData.amount} {paymentData.currency}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Reference:</span>
          <span className="font-mono">****{paymentData.tx_ref.slice(-4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="text-green-600 font-medium">Completed</span>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <a
          href="/dashboard"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
        <a
          href="/receipt"
          className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
        >
          View Receipt
        </a>
      </div>
    </div>
  );
}