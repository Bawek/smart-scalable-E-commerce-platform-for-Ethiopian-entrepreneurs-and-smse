"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import CustomDataTable from "@/components/ui/my-components/my-table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Dummy shop data (Replace with API call)
const data = [
    { merchantId: "1", name: "Merchant 1", shopName: "Owner 1", status: "Active" },
    { merchantId: "2", name: "Merchant 2", shopName: "Owner 2", status: "Inactive" },
    { merchantId: "3", name: "Merchant 3", shopName: "Owner 3", status: "Active" },
    { merchantId: "4", name: "Merchant 4", shopName: "Owner 4", status: "Pending" },
    { merchantId: "5", name: "Merchant 5", shopName: "Owner 5", status: "Active" },
    { merchantId: "6", name: "Merchant 6", shopName: "Owner 6", status: "Inactive" },
    { merchantId: "7", name: "Merchant 7", shopName: "Owner 7", status: "Active" },
    { merchantId: "8", name: "Merchant 8", shopName: "Owner 8", status: "Pending" },
    { merchantId: "9", name: "Merchant 9", shopName: "Owner 9", status: "Inactive" },
    { merchantId: "10", name: "Merchant 10", shopName: "Owner 10", status: "Active" }
];

const ManageShops = () => {
    const [merchants, setMerchants] = useState([
        { id: "1", name: "Shop 1", owner: "Owner 1", status: "Active" },]);
    const [selectedShop, setSelectedShop] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
    // columns
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
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "merchantId",
            header: "Merchant Id",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("merchantId")}</div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Merchant Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "shopName",
            header: () => <div className="text-right">Shop Name</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("shopName")}</div>
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-right">Shop status</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">
                    <Badge variant={row.getValue("status") === "Active" ? "default" : row.getValue("status") === "Inactive" ? "destructive" : "warning"}>
                        {row.getValue("status")}
                    </Badge>
                </div>
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const merchant = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>merchant Actions</DropdownMenuLabel>

                            <DropdownMenuItem
                                className="cursor-pointer hover:bg-amber-100"
                                onClick={() => {
                                    navigator.clipboard.writeText(merchant.merchantId);
                                    toast({
                                        title: "Copied",
                                        description: <p className="text-black">{merchant?.merchantId}</p>,
                                        variant: "default"
                                    });
                                }}
                            >
                                Copy merchant ID
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => openEditModal(merchant)}
                            >
                                Edit Status
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push(`/system-admin/manage-merchants/${merchant.merchantId}`)}
                            >
                                View Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                );
            },
        }
    ]
    // Open edit modal
    const openEditModal = (shop) => {
        setSelectedShop(shop);
        setIsEditing(true);
    };

    // Save edited shop
    const saveShopChanges = () => {
        setMerchants(merchants.map(shop => (shop.id === selectedShop.id ? selectedShop : shop)));
        setIsEditing(false);
    };

    return (
        <div>
            {/* Edit Shop Modal */}
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogContent>
                    <DialogTitle>Edit Merchant Details</DialogTitle>
                    {selectedShop && (
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={selectedShop.name}
                                onChange={(e) => setSelectedShop({ ...selectedShop, name: e.target.value })}
                                className="border p-2 w-full rounded"
                            />
                            <input
                                type="text"
                                value={selectedShop.shopName}
                                onChange={(e) => setSelectedShop({ ...selectedShop, shopName: e.target.value })}
                                className="border p-2 w-full rounded"
                            />
                            <select
                                value={selectedShop.status}
                                onChange={(e) => setSelectedShop({ ...selectedShop, status: e.target.value })}
                                className="border p-2 w-full rounded"
                            >
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </select>
                            <Button onClick={saveShopChanges} className="w-full">Save Changes</Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
            <div>
                <div className="w-full flex justify-between items-center">
                    <h1 className="text-2xl mx-auto font-semibold text-center text-gray-800">Manage Merchants</h1>
                </div>
                <CustomDataTable
                    data={data}
                    columns={columns}
                    searchColumen="name"
                />
            </div>
        </div>
    );
};

export default ManageShops;
