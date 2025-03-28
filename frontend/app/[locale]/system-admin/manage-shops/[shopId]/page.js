"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const ShopDetail = ({ params }) => {
    const router = useRouter();
    const [shop, setShop] = useState([
        { id: "1", name: "Shop 1", owner: "Owner 1", status: "Active" },]);
    useEffect(() => {
        // Fetch shop details (replace with actual API call)
        const fetchShop = async () => {
            try {
                const response = await fetch(`/api/shops/${params.id}`);
                if (!response.ok) throw new Error("Failed to fetch shop details");
                const data = await response.json();
                setShop(data);
            } catch (error) {
                toast.error("Error fetching shop details");
            }
        };

        if (params?.id) fetchShop();
    }, [params?.id]);

    if (!shop) {
        return <p className="text-center text-gray-500">Loading shop details...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{shop.name}</h1>
            <p className="text-gray-700"><strong>Owner:</strong> {shop.owner}</p>
            <p className="text-gray-700"><strong>Status:</strong> {shop.status}</p>
            <p className="text-gray-700"><strong>Price:</strong> ${shop.price}</p>

            <div className="mt-6 flex gap-4">
                <Button onClick={() => router.push(`/manage-shop/${shop.id}`)}>Manage Shop</Button>
                <Button variant="destructive" onClick={() => toast.success("Shop deleted")}>
                    Delete Shop
                </Button>
            </div>
        </div>
    );
};

export default ShopDetail;
