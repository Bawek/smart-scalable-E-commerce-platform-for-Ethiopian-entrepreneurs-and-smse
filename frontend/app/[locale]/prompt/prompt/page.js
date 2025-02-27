'use client'
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useCreateShopMutation } from "@/lib/features/shop/shop";

const prompt = () => {
  const { toast } = useToast()
  const [logoPreview, setLogoPreview] = useState('')
  const [licencePreview, setlicencePreview] = useState('')
  const [createShop, { isLoading, isError, isSuccess }] = useCreateShopMutation()
  const form = useForm();
  const router = useRouter()
  const handleUpload = async (data) => {
    form.setValue('ownerId', '21mebrat')
    try {
      // const response = await createShop(data).unwrap()
      console.log(response,'shop create')
    } catch (error) {
console.log('error on shop create',error)
    }
    console.log(data)
    toast({
      title: "Form Submitted Successfully!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    });
    router.push('/selecttheme')
    redirect
  }
  return (
    <div className="bg-gradient-to-r from-violet-200 to-pink-200 w-screen min-h-screen flex  justify-center items-center">
      <Card className="max-w-[400px] flex flex-col items-center mx-auto my-3">
        <CardHeader className='text-center'>
          <CardTitle>Merchant Registration</CardTitle>
          <CardDescription>
            Create a new merchant account to start selling on our platform.
            Fill out the form below to provide the necessary information for your store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-6">
              {/* bankAccountNumber  */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type='text' placeholder="Enter your Shop Name" {...field} />
                    </FormControl>
                    <FormDescription>Provide the bank account number for payments</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* bankAccountNumber  */}
              <FormField
                control={form.control}
                name="licenceImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Licence Image <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setlicencePreview(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Please upload a valid image file (e.g., PNG, JPG, JPEG).
                    </FormDescription>
                    <FormMessage />
                    <div className="flex items-center justify-center">
                      {licencePreview && (
                        <Image
                          src={URL.createObjectURL(licencePreview)}
                          alt="Selected image"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              {/* hasPhysicalStore */}
              <FormField
                control={form.control}
                name="logo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Shop Logo
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          if (file) {
                            field.onChange(file);
                            setLogoPreview(file);
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Please upload a valid image file (e.g., PNG, JPG, JPEG).
                    </FormDescription>
                    <FormMessage />
                    <div className="flex items-center justify-center">
                      {logoPreview && (
                        <Image
                          src={URL.createObjectURL(logoPreview)}
                          alt="Selected image"
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                      )}
                    </div>
                  </FormItem>
                )}
              />
              <Button className='w-full'>Next</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default prompt;
