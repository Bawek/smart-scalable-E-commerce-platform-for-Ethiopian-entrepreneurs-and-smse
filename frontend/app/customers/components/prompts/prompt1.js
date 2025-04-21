"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import ShopRegistration from "./prompt2";
import { useRegisterMerchantMutation } from "@/lib/features/merchant/registrationApi";
import { useRegisterLocationMutation } from "@/lib/features/location/locationapi";
import { useSelector } from "react-redux";

const formSchema = z.object({
    id: z.string().optional(),
    businessName: z.string().min(2, "Business name is required"),
    businessPhone: z.string().min(10, "Valid phone number required"),
    bussinessEmail: z.string().email("Valid email required"),
    businessType: z.string().min(1, "Business category required"),
    ownerName: z.string().min(2, "Owner name required"),
    identityCard: z.instanceof(File).refine(file => file.size <= 5_000_000, "File size must be less than 5MB"),
    town: z.string().min(2, "Town required"),
    woreda: z.string().min(1, "Woreda required"),
    region: z.string().min(2, "Region required"),
    kebele: z.string().min(1, "Kebele required"),
    cbeAccountNo: z.string().min(10, "Valid account number required"),
});
const updateSchema = z.object({
    id: z.string().optional(),
    businessName: z.string().min(2, "Business name is required"),
    businessPhone: z.string().min(10, "Valid phone number required"),
    bussinessEmail: z.string().email("Valid email required"),
    businessType: z.string().min(1, "Business category required"),
    ownerName: z.string().min(2, "Owner name required"),
    cbeAccountNo: z.string().min(10, "Valid account number required"),
});

const businessCategories = [
    "Retail & Wholesale",
    "Food & Beverage",
    "Technology",
    "Healthcare",
    "Construction",
    "Transportation",
    "Education",
    "Entertainment",
];

const MerchantFullRegistration = ({ existingData, onSuccess, mStatus }) => {
    const { toast } = useToast();
    const [editMode, setEditMode] = React.useState(false);
    const accountId = useSelector((state) => state.account.id)
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [registerMerchant, { isLoading, isError }] = useRegisterMerchantMutation()
    const [registerLocation, { isLoading: locationLoading, isError: locationError }] = useRegisterLocationMutation()
    const mode = existingData ? 'update' : 'register'
    console.log(existingData)
    const form = useForm({
        resolver: zodResolver(existingData ? updateSchema : formSchema),
        defaultValues: existingData ? existingData : {
            businessName: "",
            businessPhone: "",
            bussinessEmail: "",
            businessType: "",
            ownerName: "",
            town: "",
            woreda: "",
            region: "",
            kebele: "",
            cbeAccountNo: "",
        }
    });
    useEffect(() => {
        if (existingData) {
            form.reset(existingData)
        }
    }, [])
    const handleSubmit = async (values) => {
        console.log(existingData, values, 'response reg')
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            if (!existingData) {
                const locationResponse = await registerLocation(values).unwrap()
                if (locationResponse.status !== 'success') {
                    return toast({
                        title: "Error",
                        description: "Submission failed",
                        variant: "destructive",
                    });
                }
                formData.append('locationId', locationResponse?.location?.id)
            }
            Object.entries(values).forEach(([key, value]) => {
                if (value instanceof File) formData.append(key, value);
                else if (value) formData.append(key, value);
            });
            formData.append('mode', mode)
            formData.append('accountId', accountId)
            const response = await registerMerchant(formData).unwrap()
            console.log(response, 'update')
            if (response.status !== 'success') throw new Error("Submission failed");
            toast({
                title: "Success!",
                description: existingData ? "Merchant updated" : "Merchant registered",
            });

            if (!existingData) form.reset();
            setEditMode(false);
            onSuccess?.();
        } catch (error) {
            console.log(error, 'response reg')
            toast({
                title: "Error",
                description: error.message || "Submission failed",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full min-h-screen p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {existingData ? "Edit Merchant" : "New Merchant Registration"}
                </h1>

                {existingData && (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <label>Edit Mode</label>
                            <Switch
                                checked={editMode}
                                onCheckedChange={(checked) => {
                                    if (mStatus !== 'PENDING') {
                                        setEditMode(checked);
                                        if (!checked) form.reset(existingData);
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">Business Info</TabsTrigger>
                    <TabsTrigger
                        value="security"
                        disabled={mStatus === 'ACTIVE' ? false : true}
                    >
                        Shop Info
                    </TabsTrigger>
                    <TabsTrigger value="api" disabled>Previews</TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    {
                        mStatus === 'PENDING' ? (
                            <div className="text-orange-500 p-4">
                                🚨 Thankyou for your registration. You will inform you in 12 hours.
                            </div>
                        )
                            :
                            <Card className="mt-6 p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                                        <div className="space-y-4">
                                            <h2 className="text-xl font-semibold mb-4">
                                                {existingData ? "Business Details" : "Business Information"}
                                            </h2>

                                            {/* Business Information Fields */}
                                            <FormField
                                                control={form.control}
                                                name="businessName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Business Name <span className="text-red-500">*</span></FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                disabled={!!existingData && !editMode}
                                                                placeholder="Business Name"

                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="businessPhone"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    disabled={!!existingData && !editMode}
                                                                    placeholder="+251 900 000 000"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="bussinessEmail"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    disabled={!!existingData && !editMode}
                                                                    placeholder="business@example.com"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="businessType"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Category <span className="text-red-500">*</span></FormLabel>
                                                        <Select
                                                            onValueChange={field.onChange}
                                                            value={field.value}
                                                            disabled={!!existingData && !editMode}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select category" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {businessCategories.map((category) => (
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
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Owner Information Section */}
                                            <div className="pt-6 space-y-4">
                                                <h3 className="text-lg font-semibold">Owner Details</h3>

                                                <FormField
                                                    control={form.control}
                                                    name="ownerName"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    disabled={!!existingData && !editMode}
                                                                    placeholder="Owner Name"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="identityCard"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>ID Document {!existingData && <span className="text-red-500">*</span>}</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="file"
                                                                    accept="image/*,application/pdf"
                                                                    onChange={(e) => field.onChange(e.target.files[0])}
                                                                    disabled={!!existingData && editMode || !editMode}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Location Fields */}
                                                {
                                                    !existingData &&
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <FormField
                                                            control={form.control}
                                                            name="region"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Region <span className="text-red-500">*</span></FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            disabled={!!existingData && !editMode}
                                                                            placeholder="Region"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="town"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Town <span className="text-red-500">*</span></FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            disabled={!!existingData && !editMode}
                                                                            placeholder="Town"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="woreda"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Woreda <span className="text-red-500">*</span></FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            disabled={!!existingData && !editMode}
                                                                            placeholder="Woreda"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="kebele"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Kebele <span className="text-red-500">*</span></FormLabel>
                                                                    <FormControl>
                                                                        <Input
                                                                            {...field}
                                                                            disabled={!!existingData && !editMode}
                                                                            placeholder="Kebele"
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                }

                                                <FormField
                                                    control={form.control}
                                                    name="cbeAccountNo"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>CBE Account <span className="text-red-500">*</span></FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    disabled={!!existingData && !editMode}
                                                                    placeholder="Account Number"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Form Actions */}
                                        {(editMode || !existingData) && (
                                            <div className="flex justify-end gap-4">
                                                {existingData && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => {
                                                            form.reset(existingData);
                                                            setEditMode(false);
                                                        }}
                                                        disabled={isSubmitting}
                                                    >
                                                        Cancel
                                                    </Button>
                                                )}
                                                <Button
                                                    type="submit"
                                                    className="bg-blue-600 hover:bg-blue-700"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting
                                                        ? "Processing..."
                                                        : existingData
                                                            ? "Save Changes"
                                                            : "Register Merchant"}
                                                </Button>
                                            </div>
                                        )}
                                    </form>
                                </Form>
                            </Card>
                    }
                </TabsContent>
                <TabsContent value='security'>
                    <ShopRegistration
                        accountId={accountId}
                        editMode={editMode}
                        setEditMode={setEditMode}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MerchantFullRegistration;