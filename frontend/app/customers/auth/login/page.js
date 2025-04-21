"use client";
import React, { useRef } from "react";
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
import { accountLoginSchema } from "@/util/validationSchemas";
import { useLoginMutation } from "@/lib/features/auth/accountApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";
import { useRouter } from "next/navigation";

export default function Register() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(accountLoginSchema),
  });
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const handleRegister = async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response?.status !== "success") {
        return toast({
          title: "Failed",
          description: "Login Failed. Please Try Again",
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
      if (response.role === 'ADMIN') {
        router.push("/system-admin");
      } else {
        router.push("/merchant");
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Login Failed. Please Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card
        className="w-full max-w-md shadow-xl rounded-xl bg-white dark:bg-gray-800"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-700">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300">
            Please enter your credentials to login to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E.g example@gmail.com" className="h-12 text-base"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" className="h-12 text-base"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-blue-500" />
                  Remember Me
                </label>
                <Link href="#" className="text-orange-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-orange-700">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link href="/customers/auth/register" className="text-orange-500 hover:underline hover:text-blue-600">
              Sign Up
            </Link>
          </p>
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} E-commerce Platform</p>
        </CardFooter>
      </Card>
    </div>
  );
}
