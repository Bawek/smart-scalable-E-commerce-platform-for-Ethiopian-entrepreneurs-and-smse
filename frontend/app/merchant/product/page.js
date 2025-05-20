'use client'
import { useState, useEffect } from 'react';
import InventoryStats from '../components/InventoryStats';
import SearchFilter from '../components/SearchFilter';
import InventoryTable from '../components/InventaryTable';
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useDelete } from '@/hooks/use-delete';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useGetProductsQuery } from '@/lib/features/products/products';
import Loader from '@/app/components/Prompt/Loader';
// Sample data 
const sampleInventory = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    quantity: 15,
    category: "Electronics",
    images: ["/headphones.jpg"]
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    quantity: 3, // Low stock
    category: "Apparel",
    images: ["/tshirt.jpg"]
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    quantity: 0, // Out of stock
    category: "Accessories",
    images: ["/bottle.jpg"]
  },
  {
    id: "4",
    name: "Bluetooth Speaker",
    price: 59.99,
    quantity: 42,
    category: "Electronics",
    images: ["/speaker.jpg"]
  },
  {
    id: "5",
    name: "Yoga Mat",
    price: 29.99,
    quantity: 8, // Low stock
    category: "Fitness",
    images: ["/yoga-mat.jpg"]
  },
  {
    id: "6",
    name: "Espresso Machine",
    price: 199.99,
    quantity: 5, // Low stock
    category: "Home Appliances",
    images: ["/espresso-machine.jpg"]
  },
  {
    id: "7",
    name: "Leather Wallet",
    price: 34.99,
    quantity: 22,
    category: "Accessories",
    images: ["/wallet.jpg"]
  },
  {
    id: "8",
    name: "Smartphone Stand",
    price: 12.99,
    quantity: 0, // Out of stock
    category: "Electronics",
    images: ["/phone-stand.jpg"]
  }
];

export default function Inventory() {

  const [inventory, setInventory] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: prodcutData, isLoading, isError, error } = useGetProductsQuery()
  console.log(prodcutData,'new pro data',inventory)
  const { deleteItem } = useDelete()
  const router = useRouter()
  const handleDelete = async (id) => {
    try {
      deleteItem({
        endpoint: `http://localhost:8000/api/products/delete/${id}`, // Adjust the endpoint as needed
        itemId: id,
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setInventory((prev) => prev.filter((item) => item.id !== id));
          toast.success('Order deleted successfully!'); // Show success message
        },
        onError: (error) => {
          console.error('Error deleting order:', error);
          toast.error('Error deleting the order.'); // Show error message
        },
      })
      // Update the inventory state after deletion
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting the order.'); // Show error message
    }
  };
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.getValue("images")?.[0] || '/placeholder-product.png';
        return (
          <div className="w-12 h-12 rounded-md overflow-hidden border">
            <img
              src={imageUrl}
              alt="Product"
              className="object-cover w-full h-full"
            // onError={(e) => {
            //   e.target.src = '/placeholder-product.png';
            // }}
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 hover:bg-transparent"
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium max-w-[200px] truncate">
          {row.getValue("name")}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "quantity",
      header: () => <div className="text-right">Stock</div>,
      cell: ({ row }) => {
        const quantity = parseInt(row.getValue("quantity"));
        let statusClass = "";

        if (quantity === 0) {
          statusClass = "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
        } else if (quantity < 10) {
          statusClass = "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
        } else {
          statusClass = "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
        }

        return (
          <div className="text-right">
            <Badge className={`${statusClass} rounded-full px-2.5 py-0.5 text-xs font-medium`}>
              {quantity} {quantity === 0 ? "Out of stock" : quantity < 10 ? "Low stock" : "In stock"}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("category");
        return (
          <Badge
            variant="outline"
            className="capitalize text-xs"
          >
            {category}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // Add state here

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  const text = navigator.clipboard.writeText(product.id)
                  // toast must have right ticket 
                  toast.success('Product ID copied to clipboard!');
                }}
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  className='cursor-pointer'
                  href={`/merchant/product/add-product?rtx=${product.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                onClick={(e) => {
                  e.preventDefault(); // Prevent dropdown close
                  setDeleteDialogOpen(true); // Open dialog
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>

            {/* Move AlertDialog outside DropdownMenuContent */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete {product.name}? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenu>
        );
      },
    }
  ];

  // Fetch inventory data
  useEffect(() => {
    setInventory(prodcutData?.products)


  }, [prodcutData]);

  if (isError) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (isLoading) {
    return (
      <div className='w-full flex justify-center items-center'>
        <Loader />
      </div>
    )
  }
  return (
    <div className="min-h-screen pt-0 mt-0">
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-white">Inventory Management</h1>

        {/* Stats Cards */}
        <InventoryStats inventory={inventory} />

        {/* Inventory Table */}
        <div className="relative">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => router.push('/merchant/product/add-product')}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded">
              Add Product
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
            </div>
          ) : (
            <InventoryTable
              data={inventory}
              columns={columns}
            />
          )}
        </div>
      </main>
    </div>
  );
}