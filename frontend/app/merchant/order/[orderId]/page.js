'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    ChevronLeft,
    Download,
    Printer,
    Truck,
    Mail,
    RefreshCw,
    ArrowUpRight,
    MoreVertical
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from '@/components/ui/use-toast'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { StatusIndicator } from './status-indicator' // Your custom component

export default function OrderDetailPage() {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [statusDialogOpen, setStatusDialogOpen] = useState(false)
    const [newStatus, setNewStatus] = useState('')
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)

    // Fetch order data
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`/api/orders/${orderId}`)
                const data = await response.json()
                setOrder(data)
                setNewStatus(data.status)
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to fetch order details',
                    variant: 'destructive'
                })
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId])

    const handleStatusUpdate = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            })

            if (response.ok) {
                setOrder({ ...order, status: newStatus })
                toast({
                    title: 'Success',
                    description: 'Order status updated successfully',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update order status',
                variant: 'destructive'
            })
        } finally {
            setStatusDialogOpen(false)
        }
    }

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`/api/orders/${orderId}/cancel`, {
                method: 'POST',
            })

            if (response.ok) {
                setOrder({ ...order, status: 'CANCELLED' })
                toast({
                    title: 'Success',
                    description: 'Order cancelled successfully',
                })
            }
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to cancel order',
                variant: 'destructive'
            })
        } finally {
            setCancelDialogOpen(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="flex items-center justify-center h-64">
                <p>Order not found</p>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
                <Button variant="outline" size="sm" onClick={() => window.history.back()}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Orders
                </Button>

                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="outline" size="sm">
                        <Printer className="h-4 w-4 mr-2" />
                        Print
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setStatusDialogOpen(true)}>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Update Status
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Resend Confirmation
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setCancelDialogOpen(true)}
                                className="text-red-600"
                            >
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Order
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Order ID</span>
                                    <span className="font-medium">{order.id}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Date</span>
                                    <span className="font-medium">
                                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Status</span>
                                    <Badge variant={order.status.toLowerCase()}>
                                        <StatusIndicator status={order.status} className="mr-2" />
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Method</span>
                                    <span className="font-medium">{order.paymentMethod}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Payment Status</span>
                                    <span className="font-medium">{order.paymentStatus}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Order Items */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Items</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-md overflow-hidden border">
                                            <img
                                                src={item.product.images[0] || '/placeholder-product.png'}
                                                alt={item.product.name}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium">{item.product.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {item.quantity} × ${item.price.toFixed(2)}
                                            </div>
                                            {item.discountPrice && (
                                                <div className="text-sm text-red-600">
                                                    Discount: ${(item.price - item.discountPrice).toFixed(2)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="font-medium">
                                            ${(item.discountPrice || item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Totals and Customer Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="font-medium">
                                    {order.customer.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {order.customer.email}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {order.customer.phone}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping Address</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div>{order.shippingAddress.line1}</div>
                                {order.shippingAddress.line2 && <div>{order.shippingAddress.line2}</div>}
                                <div>
                                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                                </div>
                                <div>{order.shippingAddress.country}</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Order Totals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>${order.shippingCost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" size="sm">
                                <Truck className="h-4 w-4 mr-2" />
                                Track Order
                            </Button>
                            <Button size="sm">
                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                View Invoice
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Status Update Dialog */}
            <AlertDialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Update Order Status</AlertDialogTitle>
                        <AlertDialogDescription>
                            <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-2">
                                    {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                                        <Button
                                            key={status}
                                            variant={newStatus === status ? 'default' : 'outline'}
                                            onClick={() => setNewStatus(status)}
                                        >
                                            <StatusIndicator status={status} className="mr-2" />
                                            {status}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleStatusUpdate}>
                            Update Status
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Cancel Order Dialog */}
            <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will cancel the order and notify the customer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleCancelOrder}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Confirm Cancellation
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}