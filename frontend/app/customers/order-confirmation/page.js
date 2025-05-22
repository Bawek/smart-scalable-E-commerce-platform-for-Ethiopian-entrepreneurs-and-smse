'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/features/cart/cartSlice';
import useCart from '@/hooks/use-cart';

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const txRef = searchParams.get('tx_ref');
    const { emptyCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!txRef) {
                setErrorMessage("Missing transaction reference.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(`${baseUrl}/orders/payment/frontend-check?tx_ref=${txRef}`);
                console.log(res,'chapte fessjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                const { data,status } = res.data
                if (status === 'success') {
                    emptyCart();
                    setTimeout(() => {
                        // router.replace('/customers/order');
                    }, 2000);
                } else {
                    // Redirect to checkout on failure
                    setTimeout(() => {
                        // router.replace('/customers/placeOrder');
                    }, 3000);
                    setErrorMessage("Payment verification failed. You will be redirected shortly.");
                }
            } catch (error) {
                setTimeout(() => {
                    // router.replace('/customers/cart');
                }, 3000);
                setErrorMessage("Something went wrong verifying your payment. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, []);

    if (loading) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-xl font-semibold text-gray-700">Verifying your payment...</h1>
                <p className="text-gray-500 mt-2">Please wait, this may take a few seconds.</p>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
                <p className="text-gray-700 mt-2">{errorMessage}</p>
            </div>
        );
    }
    if (!loading && !errorMessage && txRef) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
                <p>Transaction Reference: <strong>{txRef}</strong></p>
                <p className="mt-2 mb-4">Thank you for your purchase!</p>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => window.print()}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        🖨️ Print Receipt
                    </button>

                    <button
                        onClick={() => router.push('/customers/order')}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        📦 Go to My Orders
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-green-600">Payment Successful ✅</h1>
            <p>Transaction Reference: <strong>{txRef}</strong></p>
            <p className="mt-2">Thank you for your purchase. Redirecting you to your orders...</p>
        </div>
    );
};

export default OrderConfirmation;
