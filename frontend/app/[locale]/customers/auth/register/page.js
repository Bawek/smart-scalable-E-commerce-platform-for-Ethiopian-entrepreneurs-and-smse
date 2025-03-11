"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";
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
    // form.setValue('userId', '21mebrat');
    console.log(data, 'data')
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
      router.push('/customers/auth/login');
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
                name="firestName"
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
            href="/customers/auth/login"
          >
            Sign In
          </Link>
          {' '} Here.
        </p>
      </CardFooter>
    </Card>
  );
}