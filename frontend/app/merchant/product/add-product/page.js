'use client'
import React, { useEffect, useState } from 'react';
import { ImageIcon, Video } from 'lucide-react';
import { z } from 'zod';

import { CustomForm } from '@/app/components/forms/common-form/my-form';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useCreateProductMutation, useGetProductsByIdQuery, useUpdateProductMutation } from '@/lib/features/products/products';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
// Define product schema
const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price must be positive"),
    discountPrice: z.number().min(0).optional(),
    quantity: z.number().int().min(0, "Quantity must be positive"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string()).min(1, "At least one tag is required"),
    status: z.enum(["PENDING", "APPROVED", "REJECTED", "DRAFT"]),
    images: z.array(z.string()).min(1, "At least one image is required"),
    brand: z.string().optional(),
    videoUrl: z.string().url("Invalid URL").optional(),
    slug: z.string().min(3, "Slug must be at least 3 characters"),
});
// Form fields configuration
const productFormFields = [
    {
        name: 'name',
        label: 'Product Name',
        type: 'text',
        placeholder: 'Enter product name',
        required: true,
    },
    {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Enter product description',
        required: true,
    },
    {
        name: 'price',
        label: 'Price',
        type: 'number',
        placeholder: 'Enter price',
        step: '0.01',
        required: true,
    },
    {
        name: 'discountPrice',
        label: 'Discount Price',
        type: 'number',
        placeholder: 'Enter discount price',
        step: '0.01',
    },
    {
        name: 'quantity',
        label: 'Quantity',
        type: 'number',
        placeholder: 'Enter available quantity',
        required: true,
    },
    {
        name: 'category',
        label: 'Category',
        type: 'select',
        options: [
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'home', label: 'Home' },
            { value: 'beauty', label: 'Beauty' },
            { value: 'sports', label: 'Sports' },
        ],
        required: true,
    },
    {
        name: 'tags',
        label: 'Tags',
        type: 'multiselect',
        options: [
            { value: 'new', label: 'New' },
            { value: 'sale', label: 'Sale' },
            { value: 'popular', label: 'Popular' },
            { value: 'limited', label: 'Limited Edition' },
        ],
        required: true,
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { value: 'PENDING', label: 'Pending' },
            { value: 'APPROVED', label: 'Approved' },
            { value: 'REJECTED', label: 'Rejected' },
            { value: 'DRAFT', label: 'Draft' },
        ],
        required: true,
    },
    {
        name: 'images',
        label: 'Product Images',
        type: 'file',
        accept: 'image/*',
        multiple: true,
        icon: <ImageIcon className="h-4 w-4" />,
        required: true,
    },
    {
        name: 'brand',
        label: 'Brand',
        type: 'text',
        placeholder: 'Enter brand name',
    },
    {
        name: 'videoUrl',
        label: 'Video URL',
        type: 'text',
        placeholder: 'Enter product video URL',
        icon: <Video className="h-4 w-4" />,
    },
    {
        name: 'slug',
        label: 'Product Slug',
        type: 'text',
        placeholder: 'Enter URL slug',
        required: true,
    },
];


const AddProduct = () => {
    const [mode, setMode] = useState('register');
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('rtx');
    const [files, setFiles] = useState([]);

    // API Hooks
    const { data: product, isLoading, isError, refetch } = useGetProductsByIdQuery(productId);
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    // Form initialization
    const form = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: async () => {
            // Return empty defaults initially
            if (!productId) return {
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
            };

            // Fetch and return product data when in edit mode
            try {
                const { data } = await refetch();
                return {
                    name: data?.name || '',
                    description: data?.description || '',
                    price: data?.price || 0,
                    discountPrice: data?.discountPrice || 0,
                    quantity: data?.quantity || 0,
                    category: data?.category || '',
                    tags: data?.tags || [],
                    status: data?.status || 'PENDING',
                    images: data?.images || [],
                    brand: data?.brand || '',
                    videoUrl: data?.videoUrl || '',
                    slug: data?.slug || ''
                };
            } catch (error) {
                console.error("Error loading product:", error);
                return {}; // Return empty object if fetch fails
            }
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
        if (mode === 'edit' && productId) {
            formData.append('id', productId);
        }
        return formData;
    };

    const handleSubmit = async (values) => {
        try {
            const formData = setupInputData(values);

            if (mode === 'edit') {
                await updateProduct(formData).unwrap();
                toast.success('Product updated successfully');
            } else {
                await createProduct(formData).unwrap();
                toast.success('Product created successfully');
            }

            // Reset form and state
            form.reset();
            setFiles([]);

            // Redirect or refetch if needed
            if (mode === 'register') {
                // Optionally redirect to edit page or product list
                // navigate(`/products?rtx=${newProductId}`);
            } else {
                await refetch();
            }
        } catch (error) {
            console.error("Submission error:", error);
            const errorMessage = getErrorMessage(error);
            toast.error(errorMessage);
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

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
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
                        <Label htmlFor="edit-mode">Edit Mode</Label>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                {mode === 'edit' && (
                    <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                        <p className="text-yellow-700">
                            <strong>Edit Mode:</strong> Editing product ID: {productId}
                        </p>
                    </div>
                )}

                <CustomForm
                    form={form}
                    fields={productFormFields}
                    onSubmit={handleSubmit}
                    files={files}
                    setFiles={setFiles}
                    submitButtonText={mode === 'edit' ? 'Update Product' : 'Add Product'}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
};


export default AddProduct;