"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";
import Auth from "../../layouts/Auth";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountRegistrationSchema } from "@/util/validationSchemas";
import { useRegisterAccountMutation } from "@/lib/features/auth/accountApi";

export default function Register() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(accountRegistrationSchema)
  });
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();
  const router = useRouter();

  const handleRegister = async (data) => {
    form.setValue('userId', '21mebrat');
    try {
      const response = await registerAccount(data).unwrap();
      console.log(response, 'response for the merchant');
      if (response?.status !== 'success') {
        return toast({
          title: "Failed",
          description: 'Registration Failed. Please Try Again'
        });
      }
      toast({
        title: "Form Submitted Successfully!",
        description: "please login here to preced with us."
      });
      router.push('/auth/login');
      redirect;
    } catch (error) {
      console.log('error on merchant registration', error);
      toast({
        title: "Failed",
        description: 'Registration Failed. Please Try Again'
      });
    }
  };

  return (
    <Auth>
        {/* Left Section: Registration Form */}
          <Card className="w-full max-w-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border-0">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-bold text-blue-600">
                Join Our Marketplace 🌟
              </CardTitle>
              <CardDescription className="text-gray-600">
                Start your journey with us in just 2 minutes!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            First Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              placeholder="John" 
                              {...field} 
                              className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 font-medium">
                            Last Name <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="text" 
                              placeholder="Doe" 
                              {...field} 
                              className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                            />
                          </FormControl>
                          <FormMessage className="text-red-500 text-sm" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            {...field} 
                            className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">
                          Password <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                            className="rounded-lg focus:ring-2 focus:ring-blue-500 border-gray-300"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm" />
                      </FormItem>
                    )}
                  />

                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-6 rounded-xl transition-all hover:shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="animate-pulse">Creating Account...</span>
                    ) : (
                      <>🚀 Get Started Now</>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="block text-center pb-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  className="text-blue-600 cursor-pointer hover:text-indigo-800 font-semibold no-underline underline-offset-4 transition-colors"
                  href="/auth/login"
                >
                  Sign In 
                </Link>
                {' '} Here.
              </p>
            </CardFooter>
          </Card>

        {/* Right Section: Benefits
        <div className="hidden md:flex w-1/2 p-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="max-w-2xl space-y-12">
            <h2 className="text-4xl font-bold leading-tight">
              Grow Your Business with Confidence 💼
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  🌍
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Access millions of potential customers worldwide with our powerful marketplace platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  🔒
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Bank-level security for all transactions. Your money and data are always protected.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  📈
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Growth Tools</h3>
                  <p className="text-gray-200 leading-relaxed">
                    Powerful analytics, marketing tools, and customer insights to help you scale.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-xl">
                  🎯
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Smart Insights</h3>
                  <p className="text-gray-200 leading-relaxed">
                    AI-powered recommendations to optimize your listings and boost sales.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-6 bg-white/10 rounded-xl">
              <p className="text-lg italic">
                "Joining this platform transformed my business. Within months, my sales tripled!"
                <span className="block mt-2 font-semibold">- Sarah Johnson, Premium Seller</span>
              </p>
            </div>
          </div>
        </div> */}
    </Auth>
  );
}