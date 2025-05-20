'use client';
import React, { useEffect, useState } from 'react';

// Mock API calls
const fetchOrderStatus = async (orderId) => {
    return {
        id: orderId,
        status: 'Processing',
        items: [
            { name: 'Coffee Beans', quantity: 2 },
            { name: 'Ceramic Mug', quantity: 1 },
        ],
        merchant: {
            name: 'Ethiopian Coffee Shop',
            contact: 'merchant@example.com',
        },
        estimatedDelivery: '2024-07-10',
    };
};

const sendMessageToMerchant = async (orderId, message) => {
    return { success: true };
};

export default function OrderPage() {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        fetchOrderStatus('12345').then(setOrder);
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setSending(true);
        await sendMessageToMerchant(order.id, message);
        setSending(false);
        setSent(true);
        setMessage('');
    };

    if (!order) return <div className="text-center text-lg py-10">Loading order details...</div>;

    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>

            <div className="space-y-1 text-gray-700 mb-4">
                <div><span className="font-medium">Order ID:</span> {order.id}</div>
                <div><span className="font-medium">Status:</span> {order.status}</div>
                <div><span className="font-medium">Estimated Delivery:</span> {order.estimatedDelivery}</div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">Items</h3>
            <ul className="list-disc list-inside space-y-1 mb-4">
                {order.items.map((item, idx) => (
                    <li key={idx}>
                        {item.name} × {item.quantity}
                    </li>
                ))}
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-2">Merchant</h3>
            <div className="space-y-1 text-gray-700 mb-4">
                <div><span className="font-medium">Name:</span> {order.merchant.name}</div>
                <div><span className="font-medium">Contact:</span> {order.merchant.contact}</div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-2">Contact Merchant</h3>
            <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message to the merchant..."
                    required
                />
                <button
                    type="submit"
                    disabled={sending || !message.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {sending ? 'Sending...' : 'Send Message'}
                </button>
                {sent && <div className="text-green-600 text-sm">Message sent!</div>}
            </form>
        </div>
    );
}
