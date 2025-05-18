"use client";
import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { MoreHorizontal, Eye, RefreshCw, FileText, Truck, XCircle } from 'lucide-react';

// Optional: If you have a custom OrderDetails component
// import { OrderDetails } from '@/components/order-details';

import { useToast } from "@/hooks/use-toast";
import CardBarChart from "@/app/components/Cards/CardBarChart";
import CustomDataTable from "@/components/ui/my-components/my-table";
const sampleOrders = [
  {
    id: '1',
    product: {
      name: 'Wireless Headphones',
      category: 'Electronics',
      brand: 'SoundMax',
      price: '49.99',
      discountPrice: '39.99',
      images: ['/images/headphones.jpg'],
    },
    quantity: 2,
    status: 'PENDING',
    createdAt: '2025-05-18T14:30:00Z',
  },
  {
    id: '2',
    product: {
      name: 'Smartphone Case',
      category: 'Accessories',
      brand: 'TechStyle',
      price: '14.99',
      images: ['/images/case.jpg'],
    },
    quantity: 1,
    status: 'PROCESSING',
    createdAt: '2025-05-17T09:15:00Z',
  },
  {
    id: '3',
    product: {
      name: 'Portable Charger',
      category: 'Electronics',
      brand: 'ChargePro',
      price: '29.99',
      discountPrice: '24.99',
      images: ['/images/charger.jpg'],
    },
    quantity: 3,
    status: 'SHIPPED',
    createdAt: '2025-05-16T17:45:00Z',
  },
  {
    id: '4',
    product: {
      name: 'Fitness Tracker',
      category: 'Wearables',
      brand: 'FitLife',
      price: '59.99',
      images: ['/images/fitness.jpg'],
    },
    quantity: 1,
    status: 'DELIVERED',
    createdAt: '2025-05-15T12:00:00Z',
  },
  {
    id: '5',
    product: {
      name: 'Gaming Mouse',
      category: 'Computers',
      brand: 'ClickMaster',
      price: '19.99',
      discountPrice: '14.99',
      images: ['/images/mouse.jpg'],
    },
    quantity: 4,
    status: 'CANCELLED',
    createdAt: '2025-05-14T08:30:00Z',
  },
  {
    id: '6',
    product: {
      name: 'Bluetooth Speaker',
      category: 'Audio',
      brand: 'SoundWave',
      price: '34.99',
      images: ['/images/speaker.jpg'],
    },
    quantity: 2,
    status: 'DELIVERED',
    createdAt: '2025-05-13T10:00:00Z',
  },
  {
    id: '7',
    product: {
      name: 'USB-C Hub',
      category: 'Accessories',
      brand: 'Portify',
      price: '24.99',
      images: ['/images/hub.jpg'],
    },
    quantity: 1,
    status: 'SHIPPED',
    createdAt: '2025-05-12T15:30:00Z',
  },
  {
    id: '8',
    product: {
      name: 'Smart LED Bulb',
      category: 'Home Automation',
      brand: 'BrightLite',
      price: '12.99',
      discountPrice: '9.99',
      images: ['/images/bulb.jpg'],
    },
    quantity: 5,
    status: 'PENDING',
    createdAt: '2025-05-11T18:20:00Z',
  },
];

// const sampleOrder = {
//   id: "order_123456789",
//   createdAt: "2023-11-15T09:32:00Z",
//   updatedAt: "2023-11-16T14:45:00Z",
//   status: "PROCESSING",
//   paymentMethod: "Credit Card",
//   paymentStatus: "PAID",
//   subtotal: 297.97,
//   shippingCost: 9.99,
//   tax: 27.78,
//   total: 335.74,

//   customer: {
//     id: "cust_987654321",
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     phone: "+1 (555) 123-4567"
//   },

//   shippingAddress: {
//     line1: "123 Main Street",
//     line2: "Apt 4B",
//     city: "New York",
//     state: "NY",
//     postalCode: "10001",
//     country: "United States"
//   },

//   items: [
//     {
//       id: "item_001",
//       quantity: 2,
//       price: 99.99,
//       discountPrice: 89.99,
//       product: {
//         id: "prod_123",
//         name: "Wireless Bluetooth Headphones",
//         description: "Premium noise-cancelling wireless headphones",
//         images: [
//           "https://example.com/images/headphones.jpg",
//           "https://example.com/images/headphones-2.jpg"
//         ],
//         category: "Electronics",
//         brand: "AudioMaster",
//         slug: "wireless-bluetooth-headphones"
//       }
//     },
//     {
//       id: "item_002",
//       quantity: 1,
//       price: 98.00,
//       product: {
//         id: "prod_456",
//         name: "Organic Cotton T-Shirt",
//         description: "100% organic cotton unisex t-shirt",
//         images: [
//           "https://example.com/images/tshirt.jpg"
//         ],
//         category: "Apparel",
//         brand: "EcoWear",
//         slug: "organic-cotton-tshirt"
//       }
//     }
//   ],

//   // Optional tracking information
//   tracking: {
//     carrier: "UPS",
//     trackingNumber: "1Z12345E0205271688",
//     estimatedDelivery: "2023-11-20",
//     status: "In Transit",
//     history: [
//       {
//         date: "2023-11-16T08:30:00Z",
//         status: "Shipped",
//         location: "Brooklyn, NY"
//       },
//       {
//         date: "2023-11-15T16:45:00Z",
//         status: "Processed",
//         location: "Brooklyn, NY"
//       }
//     ]
//   },

//   // Payment details (simplified)
//   payment: {
//     transactionId: "txn_789456123",
//     amount: 335.74,
//     currency: "USD",
//     method: "VISA **** 4242",
//     date: "2023-11-15T09:33:12Z"
//   }
// };
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { toast } = useToast()
  const [notification, setNotification] = useState([]);

  const [sseConnection, setSseConnection] = useState(null);
  const storedmerchantId = localStorage.getItem("unique_id");

  function showOrderNotification() {
    toast.success("New Order", {
      description: "A new order has been placed.",
      duration: 5000, // Duration of the notification in ms
    });
  }

  const orderColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all orders"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select order"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "product",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original.product;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md overflow-hidden border">
              <img
                src={product.images[0] || '/placeholder-product.png'}
                alt={product.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = '/placeholder-product.png';
                }}
              />
            </div>
            <div>
              <div className="font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">
                {product.category} • {product.brand || 'No brand'}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = parseFloat(row.original.product.price);
        const discountPrice = parseFloat(row.original.product.discountPrice || "0");
        return (
          <div className="text-right">
            {discountPrice > 0 ? (
              <>
                <span className="line-through text-muted-foreground mr-2">
                  {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
                <span className="font-medium text-red-600">
                  {discountPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </span>
              </>
            ) : (
              <span className="font-medium">
                {price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-right">Quantity</div>,
      cell: ({ row }) => (
        <div className="text-right font-medium">
          {row.original.quantity}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusMap = {
          PENDING: { color: "bg-amber-100 text-amber-800", label: "Pending" },
          PROCESSING: { color: "bg-blue-100 text-blue-800", label: "Processing" },
          SHIPPED: { color: "bg-purple-100 text-purple-800", label: "Shipped" },
          DELIVERED: { color: "bg-green-100 text-green-800", label: "Delivered" },
          CANCELLED: { color: "bg-red-100 text-red-800", label: "Cancelled" },
        };
        return (
          <Badge className={`${statusMap[status]?.color || 'bg-gray-100'} rounded-full px-2.5 py-0.5 text-xs`}>
            {statusMap[status]?.label || status}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "createdAt",
      header: "Order Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-sm">
            {date.toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        const [dialogOpen, setDialogOpen] = useState(false);
        const [actionType, setActionType] = useState(null);

        const handleAction = (type) => {
          setActionType(type);
          setDialogOpen(true);
        };

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Order Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleAction('view')}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction('status')}
                  disabled={order.status === 'DELIVERED' || order.status === 'CANCELLED'}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Update Status
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAction('invoice')}
                  className="text-purple-600"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Invoice
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleAction('tracking')}
                  disabled={order.status === 'PENDING' || order.status === 'CANCELLED'}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Tracking Info
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleAction('cancel')}
                  disabled={order.status === 'DELIVERED' || order.status === 'CANCELLED'}
                  className="text-red-600"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {actionType === 'view' && 'Order Details'}
                    {actionType === 'status' && 'Update Order Status'}
                    {actionType === 'invoice' && 'Generate Invoice'}
                    {actionType === 'tracking' && 'Tracking Information'}
                    {actionType === 'cancel' && 'Confirm Order Cancellation'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {actionType === 'view' && (
                      <OrderDetails order={order} />
                    )}
                    {actionType === 'status' && 'Select the new status for this order'}
                    {actionType === 'invoice' && 'Generate and download the order invoice'}
                    {actionType === 'tracking' && 'View or update shipping tracking information'}
                    {actionType === 'cancel' && `Are you sure you want to cancel order #${order.id}? This action cannot be undone.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      // Handle the action here
                      if (actionType === 'cancel') {
                        // handleCancelOrder(order.id);
                      } else if (actionType === 'status') {
                        // handleStatusUpdate(order.id, newStatus);
                      }
                      setDialogOpen(false);
                    }}
                    className={actionType === 'cancel' ? 'bg-red-600 hover:bg-red-700' : ''}
                  >
                    {actionType === 'cancel' ? 'Confirm Cancellation' : 'Confirm'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        );
      },
    }
  ];
  return (
    <div
    >
      <div className="flex flex-col flex-wrap">
        <CustomDataTable
          data={sampleOrder}
          columns={orderColumns}
          searchColumen={"product"}
        />
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>

    </div>
  );
}

export default OrdersPage;