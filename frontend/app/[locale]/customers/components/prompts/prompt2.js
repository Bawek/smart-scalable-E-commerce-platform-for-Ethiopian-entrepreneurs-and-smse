'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from '@/components/ui/button';
import { ArrowLeft, Key } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateShopMutation } from '@/lib/features/shop/shop';
const shopFormSchema = z.object({
  name: z.string().min(1, "Shop name is required"),
  slug: z.string().min(1, "Shop slug is required"),
  description: z.string().optional(),
  businessHours: z.string().refine((val) => {
    try {
      JSON.parse(val); // Try parsing the JSON
      return true;
    } catch (e) {
      return false;
    }
  }, "Business hours must be a valid JSON string"),
  logoImageUrl: z.instanceof(File)
    .refine(file => file.size > 0, "shop logo is required")
    .refine(file => ['image/jpeg', 'image/png', 'image/gif'].includes(file.type), "File must be an image (JPEG, PNG, or GIF)"),
});
const ShopRegistration = ({ currentPrompt, setCurrentPrompt }) => {
  const { toast } = useToast();
  const [createShop, { isLoading, isError, isSuccess }] = useCreateShopMutation()
  const [imagePreview, setImagePereview] = useState()
  const form = useForm({
    resolver: zodResolver(shopFormSchema)
  });
  const handleSubmit = async (data) => {
    const formData = new FormData();
    // Append all data fields including merchantId
    Object.entries({ ...data, merchantId: "1864f72d-4dc1-4512-94e3-07f7f236ba52" })
      .forEach(([key, value]) => formData.append(key, value));
    try {
      const response = await createShop(formData).unwrap();
      console.log(response, 'shop response');
      if (response?.status !== "success") {
        return toast({
          title: "Error",
          description: 'Something went wrong',
          variant: 'destructive',
          duration: 2000
        });
      }
      toast({
        title: "Success",
        description: 'Your Shop has been created successfully.',
        duration: 2000
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: 'Something went wrong',
        variant: 'destructive',
        duration: 2000
      });
    }

    console.log(data, 'data');
  };
  return (
    <div className="max-w-[400px] flex flex-col order-none shadow-none items-center mx-auto bg-white p-6 rounded-lg overflow-y-auto">
      <div className='text-center mb-4'>
        <h2 className="text-xl font-semibold">Merchant Registration - Step {currentPrompt}/2</h2>
        <p className="text-gray-600">
          Shop Details
        </p>
      </div>
      <div className='w-full'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div>
              <p>Your Shop Configurations</p>

              {/* Shop Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your Shop Name" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Shop Slug Field */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Slug <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter your Shop Slug" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Shop Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shop Description</FormLabel>
                    <FormControl>
                      <Input type="textarea" placeholder="Enter your Shop Description" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Business Hours Field (JSON) */}
              <FormField
                control={form.control}
                name="businessHours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Hours (JSON)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder='{"monday": {"open": "09:00", "close": "18:00"}}' {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Logo Image URL Field */}
              <FormField
                control={form.control}
                name="logoImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo Image URL</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        placeholder="Upload your Logo Image"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            field.onChange(file);
                            setImagePereview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-4 flex justify-center">
                        <img
                          src={imagePreview}
                          alt="Logo Preview"
                          className="w-[100px] rounded-full h-[100px] max-h-[200px] object-cover"
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6 flex justify-between">
              <Button
                onClick={() => setCurrentPrompt(currentPrompt - 1)}
                className="bg-orange-700"
              >
                <ArrowLeft className="mr-1" size={16} /> Back
              </Button>
              <Button type="submit" className="bg-orange-700">
                Submit
              </Button>
            </div>
          </form>
        </Form >
      </div >

    </div >
  )
}

export default ShopRegistration
