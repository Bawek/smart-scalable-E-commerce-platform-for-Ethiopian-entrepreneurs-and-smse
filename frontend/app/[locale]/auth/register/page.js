"use client";
import React, { useState, useEffect } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import Auth from "../../layouts/Auth";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import { useRegisterMutation } from "@/lib/features/auth/authMerchant";
import { useDispatch } from "react-redux";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
import Link from "next/link";
import { fields } from "./data/formControls";
import { merchantRegistrationSchema } from "./data/schema";
import { CustomForm } from "../../components/forms/common-form/my-form";
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
} from "@/components/ui/form";
const i18nNamespaces = ["signup"];

export default function Register() {
  const { locale } = useParams()
  const { toast } = useToast()
  const form = useForm();
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleRegister = async (data) => {
    form.setValue('userId', '21mebrat')
    try {
      const response = await register(data).unwrap()
      console.log(response, 'response fo the merchant ')
      toast({
        title: "Form Submitted Successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        )
      });
      router.push('/prompt/prompt')
      redirect

    } catch (error) {
     console.log('error on merchant registration',error)
    }
  };

  const [translations, setTranslations] = useState({
    t: () => { }, // Placeholder function until translations are loaded
    resources: {},
  });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const { t, resources } = await initTranslations(locale, i18nNamespaces);
        setTranslations({ t, resources });
        console.log("Translations initialized successfully");
      } catch (error) {
        console.error("Error initializing translations:", error);
        // Optionally, handle the error further here
      }
    };

    loadTranslations();
  }, [locale]);

  if (!translations.t) {
    return null; // Or a loading indicator
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={translations.resources}
    >
      <Auth>
        <Card className="max-w-[400px] flex flex-col items-center mx-auto">
          <CardHeader className='text-center'>
            <CardTitle>Merchant Registration</CardTitle>
            <CardDescription>
              Create a new merchant account to start selling on our platform.
              Fill out the form below to provide the necessary information for your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                {/* bankAccountNumber  */}
                <FormField
                  control={form.control}
                  name="bankAccountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        CBE Account Number <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input type='text' placeholder="Enter your bank account number" {...field} />
                      </FormControl>
                      <FormDescription>Provide the bank account number for payments</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* hasPhysicalStore */}
                <FormField
                  control={form.control}
                  name="hasPhysicalStore"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-3">
                        <FormControl>
                          <input className="p-0 focus:outline-none focus:ring" type='checkbox' placeholder="Enter Last Name" {...field} />
                        </FormControl>
                        <FormLabel>
                          Has Physical Store
                        </FormLabel>
                      </div>
                      <FormDescription>Check if you have a physical store.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch('hasPhysicalStore') &&
                  <div>
                    {/* physicalShopName */}
                    < FormField
                      control={form.control}
                      name="physicalShopName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Physical Shop Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter your shop name" {...field} />
                          </FormControl>
                          <FormDescription>The name of your physical shop.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* physicalShopAddress */}
                    <FormField
                      control={form.control}
                      name="physicalShopAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Physical Shop Address <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter your shop address" {...field} />
                          </FormControl>
                          <FormDescription>The address of your physical store.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* physicalShopCity */}
                    <FormField
                      control={form.control}
                      name="physicalShopCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Physical Shop City <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Enter your shop city" {...field} />
                          </FormControl>
                          <FormDescription>The city where your physical shop is located..</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* physicalShopPhoneNumber */}
                    <FormField
                      control={form.control}
                      name="physicalShopPhoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Physical Shop Phone Number <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Enter your shop phone numbe" {...field} />
                          </FormControl>
                          <FormDescription>Contact phone number for your physical store.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                }
                <Button className='w-full'>{isLoading ? 'submiting ...':'Next'}</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
            </p>
          </CardFooter>
        </Card>
      </Auth>
    </TranslationsProvider>
  );
}
