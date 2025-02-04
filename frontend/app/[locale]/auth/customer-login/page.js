"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Auth from "../../layouts/Auth";
import { useLoginMutation } from "@/lib/features/auth/authCustomer";
import { useParams, useRouter } from "next/navigation";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import { useDispatch } from "react-redux";
import { useGetCustomizedTemplateQuery } from "@/lib/features/shop/shop";
import { useGetshopMerchantQuery } from "@/lib/features/shop/publicShopSlice";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const i18nNamespaces = ["login"];
// form validation
const formSchema = z.object({
  email: z.string().email({ message: "A valid email is required." }),
  password: z.string().min(6, { message: "Password is required and should be at least 6 characters." }),
});
export default function Login() {
const params = useParams()
const locale = params.locale
  const [login, { isLoading }] = useLoginMutation();
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      photoUrl: "",
    },
  });
  const onSubmit = async (data) => {
    console.log(data)
  };
  console.log(locale);
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
  }, [locale]); // Re-run the effect if the locale changes

  if (!translations.t) {
    return null; // Or a loading indicator
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const unique_id = localStorage.getItem("unique_id");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: shopMerchant,
    error: shopError,
    isSuccess: isShopSuccess,
  } = useGetshopMerchantQuery(merchantId, {
    skip: !merchantId,
  });
  const {
    data: customizedTemplate,
    error: templateError,
    isSuccess: isTemplateSuccess,
  } = useGetCustomizedTemplateQuery(merchantId, {
    skip: !merchantId,
  });

  // useEffect(() => {
  //   if (unique_id) {
  //     router.back();
  //   }
  // }, [unique_id]);

  const handleLogin = async (e) => {
    e.preventDefault();
  };

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={translations.resources}
    >
      <Auth>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <Card className="max-w-md">
              <CardHeader className="flex flex-col items-center justify-center">
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Create an account to start managing and sharing your blog posts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Email <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                             type="email"
                              placeholder="Enter Email" 
                              className="border border-gray-300"
                              {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Password <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                             type="password" 
                             placeholder="Enter Password"
                             className="border border-gray-300"
                              {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Terms & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox required />
                        <span className="text-gray-700 dark:text-gray-300">
                          I agree to the{" "}
                          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Terms & Conditions
                          </a>
                        </span>
                      </label>

                      <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline underline-offset-4">
                        Forgot password?
                      </a>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                      {isLoading ? "Submitting..." : "Submit"}
                    </Button>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm text-gray-700 dark:text-gray-300">
                      Don't have an account?{" "}
                      <Link href="/auth/customer-register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline underline-offset-4">
                        Sign up
                      </Link>
                    </div>

                    {/* Copyright Notice */}
                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                      © {new Date().getFullYear()} E-commerce platform. All rights reserved.
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>

          </div>
        </div>
      </Auth>
    </TranslationsProvider>
  );
}
