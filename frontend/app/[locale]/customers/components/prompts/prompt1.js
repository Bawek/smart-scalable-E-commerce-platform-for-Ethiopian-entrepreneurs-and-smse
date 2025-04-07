'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRegisterLocationMutation } from '@/lib/features/location/locationapi';
import { useRegisterMerchantMutation } from '@/lib/features/merchant/registrationApi';

const businessCategories = [
    "Electrical", "Clothing & Fashion", "Electronics & Gadgets", "Furniture & Home Decor", "Automobile & Spare Parts",
    "Beauty & Cosmetics", "Construction & Building Materials", "Stationery & Books"
];

const schema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    businessPhone: z.string().min(1, "Phone number is required").regex(/^\+?[0-9]*$/, "Phone number is not valid"),
    bussinessEmail: z.string().email("Invalid email address"),
    businessType: z.string().min(1, "Business category is required"),
    ownerName: z.string().min(1, "Owner name is required"),
    identityCard: z
        .instanceof(File)
        .refine(file => file.size > 0, "Identity card is required")
        .refine(file => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), "File must be an image (JPEG, PNG, or GIF)"),
    town: z.string().min(1, "Town is required"),
    region: z.string().min(1, "Region is required"),
    woreda: z.string().min(1, "Region is required"),
    kebele: z.string().min(1, "Kebele is required"),
    cbeAccountNo: z.string().min(1, "CBE account number is required"),
});
const PersonalDetail = ({ currentPrompt }) => {
    const [registerLocation, { isLoading, isError, isSuccess }] = useRegisterLocationMutation();
    const [registerMerchant, { isLoading: mIsLoading, isError: mIsError, isSuccess: mIsSuccess }] = useRegisterMerchantMutation();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const accountId = searchParams.get('accountId');
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(schema)
    });
    const handleSubmit = async (data) => {
        console.log(accountId, 'accountid is here')
        const formData = new FormData();

        // Prepare location data
        const locationData = {
            town: data.town,
            region: data.region,
            kebele: data.kebele,
            woreda: data.woreda,
        };

        // Add all form fields to FormData
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            // Step 1: Register Location
            const locationResponse = await registerLocation(locationData).unwrap();

            if (!locationResponse || locationResponse.status !== "success") {
                return toast({
                    title: "Error",
                    description: "Failed to register location. Please try again.",
                    duration: 2000,
                    variant: "destructive",
                });
            }

            // Step 2: Register Merchant
            formData.append("locationId", locationResponse.location.id);
            formData.append("accountId", accountId);

            const merchantResponse = await registerMerchant(formData).unwrap();

            if (!merchantResponse || merchantResponse.status !== "success") {
                return toast({
                    title: "Error",
                    description: "Failed to register merchant. Please try again.",
                    duration: 2000,
                    variant: "destructive",
                });
            }

            // Success
            toast({
                title: "Success",
                description: "Congratulations! Your Account has been created successfully.",
                duration: 2000,
            });
            router.push("/merchant")
        } catch (error) {
            console.error("Merchant registration error:", error);
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                duration: 2000,
                variant: "destructive",
            });
        }
    };
    return (
        <div className="max-w-[400px] flex flex-col shadow-none items-center mx-auto bg-white p-6 rounded-lg overflow-y-auto">
            <div className='text-center mb-4'>
                <h2 className="text-xl font-semibold">Merchant Informations.</h2>
                <p className="text-gray-600">Business Details</p>
            </div>
            <div className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">

                        {/* Business Name */}
                        <FormField control={form.control} name="businessName" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Name <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input value={field.value || ""} type="text" placeholder="Enter your Business Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Phone Number */}
                        <FormField control={form.control} name="businessPhone" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input value={field.value || ""} type="tel" placeholder="Enter your business phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Business Email */}
                        <FormField control={form.control} name="bussinessEmail" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Email <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Input value={field.value || ""} type="email" placeholder="Enter your Business email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Business Category */}
                        <FormField control={form.control} name="businessType" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Business Category <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a business category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categories</SelectLabel>
                                                {businessCategories.map((category, index) => (
                                                    <SelectItem key={index} value={category.toLowerCase().replace(/ & /g, "-")}>{category}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        {/* Owner Information */}
                        <div className="mt-6">
                            <hr className='w-full' />
                            <h5 className="font-semibold mb-4">Owner Information</h5>
                            <hr className='w-full' />
                            {/* Owner Name */}
                            <FormField control={form.control} name="ownerName" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner Name <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input value={field.value || ""} type="text" placeholder="Enter your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            {/* identity card */}
                            <FormField
                                control={form.control}
                                name="identityCard"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Identity Card <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*" // This ensures only image files are allowed
                                                onChange={(e) => {
                                                    // Handle the file change manually to update the form value
                                                    field.onChange(e.target.files[0]); // Set the first file selected
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* Location Fields */}
                            <div className="flex gap-4">
                                <FormField control={form.control} name="town" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Town <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input value={field.value || ""} type="text" placeholder="Enter your Town" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="woreda" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Woreda <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input value={field.value || ""} type="text" placeholder="Enter your woreda" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            <div className="flex gap-4">
                                <FormField control={form.control} name="region" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Region <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input value={field.value || ""} type="text" placeholder="Enter your Region" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="kebele" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kebele <span className="text-red-500">*</span></FormLabel>
                                        <FormControl>
                                            <Input value={field.value || ""} type="text" placeholder="Enter your Kebele" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>

                            {/* Additional Fields */}
                            <FormField control={form.control} name="cbeAccountNo" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CBE Account Number <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <Input value={field.value || ""} type="tel" placeholder="Enter your CBE Account number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <div className="mt-6 w-full">
                            <Button type="submit" className="bg-orange-700 w-full">
                                {isLoading || mIsLoading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default PersonalDetail;
