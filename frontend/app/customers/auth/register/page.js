"use client";
import React from "react";
import { useRouter } from "next/navigation";
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
  CardTitle,
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
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";

export default function Register() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(accountRegistrationSchema),
  });

  const [registerAccount, { isLoading }] = useRegisterAccountMutation();

  const handleRegister = async (data) => {
    try {
      const response = await registerAccount(data).unwrap();
      console.log(response, 'regisration response')
      if (response?.status !== "success") {
        return toast({
          title: "Failed",
          description: "Registration Failed. Please Try Again",
          duration: 3000,
        });
      }

      dispatch(
        setCredential({
          accessToken: response.accessToken,
          firestName: response.firestName,
          email: response.email,
          role: response?.role,
          id: response?.id,
        })
      );

      toast({
        title: "Form Submitted Successfully!",
        description: "Please login here to proceed with us.",
        duration: 3000,
      });

      router.push(`/merchant?merchant=${response.id}`);
    } catch (error) {
      toast({
        title: "Failed",
        description: "Registration Failed. Please Try Again",
        duration: 3000,
      });
    }
  };

  const renderInputField = (name, label, type = "text", placeholder = "") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 font-medium">
            {label} <span className="text-red-500">*</span>
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="h-12 text-base"
            />
          </FormControl>
          <FormMessage className="text-red-500 text-sm" />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-full max-w-[450px] shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl border-0">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-3xl font-bold text-orange-600">
            Join Our Marketplace
          </CardTitle>
          <CardDescription className="text-gray-600">
            Start your journey with us in just 2 minutes!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderInputField("firestName", "First Name", "text", "Alemu")}
                {renderInputField("lastName", "Last Name", "text", "Mamaru")}
              </div>
              {renderInputField("email", "Email", "email", "john@example.com")}
              {renderInputField("password", "Password", "password", "••••••••")}
              <Button
                className="w-full bg-gradient-to-r from-green-600 via-yellow-400 to-red-400 hover:from-green-700 hover:to-orange-700 text-white font-semibold py-4 rounded-xl transition-all hover:shadow-lg"
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
            Already have an account?{" "}
            <Link
              className="text-orange-600 cursor-pointer hover:text-indigo-700 font-semibold no-underline underline-offset-4 transition-colors"
              href="/customers/auth/login"
            >
              Sign In
            </Link>{" "}
            Here.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
