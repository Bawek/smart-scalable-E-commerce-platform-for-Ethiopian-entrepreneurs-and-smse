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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import CustomDataTable from "@/components/ui/my-components/my-table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useGetAllMerchantsQuery } from "@/lib/features/merchant/registrationApi";
import { imageViewer } from "../lib/imageViewer";
const ManageShops = () => {
    const [merchants, setMerchants] = useState([
        { id: "1", name: "Shop 1", owner: "Owner 1", status: "Active" },]);
    const [selectedShop, setSelectedShop] = useState(null);
    const { data: allMerchants, isLoading, isError } = useGetAllMerchantsQuery();
    const data = allMerchants?.merchant?.map(merchant => ({
        name: `${merchant.account?.firstName} ${merchant.account?.lastName}`, // Corrected field names (firstName -> firstName)
        email: merchant.account?.email,
        status: merchant.status,
        identityCard: merchant.identityCard
    }));

    const [isEditing, setIsEditing] = useState(false);
    const { toast } = useToast()
    const router = useRouter()
    const handleDeleteMerchant = (id) => {
    }
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
            accessorKey: "identityCard",
            header: "Identity Card",
            cell: ({ row }) => (
                <div className="flex items-center justify-center w-12 h-12 rounded-md overflow-hidden">
                    <img
                        src={imageViewer(row.getValue("identityCard"))}  // Access the first item in the array
                        alt="Preview"
                        className="object-cover w-full h-full"
                    />
                </div>
            ),
            enableSorting: true,
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
            accessorKey: "email",
            header: () => <div className="text-right">Email</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("email")}</div>
            },
        },
        {
            accessorKey: "status",
            header: () => <div className="text-right">status</div>,
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
                const currentMerchant = allMerchants?.merchant?.find(m => m?.account?.email === merchant.email)
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
                                    navigator.clipboard.writeText(currentMerchant?.id);
                                    toast({
                                        title: "Copied",
                                        description: <p className="text-black">{currentMerchant?.id}</p>,
                                        variant: "default",
                                        duration: 2000
                                    });
                                }}
                            >
                                Copy merchant ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer hover:bg-amber-100"
                                onClick={() => handleDeleteMerchant(currentMerchant.id)}
                            >
                                Delete merchant
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
                                onClick={() => router.push(`/system-admin/manage-merchants/${currentMerchant?.id}`)}
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
    if (isLoading) {
        return <h1 className="text-center">Loading...</h1>
    }
    if (isError) {
        return <h1 className="text-center">Sorry something wentm wrong please refresh the page Again</h1>
    }
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
