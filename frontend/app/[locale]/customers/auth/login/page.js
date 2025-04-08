"use client";
import React, { useEffect, useRef } from "react"; // 🟢 useRef and useEffect added
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
import { accountLoginSchema } from "@/util/validationSchemas";
import { useLoginMutation } from "@/lib/features/auth/accountApi";
import { useDispatch } from "react-redux";
import { setCredential } from "@/lib/features/auth/accountSlice";

export default function Register() {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(accountLoginSchema)
  });
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  // 🟢 Create a ref to the Card element
  const cardRef = useRef(null);

  // 🟢 Detect click outside and redirect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        router.push("/"); // 🟢 Change this path if desired
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRegister = async (data) => {
    form.setValue("userId", "21mebrat");
    try {
      const response = await login(data).unwrap();
      console.log(response, "response for the merchant");
      if (response?.status !== "success") {
        return toast({
          title: "Failed",
          description: "Login Failed. Please Try Again"
        });
      }
      dispatch(setCredential({
        accessToken: response.accessToken,
        firestName: response.firestName,
        email: response.email,
        role: response?.role
      }));
      router.push("/admin/dashboard");
      redirect;
    } catch (error) {
      console.log("error on merchant registration", error);
      toast({
        title: "Failed",
        description: "Login Failed. Please Try Again"
      });
    }
  };

  return (
    <Card
      ref={cardRef} // 🟢 attach ref
      className="max-w-[400px] flex flex-col items-center mx-auto"
    >
      <CardHeader className="text-center">
        <CardTitle>Merchant Registration</CardTitle>
        <CardDescription>
          Create a new merchant account to start selling on our platform.
          Fill out the form below to provide the necessary information for your store.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Remember Me */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <input className="cursor-pointer rounded-sm" type="checkbox" name="rember" id="rember" />
                <label className="cursor-pointer" htmlFor="rember">Remember Me</label>
              </div>
              <Link className="no-underline cursor-pointer" href="#">Forgot Password</Link>
            </div>
            <Button className="w-full">
              {isLoading ? "Submitting..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="block">
        <p>
          Have no account?{" "}
          <Link className="text-blue-500" href="/customers/auth/register">Create Account</Link> here
        </p>
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
        </p>
      </CardFooter>
    </Card>
  );
}
