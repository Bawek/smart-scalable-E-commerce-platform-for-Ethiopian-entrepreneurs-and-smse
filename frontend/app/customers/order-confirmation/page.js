'use client'

import { useSearchParams } from 'next/navigation'; // or 'react-router-dom' if using CRA
import { useEffect } from 'react';
import { useRouter } from "next/router";
import useCart from '@/hooks/use-cart';

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
      const router = useRouter();
  const { emptyCart } = useCart(); // your function to clear the cart

  useEffect(() => {
    const { success } = router.query;
    if (success === "true") {
      emptyCart(); 
    }
  }, [router.query]);
    const success = searchParams.get('success');
    const txRef = searchParams.get('tx_ref');

    return (
        <div className="p-4 text-center">
            {success === 'true' ? (
                <div>
                    <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
                    <p>Transaction Reference: <strong>{txRef}</strong></p>
                    <p>Thank you for your purchase!</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
                    <p>We could not confirm your payment. Please try again.</p>
                </div>
            )}
        </div>
    );
};

export default OrderConfirmation;
