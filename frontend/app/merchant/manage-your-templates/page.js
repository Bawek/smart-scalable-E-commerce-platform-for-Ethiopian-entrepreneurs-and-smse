'use client'
import React, { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CustomDataTable from "@/components/ui/my-components/my-table";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";
import { useGetAllShopsQuery } from "@/lib/features/shop/shop";
import Loader from "@/app/components/Prompt/Loader";
const MerchantTemplates = () => {
    const router = useRouter()
    const { data, isLoading, isError } = useGetAllShopsQuery()
    console.log(data, isError, 'see data value')

    const handleUseIt = (id) => {

    }
    console.log(data?.shops, 'see shops data')
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
            accessorKey: "logoImageUrl",
            header: "Shop Logo",
            cell: ({ row }) => (
                <div className="flex items-center justify-center w-12 h-12 rounded-md overflow-hidden">
                    <img
                        src={imageViewer(row.getValue("logoImageUrl"))}  // Access the first item in the array
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
                        Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "slug",
            header: () => <div className="text-right">Slug</div>,
            cell: ({ row }) => {
                return <div className="text-right font-medium">{row.getValue("slug")}</div>
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status")}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const template = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Template Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                    navigator.clipboard.writeText(template.id)
                                    toast({
                                        title: "Copied",
                                        description: <p className="text-black">{template?.id}</p>,
                                        variant: "default"
                                    })
                                }}
                            >
                                Copy template Id
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleUseIt(template.id)}
                            >
                                Use It
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => router.push(`/admin-editor/${template.id}`)}
                            >
                                Edit By tool
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        }

    ]
    const { toast } = useToast()
    if (isLoading) {
      return <div className="flex items-center justify-center">
          <Loader />
      </div>
    }
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Template</h1>
            </div>
            <CustomDataTable
                data={data?.shops}
                columns={columns}
                searchColumen="name"
            />
        </div>
    );
};

export default MerchantTemplates;
