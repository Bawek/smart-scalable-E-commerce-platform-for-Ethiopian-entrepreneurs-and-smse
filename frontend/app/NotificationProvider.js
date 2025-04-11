'use client';
import { Button } from '@/components/ui/button';
import { ToastAction, ToastClose } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { addNotification, selectNotifications } from '@/lib/features/notification/notificationSlice';
import { ArrowRightCircle, CheckCheck, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
const notificationSound = typeof window !== 'undefined' ?
    new Audio('/sounds/windows-notification.mp3') : null;
const NotificationProvider = ({ children }) => {
    const dispatch = useDispatch();
    const notifications = useSelector(selectNotifications);
    const { toast } = useToast()
    const [isMuted, setIsMuted] = useState(false);
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission)
            })
        }

        const socket = io('http://localhost:8000', {
            withCredentials: true,
            transports: ['websocket'],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 3000,
        });
        // Add error listener
        socket.on('connect_error', (err) => {
            console.error('Connection Error:', err);
            setIsConnected(false);
        });

        socket.on('reconnect_attempt', (attempt) => {
            console.log(`Reconnection attempt ${attempt}`);
        });
        socket.on('connect', () => {
            setIsConnected(true)
            socket.emit('join-admin-room')
        })

        socket.on('disconnect', () => setIsConnected(false))

        socket.on('new-merchant', (data) => {
            const notification = {
                ...data,
                id: data.merchantId || Date.now()
            };
            dispatch(addNotification(notification));

            toast({
                title: (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-4 w-full p-4 bg-white dark:bg-neutral-900 border border-amber-300 shadow-lg rounded-xl">
                            <div className="flex-shrink-0 pt-1">
                                <ArrowRightCircle className="h-6 w-6 text-amber-600 animate-pulse" />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <div className="text-sm font-semibold text-amber-700 dark:text-amber-400">
                                    ⚡ New Merchant Alert
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    A new merchant has just registered. Check out the details below.
                                </div>

                                <div className="flex items-center gap-2">
                                    <ToastAction
                                        altText="View merchant details"
                                        onClick={() => {
                                            window.location.href = `/system-admin/manage-merchants/${data.merchantId}`;
                                        }}
                                    >
                                        <Link href={`/system-admin/manage-merchants/${data.merchantId}`} className="gap-1 flex items-center text-amber-700 hover:underline">
                                            <ArrowRightCircle className="h-4 w-4" />
                                            Go to Merchant
                                        </Link>
                                    </ToastAction>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                description: null, // handled inside title
                action: (
                    <ToastClose className="ml-auto text-amber-600 hover:bg-amber-100 dark:hover:bg-amber-800/20 p-1 rounded-md transition-colors">
                        <XCircle className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </ToastClose>
                ),
                duration: 2000, // 10 seconds
            });


            if (notificationSound && !isMuted) {
                notificationSound.currentTime = 0
                notificationSound.play().catch(console.error)
            }
        })
        // Add for merchant status updates
        socket.on('merchant-status-changed', (data) => {
            dispatch(updateMerchantStatus(data));

            toast({
                title: `Status Updated: ${data.businessName}`,
                description: 'Congragulation Your Business is Accepted',
                duration: 2000
            });
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('new-merchant');
            socket.off('merchant-status-changed');
            socket.disconnect();
        };
    }, [isMuted, dispatch])
    return children;
};

export default NotificationProvider;