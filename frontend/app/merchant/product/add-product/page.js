'use client'
import React, { useEffect, useState } from 'react';
import { ImageIcon, Loader, Video } from 'lucide-react';
import { z } from 'zod';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { useCreateProductMutation, useGetProductsByIdQuery, useUpdateProductMutation } from '@/lib/features/products/products';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'react-toastify';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
const BUSINESS_CATEGORIES = [
    "Retail & Wholesale", "Food & Beverage", "Technology", "Healthcare",
    "Construction", "Transportation", "Education", "Entertainment"
];
// Define product schema
const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.string().min(1, "Price must be positive"),
    discountPrice: z.string().min(1).optional(),
    quantity: z.string().min(1, "Quantity must be positive"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(["PENDING", "SUSPENDED", "ACTIVE"]),
    tags: z.enum([
        "new", "sale", "popular", "limited"
    ]),
    images: z.instanceof(File, { message: "Image required" }),
    brand: z.string().optional(),
    videoUrl: z.string().url("Invalid URL").optional(),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
});
// Form fields configuration
const AddProduct = () => {
    const [mode, setMode] = useState('register');
    const searchParams = new URLSearchParams(window.location.search);
    const [product, setProduct] = useState([])
    const productId = searchParams.get('rtx');
    const [isloading, setIsLoading] = useState(false)
    const [files, setFiles] = useState([]);
    const account = useSelector((state) => state.account)
    const router = useRouter()
    // API Hooks
    const { data, isLoading, isError, refetch } = useGetProductsByIdQuery(productId);
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        if (productId) {
            setProduct(data?.product)
        }
    }, [productId])
    useEffect(() => {
        if (productId) form.reset(data?.product);
    }, [productId, product]);

    // Form initialization
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: data?.product || {
            name: '',
            description: '',
            price: 0,
            discountPrice: 0,
            quantity: 0,
            category: '',
            tags: [],
            status: 'PENDING',
            images: [],
            brand: '',
            videoUrl: '',
            slug: ''
        }
    });
    // Effect to handle mode changes
    useEffect(() => {
        if (productId && product) {
            setMode('edit');
            // Reset form with product data when available
            form.reset({
                ...product,
                images: product.images || [] // Ensure images is always an array
            });
        } else {
            setMode('register');
            form.reset(); // Reset to default values
        }
    }, [productId, product]);

    const setupInputData = (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'images') {
                if (Array.isArray(value)) {
                    value.forEach((file) => formData.append(key, file));
                } else {
                    formData.append(key, value);
                }
            } else if (value !== undefined && value !== null) {
                formData.append(key, value);
            }
        });
        formData.append('accountId', account.id);
        if (mode === 'edit' && productId) {
            formData.append('id', productId);
        }
        return formData;
    };

    const handleSubmit = async (values) => {
        setIsLoading(true)
        try {
            const formData = setupInputData(values);


            if (mode === 'edit') {
                const response = await updateProduct(formData).unwrap();
                if (response.status !== 'success') {
                    return toast.error('Sorry Something went wrong. please try agin.')
                }
                form.reset(response?.product)
                toast.success('Product updated successfully');
                router.push('/merchant/product')
            } else {
                const response = await createProduct(formData).unwrap();
                if (response.status !== 'success') {
                    return toast.error('Sorry Something went wrong. please try agin.')
                }
                toast.success('Product created successfully');
                form.reset();
                setFiles([]);
                router.push('/merchant/product')

            }
            if (mode === 'register') {
                form.reset();
                setFiles([]);

            } else {
                await refetch();
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage);
        }
        finally {
            setIsLoading(false)
        }
    };
    const getErrorMessage = (error) => {
        if (error?.status === 401) return 'Unauthorized - Please login again';
        if (error?.status === 400) return 'Invalid data - Please check your inputs';
        if (error?.data?.message) return error.data.message;
        if (error?.message) return error.message;
        return 'An error occurred';
    };

    if (isLoading && mode === 'edit') {
        return <div className="p-6 text-center">Loading product data...</div>;
    }

    if (isError && mode === 'edit') {
        return <div className="p-6 text-center text-red-500">Error loading product data</div>;
    }

    const renderField = (name, label, renderControl, required = true) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}{required && <span className="text-red-500">*</span>}</FormLabel>
                    <FormControl>{renderControl(field)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6 dark:text-white">
                <h1 className="text-2xl font-bold">
                    {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
                </h1>
                {productId && (
                    <div className="flex items-center space-x-2 dark:text-white">
                        <Switch
                            id="edit-mode"
                            checked={mode === 'edit'}
                            className='dark:text-white dark:bg-white dark:fill-orange-400'
                            onCheckedChange={(checked) => {
                                setMode(checked ? 'edit' : 'register');
                                if (!checked) form.reset();
                            }}
                        />
                        <Label htmlFor="edit-mode">Edit Mode</Label>
                    </div>
                )}
            </div>
            <Card className="w-3/4 md:w-1/2 p-6 mx-auto">
                {mode === 'edit' && (
                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-amber-600  border-l-4 border-yellow-400">
                        <p className="text-yellow-700 dark:text-white">
                            <strong>Edit Mode:</strong> Editing product ID: {productId}
                        </p>
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        {renderField("name", "Product Name", field => (
                            <Input {...field} placeholder='Enter Produt Name' />
                        ))}
                        {renderField("description", "Description", field => (
                            <textarea {...field} className='w-full dark:text-white dark:bg-gray-700' placeholder="here your description" />
                        ))}
                        {renderField("price", "price", field => (
                            <Input {...field} type="number" placeholder='Enter price' className="dark:text-white dark:bg-gray-950" />
                        ))}
                        {renderField("discountPrice", "DiscountPrice", field => (
                            <Input {...field} type="number" placeholder='Enter DiscountPrice' className="dark:text-white dark:bg-gray-950" />
                        ))}
                        {renderField("quantity", "Duantity", field => (
                            <Input {...field} type="number" placeholder='Enter quantity' className="dark:text-white dark:bg-gray-950" />
                        ))}

                        {renderField("category", "Category", field => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {BUSINESS_CATEGORIES.map(category => (
                                            <SelectItem
                                                key={category}
                                                value={category?.toLowerCase().replace(/ & /g, "-")}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ))}
                        {renderField("tags", "tags", field => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select tags" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {[
                                            "new", "sale", "popular", "limited"
                                        ].map(category => (
                                            <SelectItem
                                                key={category}
                                                value={category.toLowerCase().replace(/ & /g, "-")}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ))}
                        {renderField("status", "status", field => (
                            <Select
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {["PENDING", "SUSPENDED", "ACTIVE"].map(category => (
                                            <SelectItem
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        ))}

                        <div className="pt-6 space-y-4">
                            {renderField("brand", "Brand", field => (
                                <Input {...field} />
                            ))}
                            {renderField("videoUrl", "videoUrl", field => (
                                <Input {...field} />
                            ))}
                            {renderField("slug", "slug", field => (
                                <Input {...field} />
                            ))}
                            {renderField("images", " images", ({ onChange }) => (
                                <Input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    multiple
                                    onChange={e => onChange(e.target.files?.[0])}
                                />
                            ))}

                        </div>
                        <Button
                            type="submit"
                            className="bg-orange-600 flex gap-2 items-center hover:bg-orange-700 w-full"
                        >
                            {
                                isloading &&
                                <Loader className='w-6 h-6 animate-spin' />


                            }
                            {isloading ? " Upload Product" : 'uploading...'}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};


export default AddProduct;