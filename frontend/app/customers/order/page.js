'use client';

import React, { useEffect, useState } from 'react';

// ✅ Simulate fetch call
const fetchOrderStatus = async (orderId) => {
    // Simulated API response
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

// ✅ Simulate message sender
const sendMessageToMerchant = async (orderId, message) => {
    return { success: true };
};

export default function OrderPage() {
    const [order, setOrder] = useState (null);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        fetchOrderStatus('ORD-12345').then(setOrder);
    }, []);

    useEffect(() => {
        if (sent) {
            const timer = setTimeout(() => setSent(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [sent]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        setSending(true);
        await sendMessageToMerchant(order.id, message);
        setSending(false);
        setSent(true);
        setMessage('');
    };

    if (!order) {
        return (
            <div className="flex items-center justify-center min-h-screen text-lg font-medium">
                🔄 Loading your order...
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">📦 Track Your Order</h1>

            <section className="bg-white shadow rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Details</h2>
                <div className="space-y-2 text-gray-600">
                    <p><span className="font-medium">🆔 Order ID:</span> {order.id}</p>
                    <p><span className="font-medium">📌 Status:</span> {order.status}</p>
                    <p><span className="font-medium">📅 Estimated Delivery:</span> {order.estimatedDelivery}</p>
                </div>
            </section>

            <section className="bg-white shadow rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">🛒 Items Ordered</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {order.items.map((itemy, index) => (
                        <li key={index}>{item.name} × {item.quantity}</li>
                    ))}
                </ul>
            </section>

            <section className="bg-white shadow rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">🏪 Merchant Info</h2>
                <p><span className="font-medium">Name:</span> {order.merchant.name}</p>
                <p><span className="font-medium">Contact:</span> {order.merchant.contact}</p>
            </section>

            <section className="bg-white shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">✉️ Contact Merchant</h2>
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Write your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={sending || !message.trim()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                    >
                        {sending ? 'Sending...' : 'Send Message'}
                    </button>
                    {sent && (
                        <div className="text-green-600 text-sm">✅ Message sent successfully!</div>
                    )}
                </form>
            </section>
        </div>
    );
}
