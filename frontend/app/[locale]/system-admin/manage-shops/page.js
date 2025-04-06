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

// Dummy shop data (Replace with API call)
const data = [
  { shopId: "1", name: "Shop 1", owner: "Owner 1", status: "Active" },
  { shopId: "2", name: "Shop 2", owner: "Owner 2", status: "Inactive" },
  { shopId: "3", name: "Shop 3", owner: "Owner 3", status: "Active" },
  { shopId: "4", name: "Shop 4", owner: "Owner 4", status: "Pending" },
  { shopId: "5", name: "Shop 5", owner: "Owner 5", status: "Active" },
  { shopId: "6", name: "Shop 6", owner: "Owner 6", status: "Inactive" },
  { shopId: "7", name: "Shop 7", owner: "Owner 7", status: "Active" },
  { shopId: "8", name: "Shop 8", owner: "Owner 8", status: "Pending" },
  { shopId: "9", name: "Shop 9", owner: "Owner 9", status: "Inactive" },
  { shopId: "10", name: "Shop 10", owner: "Owner 10", status: "Active" }
];
const ManageShops = () => {
  const [shops, setShops] = useState(data);
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
      accessorKey: "shopId",
      header: "Shop Id",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("shopId")}</div>
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
            Shop Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "owner",
      header: () => <div className="text-right">Shop Owner</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue("owner")}</div>
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
        const shop = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Shop Actions</DropdownMenuLabel>

              <DropdownMenuItem
                className="cursor-pointer hover:bg-amber-100"
                onClick={() => {
                  navigator.clipboard.writeText(shop.shopId);
                  toast({
                    title: "Copied",
                    description: <p className="text-black">{shop?.shopId}</p>,
                    variant: "default"
                  });
                }}
              >
                Copy Shop ID
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => openEditModal(shop)}
              >
                Edit Status
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => router.push(`/system-admin/manage-shops/${shop.shopId}`)}
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
    setShops(shops.map(shop => (shop.shopId === selectedShop.shopId ? selectedShop : shop)));
    setIsEditing(false);
  };

  return (
    <div className="">
      {/* Edit Shop Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogTitle>Edit Shop Details</DialogTitle>
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
                value={selectedShop.owner}
                onChange={(e) => setSelectedShop({ ...selectedShop, owner: e.target.value })}
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
        <div className="flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-2xl mx-auto font-semibold text-gray-800">Manage Shops</h1>
        </div>
        <CustomDataTable
          data={shops}
          columns={columns}
          searchColumen="name"
        />
      </div>
    </div>
  );
};

export default ManageShops;
