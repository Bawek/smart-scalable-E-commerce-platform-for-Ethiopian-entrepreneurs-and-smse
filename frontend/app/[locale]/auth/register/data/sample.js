"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select } from "@/components/ui/select";
import axios from "axios";
import { useRegisterMutation } from "@/lib/features/auth/authCustomer";
import Loader from "../../components/Prompt/Loader";
import Auth from "../../layouts/Auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Validation Schema
const merchantSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  shopName: z.string().min(2, "Shop name is required"),
  shopLogo: z.string().url("Invalid logo URL"),
  sellingPermission: z.string().url("Invalid document URL"),
  bankAccountNumber: z.string().min(10, "Bank account number must be at least 10 digits"),
  hasPhysicalStore: z.boolean(),
  physicalShopName: z.string().min(2, "Shop name is required").optional(),
  physicalShopAddress: z.string().min(5, "Shop address is required").optional(),
  physicalShopCity: z.string().min(2, "City is required").optional(),
  physicalShopPhoneNumber: z.string().min(10, "Phone number is required").optional(),
  onlineShopType: z.string().min(1, "Shop type is required"),
});

export default function MerchantRegistrationPage() {
  const [step, setStep] = useState(1);
  const form = useForm({
    resolver: zodResolver(merchantSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, setValue, watch, formState: { errors, isValid } } = form;
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/merchants/register", data);
      alert("Merchant registered! Waiting for admin approval.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.url) {
        setValue(field, result.url);
      } else {
        alert("Upload failed");
      }
    }
  };

  return (
    <Auth>
        {isRegistering && <Loader />}
        <Card className="max-w-lg w-full mx-auto">
          <CardHeader>
            <CardTitle>Merchant Registration</CardTitle>

          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 2: Shop Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="shopName" render={({ field }) => (
                        <FormItem>
                        <FormLabel>Shop Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your shop name" />
                        </FormControl>
                        <FormMessage>{errors.shopName?.message}</FormMessage>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="shopLogo" render={() => (
                      <FormItem>
                        <FormLabel>Shop Logo</FormLabel>
                        <FormControl>
                          <Input type="file" onChange={(e) => handleFileUpload(e, "shopLogo")} />
                        </FormControl>
                      </FormItem>
                    )} />
                    {watch("shopLogo") && <img src={watch("shopLogo")} alt="Shop Logo" className="h-16" />}
                    <div className="flex justify-between">
                      <Button onClick={() => setStep(1)}>Back</Button>
                      <Button disabled={!isValid} onClick={() => setStep(3)}>Next</Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Additional Info */}
                {step === 2 && (
                  <div className="space-y-4">
                    <FormField control={form.control} name="bankAccountNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your bank account number" />
                        </FormControl>
                        <FormMessage>{errors.bankAccountNumber?.message}</FormMessage>
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="onlineShopType" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Online Shop Type</FormLabel>
                        <FormControl>
                          <Select {...field} options={[
                            { value: "", label: "Select Shop Type" },
                            { value: "Jewelry and cosmetics", label: "Jewelry and cosmetics" },
                            { value: "Electronics", label: "Electronics" },
                            { value: "Cloth", label: "Cloth" },
                            { value: "Shoes", label: "Shoes" },
                          ]} />
                        </FormControl>
                        <FormMessage>{errors.onlineShopType?.message}</FormMessage>
                      </FormItem>
                    )} />
                    <div className="flex justify-between">
                      <Button onClick={() => setStep(2)}>Back</Button>
                      <Button type="submit">Submit</Button>
                    </div>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
    </Auth>
  );
}
