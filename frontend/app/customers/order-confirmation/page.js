'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/features/cart/cartSlice';
import useCart from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Loader2, Printer, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const OrderConfirmation = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const txRef = searchParams.get('tx_ref');
    const { emptyCart } = useCart();
    const [status, setStatus] = useState('loading' | 'success' | 'error');
    const [paymentData, setPaymentData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const printRef = useRef(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!txRef) {
                setStatus('error');
                setErrorMessage("Missing transaction reference.");
                return;
            }

            try {
                const res = await axios.get(`${baseUrl}/orders/payment/frontend-check?tx_ref=${txRef}`);
                console.log('Payment verification response:', res.data);
                
                const { data, status: paymentStatus } = res.data;
                setPaymentData(data);

                if (paymentStatus === 'success') {
                    await emptyCart();
                    setStatus('success');
                } else {
                    setStatus('error');
                    setErrorMessage("Payment verification failed. Please try again.");
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('error');
                setErrorMessage(
                    axios.isAxiosError(error) 
                        ? error.response?.data?.message || "Payment verification failed"
                        : "Something went wrong verifying your payment"
                );
            }
        };

        verifyPayment();
    }, []);

    const handlePrint = () => {
       
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Payment Receipt - ${paymentData.tx_ref}</title>
                        <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                            .receipt { max-width: 500px; margin: 0 auto; background: white; padding: 20px; }
                            .header { text-align: center; margin-bottom: 20px; }
                            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
                            .title { font-size: 20px; font-weight: bold; margin: 20px 0; }
                            .section { margin: 15px 0; }
                            .row { display: flex; justify-content: space-between; margin: 8px 0; }
                            .bold { font-weight: bold; }
                            .divider { border-top: 1px dashed #ccc; margin: 15px 0; }
                            .footer { text-align: center; font-size: 12px; margin-top: 30px; color: #666; }
                            .success { color: green; }
                            .failed { color: red; }
                        </style>
                    </head>
                    <body>
                        <div class="receipt">
                            <div class="header">
                                <div class="logo">E-commerce platform</div>
                                <div>Debre Markos Ethiopia</div>
                                <div>Tel: +251 123 456 789 </div>
                            </div>
                            
                            <div class="title">PAYMENT RECEIPT</div>
                            
                            <div class="section">
                                <div class="row">
                                    <span>Receipt No:</span>
                                    <span class="bold">${paymentData.reference}</span>
                                </div>
                                <div class="row">
                                    <span>Date:</span>
                                    <span>${new Date(paymentData.created_at).toLocaleString()}</span>
                                </div>
                            </div>
                            
                            <div class="divider"></div>
                            
                            <div class="section">
                                <div class="row">
                                    <span>Customer:</span>
                                    <span class="bold">${paymentData.first_name} ${paymentData.last_name}</span>
                                </div>
                                <div class="row">
                                    <span>Email:</span>
                                    <span>${paymentData.email}</span>
                                </div>
                                <div class="row">
                                    <span>Phone:</span>
                                    <span>${paymentData.phone_number}</span>
                                </div>
                            </div>
                            
                            <div class="divider"></div>
                            
                            <div class="section">
                                <div class="row">
                                    <span>Transaction Reference:</span>
                                    <span class="bold">${paymentData.tx_ref}</span>
                                </div>
                                <div class="row">
                                    <span>Payment Method:</span>
                                    <span>${paymentData.method.toUpperCase()} (${paymentData.mode.toUpperCase()})</span>
                                </div>
                                <div class="row">
                                    <span>Status:</span>
                                    <span class="${paymentData.status === 'success' ? 'success' : 'failed'} bold">
                                        ${paymentData.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            
                            <div class="divider"></div>
                            
                            <div class="section">
                                <div class="row">
                                    <span>Amount:</span>
                                    <span>${(paymentData.amount - paymentData.charge).toFixed(2)} ${paymentData.currency}</span>
                                </div>
                                <div class="row">
                                    <span>Processing Fee:</span>
                                    <span>${paymentData.charge} ${paymentData.currency}</span>
                                </div>
                                <div class="row bold">
                                    <span>Total Paid:</span>
                                    <span>${paymentData.amount} ${paymentData.currency}</span>
                                </div>
                            </div>
                            
                            <div class="footer">
                                <div>Thank you for your purchase!</div>
                                <div>This receipt serves as your official record of payment.</div>
                                <div>For any inquiries, please contact support@ecommerce.com</div>
                                <div>Generated on: ${new Date().toLocaleString()}</div>
                            </div>
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            
            // Wait for content to load before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 200);
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                <h2 className="text-xl font-semibold">Verifying Payment</h2>
                <p className="text-gray-500">Please wait while we confirm your transaction...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="max-w-md mx-auto p-6 text-center">
                <div className="bg-red-50 rounded-lg p-6">
                    <XCircle className="w-16 h-16 mx-auto text-red-600 mb-4" />
                    <h1 className="text-2xl font-bold text-red-800 mb-2">Payment Issue</h1>
                    <p className="text-gray-700 mb-4">{errorMessage}</p>
                    <div className="flex gap-4 justify-center">
                        <Button 
                            variant="outline"
                            onClick={() => router.push('/customers/cart')}
                        >
                            Back to Cart
                        </Button>
                        <Button 
                            onClick={() => router.push('/customers/placeOrder')}
                        >
                            Try Checkout Again
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="bg-green-50 rounded-lg p-6 text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
                <h1 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h1>
                
                <div className="bg-white p-4 rounded-md mb-4 text-left">
                    <p className="font-medium">Transaction Reference:</p>
                    <p className="font-mono bg-gray-100 p-2 rounded">{txRef}</p>
                </div>
                
                <div className="flex flex-col gap-3">
                    <Button 
                        onClick={handlePrint}
                        className="gap-2"
                    >
                        <Printer className="w-5 h-5" />
                        Print Receipt
                    </Button>
                    <Button 
                        variant="outline"
                        onClick={() => router.push('/customers/order')}
                        className="gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        View Your Orders
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;