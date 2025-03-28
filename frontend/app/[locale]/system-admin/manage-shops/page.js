"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";

// Dummy shop data (Replace with API call)
const initialShops = [
  { id: 1, name: "Shop One", owner: "John Doe", status: "Pending" },
  { id: 2, name: "Shop Two", owner: "Jane Smith", status: "Active" },
  { id: 3, name: "Shop Three", owner: "Mike Johnson", status: "Suspended" },
];
const ManageShops = () => {
  const [shops, setShops] = useState(initialShops);
  const [selectedShop, setSelectedShop] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Approve a shop
  const approveShop = (id) => {
    setShops(shops.map(shop => shop.id === id ? { ...shop, status: "Active" } : shop));
  };

  // Reject a shop
  const rejectShop = (id) => {
    setShops(shops.filter(shop => shop.id !== id));
  };

  // Open edit modal
  const openEditModal = (shop) => {
    setSelectedShop(shop);
    setIsEditing(true);
  };

  // Save edited shop
  const saveShopChanges = () => {
    setShops(shops.map(shop => (shop.id === selectedShop.id ? selectedShop : shop)));
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Manage Shops</h1>

      {/* Shop List Table */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.map(shop => (
              <TableRow key={shop.id}>
                <TableCell>{shop.id}</TableCell>
                <TableCell>{shop.name}</TableCell>
                <TableCell>{shop.owner}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-sm rounded ${shop.status === "Active" ? "bg-green-200 text-green-800" : shop.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                    {shop.status}
                  </span>
                </TableCell>
                <TableCell className="flex gap-2">
                  {shop.status === "Pending" && (
                    <>
                      <Button size="sm" onClick={() => approveShop(shop.id)} className="bg-green-500">
                        <CheckCircle className="w-4 h-4" /> Approve
                      </Button>
                      <Button size="sm" onClick={() => rejectShop(shop.id)} className="bg-red-500">
                        <XCircle className="w-4 h-4" /> Reject
                      </Button>
                    </>
                  )}
                  <Button size="sm" onClick={() => openEditModal(shop)} className="bg-blue-500">
                    <Pencil className="w-4 h-4" /> Edit
                  </Button>
                  <Button size="sm" onClick={() => rejectShop(shop.id)} className="bg-gray-500">
                    <Trash2 className="w-4 h-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
    </div>
  );
};

export default ManageShops;
