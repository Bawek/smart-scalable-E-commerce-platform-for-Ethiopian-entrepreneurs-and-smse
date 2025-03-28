'use client'
import { PlusCircle } from "lucide-react";
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
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import CustomDataTable from "@/components/ui/my-components/my-table";
import { CustomForm } from "../../components/forms/common-form/my-form";
import { fields } from "../lib/template-uload-form-controls";
import { pageSchema } from "../lib/templateValidation";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


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
                                onClick={() => router.push(`manage-template/${template.id}`)}
                            >
                                Edit settings
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
    const [isOpen, setIsOpen] = useState(false)
    const [templates, setTemplates] = useState([])
    const [pages, setPages] = useState([])
    const [file, setFile] = useState()
    const { toast } = useToast()
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
    const handleSubmit = async (data) => {
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
                return toast({
                    title: "Error",
                    description: <code className="text-black"> {response?.error?.message}</code>,
                    variant: "destructive",
                });

            }
            toast({
                title: 'Success',
                description: <p className="text-black"> {response?.data?.message || 'Successfully add the Template'}</p>,
                variant: "default"
            })
            setIsOpen(false)
            router.refresh()
            window.location.reload()

        } catch (error) {
            console.log('template creation error', error)
            toast({
                title: "Error",
                description: <p className="text-black"> {"sorry something go wrong"}</p>,
                variant: "destructive",
            });
        }

    };

    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-800">Manage Template</h1>
                <div className="flex justify-end">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger>
                            <Button className="bg-orange-700">
                                <PlusCircle />
                                Add Template
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="overflow-y-auto max-h-screen">
                            <SheetHeader>
                                <SheetTitle>Add Template</SheetTitle>

                            </SheetHeader>
                            <section>
                                <CustomForm
                                    fields={fields}
                                    onSubmit={handleSubmit}
                                    schema={pageSchema}
                                    file={file}
                                    setFile={setFile}
                                    data={""}
                                />
                            </section>
                        </SheetContent>
                    </Sheet>
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
