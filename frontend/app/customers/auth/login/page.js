"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountLoginSchema } from "@/util/validationSchemas";
import { useLoginMutation } from "@/lib/features/auth/accountApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function Login() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const ic = searchParams.get('ic'); // “order” or null
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    resolver: zodResolver(accountLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    mode: "onChange"
  });

  const handleLogin = async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response?.status !== "success") {
        throw new Error(response?.message || "Login failed");
      }

      dispatch(setCredential({
        accessToken: response.accessToken,
        firestName: response.firestName, // Fixed typo from firestName
        email: response.email,
        role: response.role,
        id: response.id
      }));
      if (ic && ic === 'order') {
     return  router.push('/customers/placeOrder')
      }
      router.push(response.role === 'ADMIN' ? "/system-admin" : "/merchant");

    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.data?.message || error.message || "Please check your credentials and try again",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl bg-white dark:bg-gray-800">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-700">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-300">
            Please enter your credentials to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="E.g example@gmail.com"
                        className="h-12 text-base"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        className="h-12 text-base"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me Checkbox */}
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="accent-blue-500 h-4 w-4"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="!mt-0 cursor-pointer">
                      Remember Me
                    </FormLabel>
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Link href="#" className="text-orange-500 hover:underline text-sm">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-700 hover:bg-orange-800"
                disabled={isLoading || !form.formState.isValid}
                aria-label={isLoading ? "Logging in" : "Login"}
              >
                {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm">
            Don’t have an account?{" "}
            <Link
              href="/customers/auth/register"
              className="text-orange-500 hover:underline hover:text-blue-600"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} E-commerce Platform
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}