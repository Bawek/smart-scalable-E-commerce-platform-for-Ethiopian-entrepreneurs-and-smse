'use client'
import React, { useEffect, useState, useCallback } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import dynamic from 'next/dynamic';

// Constants
const BUSINESS_CATEGORIES = [
    "Clothing", "Food & Beverage", "Electronics",
    "Cosmetics", "Books", "Shoes"
];

const PRODUCT_STATUSES = ["PENDING", "SUSPENDED", "ACTIVE"];

// Define product schema with enhanced validation
const productSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must be less than 100 characters"),
    description: z.string()
        .min(10, "Description must be at least 10 characters")
        .max(1000, "Description must be less than 1000 characters"),
    price: z.string()
        .min(1, "Price must be positive")
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
    discountPrice: z.string()
        .min(0, "Discount price cannot be negative")
        .regex(/^\d+(\.\d{1,2})?$/, "Invalid price format")
        .optional(),
    quantity: z.string()
        .min(1, "Quantity must be positive")
        .regex(/^\d+$/, "Quantity must be a whole number"),
    category: z.string().min(1, "Category is required"),
    status: z.enum(["PENDING", "SUSPENDED", "ACTIVE"]),
    images: z.union([
        z.instanceof(File, { message: "Image is required" }),
        z.string().min(1, "Image is required")
    ]),
    brand: z.string()
        .max(50, "Brand must be less than 50 characters")
        .optional(),
});

// Helper components
const LoadingIndicator = () => (
    <div className="flex justify-center items-center p-6">
        <Loader className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading...</span>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="p-6 text-center text-red-500">
        {message || "Error loading data"}
    </div>
);

// Main component
const AddProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('rtx');
    const account = useSelector((state) => state.account);

    // State management
    const [mode, setMode] = useState(productId ? 'edit' : 'register');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // API Hooks
    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
        error: productError
    } = useGetProductsByIdQuery(productId, { skip: !productId });

    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    // Form initialization
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            price: '0',
            discountPrice: '0',
            quantity: '0',
            category: '',
            status: 'PENDING',
            images: null,
            brand: '',
        }
    });

    // Set form values when product data is available
    useEffect(() => {
        if (productId && productData?.product) {
            const product = productData.product;
            form.reset({
                ...product,
                price: String(product.price),
                discountPrice: String(product.discountPrice || '0'),
                quantity: String(product.quantity),
                images: product.images?.[0] || null
            });
            setPreviewImage(product.images?.[0]);
        }
    }, [productId, productData, form]);

    // Handle image preview
    const handleImageChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue('images', file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [form]);

    // Prepare form data for submission
    const prepareFormData = useCallback((data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                if (key === 'images' && value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === 'string' || typeof value === 'number') {
                    formData.append(key, String(value));
                }
            }
        });

        formData.append('accountId', account.id);
        if (mode === 'edit' && productId) {
            formData.append('id', productId);
        }

        return formData;
    }, [account.id, mode, productId]);

    // Form submission handler
    const onSubmit = useCallback(async (values) => {
        setIsSubmitting(true);
        try {
            const formData = prepareFormData(values);
            const action = mode === 'edit' ? updateProduct : createProduct;

            const response = await action(formData).unwrap();

            if (response.status !== 'success') {
                throw new Error(response.message || 'Operation failed');
            }

            toast.success(`Product ${mode === 'edit' ? 'updated' : 'created'} successfully`);
            router.push('/merchant/product');

            if (mode === 'register') {
                form.reset();
                setPreviewImage(null);
            }
        } catch (error) {
            console.error("Submission error:", error);
            toast.error(error?.data?.message || error.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }, [form, mode, prepareFormData, updateProduct, createProduct, router]);

    // Loading and error states
    if (productId && isProductLoading) {
        return <LoadingIndicator />;
    }

    if (productId && isProductError) {
        return <ErrorMessage message={productError?.data?.message || "Failed to load product"} />;
    }

    // Form field render helper
    const renderField = (name, label, renderControl, required = true) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="mb-4">
                    <FormLabel>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                        {renderControl(field, fieldState)}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold dark:text-white">
                    {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
                </h1>
                {productId && (
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="edit-mode"
                            checked={mode === 'edit'}
                            onCheckedChange={(checked) => {
                                setMode(checked ? 'edit' : 'register');
                                if (!checked) form.reset();
                            }}
                        />
                        <Label htmlFor="edit-mode" className="dark:text-white">
                            Edit Mode
                        </Label>
                    </div>
                )}
            </div>

            <Card className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 md:p-6 mx-auto">
                {mode === 'edit' && (
                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-amber-600 border-l-4 border-yellow-400 rounded">
                        <p className="text-yellow-700 dark:text-white">
                            Editing product: {productData?.product?.name || productId}
                        </p>
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {renderField("name", "Product Name", (field) => (
                            <Input
                                {...field}
                                placeholder="Enter Product Name"
                                className="dark:bg-gray-800 dark:border-gray-700"
                            />
                        ))}

                        {renderField("description", "Description", (field) => (
                            <textarea
                                {...field}
                                rows={4}
                                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                placeholder="Enter product description"
                            />
                        ))}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderField("price", "Price", (field) => (
                                <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter price"
                                    className="dark:bg-gray-800 dark:border-gray-700"
                                />
                            ))}

                            {renderField("discountPrice", "Discount Price", (field) => (
                                <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Enter discount price"
                                    className="dark:bg-gray-800 dark:border-gray-700"
                                />
                            ))}
                        </div>

                        {renderField("quantity", "Quantity", (field) => (
                            <Input
                                {...field}
                                type="number"
                                min="0"
                                placeholder="Enter quantity"
                                className="dark:bg-gray-800 dark:border-gray-700"
                            />
                        ))}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {renderField("category", "Category", (field) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-800">
                                        <SelectGroup>
                                            {BUSINESS_CATEGORIES.map(category => (
                                                <SelectItem
                                                    key={category}
                                                    value={category.toLowerCase().replace(/ & /g, "-")}
                                                    className="dark:hover:bg-gray-700"
                                                >
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ))}

                            {renderField("status", "Status", (field) => (
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="dark:bg-gray-800 dark:border-gray-700">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="dark:bg-gray-800">
                                        <SelectGroup>
                                            {PRODUCT_STATUSES.map(status => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                    className="dark:hover:bg-gray-700"
                                                >
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ))}
                        </div>

                        {renderField("brand", "Brand", (field) => (
                            <Input
                                {...field}
                                placeholder="Enter brand (optional)"
                                className="dark:bg-gray-800 dark:border-gray-700"
                            />
                        ))}

                        {renderField("images", "Product Image", () => (
                            <div className="space-y-2">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="dark:bg-gray-800 dark:border-gray-700"
                                />
                                {(previewImage || (mode === 'edit' && productData?.product?.images?.[0])) && (
                                    <div className="mt-2">
                                        <img
                                            src={previewImage || imageViewer(productData?.product?.images?.[0])}
                                            alt="Product preview"
                                            className="h-40 object-contain border rounded"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                            {isSubmitting
                                ? mode === 'edit'
                                    ? 'Updating...'
                                    : 'Creating...'
                                : mode === 'edit'
                                    ? 'Update Product'
                                    : 'Create Product'}
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

export default AddProduct;