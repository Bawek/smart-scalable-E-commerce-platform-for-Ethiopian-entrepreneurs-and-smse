'use client'
import { PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CustomDataTable from "@/components/ui/my-components/my-table";


const data = [
    {
        id: "m5gr84i9",
        price: 316,
        status: "published",
        name: "modern glove", // The template name you'd like
    },
    {
        id: "3u1reuv4",
        price: 242,
        status: "published",
        name: "classic leather", // Another example name
    },
    {
        id: "derv1ws0",
        price: 837,
        status: "pending",
        name: "vintage style",
    },
    {
        id: "5kma53ae",
        price: 874,
        status: "published",
        name: "sporty design",
    },
    {
        id: "bhqecj4p",
        price: 721,
        status: "Unfinished",
        name: "premium quality",
    },
];
const Templates = () => {
    const router = useRouter()
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
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("status")}</div>
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
                        Name
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
        },
        {
            accessorKey: "price",
            header: () => <div className="text-right">Price</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"))

                // Format the price as a dollar price
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(price)

                return <div className="text-right font-medium">{formatted}</div>
            },
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
                                onClick={() => navigator.clipboard.writeText(template)}
                            >
                                Copy template
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push(`manage-template/${template.id}`)}
                            >
                                Update settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => router.push(`/admin-editor/${template.id}`)}
                            >
                                Edit content
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        }

    ]
    const [name, setName] = useState("");
    const [showPopup, setShowPopup] = useState(false)
    const [templates, setTemplates] = useState([])
    const [pages, setPages] = useState([])
    // const currentPageId = useSelector((state)=>state.currentPageId)
    const [file, setFile] = useState()
    const { toast } = useToast()
    //   const { pageStore } = useSelector((state) => state);
    //   const { pages } = pageStore;

    const fetchTemplates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/templates/get-all')
            console.log(response)
            if (response.data.status === 'published",') {

                setTemplates(response.data?.templates)
            }

        } catch (error) {
            console.log('template creation error', error)
        }
    }
    useEffect(() => {
        fetchTemplates()
    }, [])
    const closeModal = () => {
        setShowPopup(!showPopup)
    }
    const handleSubmit = async (data) => {
        console.log(data)
        toast({
            title: "Unauthorized",
            description: <code> {JSON.stringify(data)}</code>,
            variant: "destructive",
        });
        // setShowPopup(false)
        const formData = new FormData()
        formData.append('status', data.status)
        formData.append('templateName', data.templateName)
        formData.append('templatePrice', data.templatePrice)
        formData.append('PreviewImage', data.PreviewImage)
        formData.append('description', data.description)
        try {
            const response = await axios.post('http://localhost:8000/api/templates/register', formData)
            console.log(response)
            if (response.data.status !== 'success') {
                toast({
                    title: 'Error',
                    description: response?.error?.message
                })
            }
            setShowPopup(false)
            toast({
                title: 'Success',
                description: response?.data?.message
            })
            router.refresh()
            window.location.reload()

        } catch (error) {
            console.log('template creation error', error)
            toast.error('something go wrong')
        }

    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Template</h1>
                <div className="flex justify-end">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle />
                                Add Template
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
 
                            <form className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" value="Pedro Duarte" className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" value="@peduarte" className="col-span-3" />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <CustomDataTable
                data={data}
                columns={columns}
                searchColumen="name"
            />
        </div>
    );
};

export default Templates;
