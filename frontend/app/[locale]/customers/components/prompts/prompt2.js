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
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
  logoImageUrl: z.string().url().optional(),
});
const ShopRegistration = ({ currentPrompt, setCurrentPrompt }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(shopFormSchema)
  });
  const handleSubmit = async (data) => {

    console.log(data, 'data')

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
                      <Input type="text" placeholder="Enter your Shop Description" {...field} value={field.value || ""} />
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
                      <Input type="text" placeholder="Enter your Logo Image URL" {...field} value={field.value || ""} />
                    </FormControl>
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
