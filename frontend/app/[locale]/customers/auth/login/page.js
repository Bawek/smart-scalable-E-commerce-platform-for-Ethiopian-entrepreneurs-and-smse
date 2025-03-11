"use client";
import React, { } from "react";
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
    const { toast } = useToast()
    const dispatch = useDispatch()
    const form = useForm({
        resolver: zodResolver(accountLoginSchema)
    });
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const router = useRouter();
    const handleRegister = async (data) => {
        form.setValue('userId', '21mebrat')
        try {
            const response = await login(data).unwrap()
            console.log(response, 'response for the merchant');
            if (response?.status !== 'success') {
                return toast({
                    title: "Failed",
                    description: 'Login Failed. Please Try Again'
                });
            }
            dispatch(setCredential({
                accessToken: response.accessToken,
                firestName: response.firestName,
                email: response.email,
                role:response?.role
            }))
            router.push('/admin/dashboard');
            redirect;

        } catch (error) {
            console.log('error on merchant registration', error)
            toast({
                title: "Failed",
                description: 'Login Failed. Please Try Again'
            });
        }
    };

    return (
        <Card className="max-w-[400px] flex flex-col items-center mx-auto">
            <CardHeader className='text-center'>
                <CardTitle>Merchant Registration</CardTitle>
                <CardDescription>
                    Create a new merchant account to start selling on our platform.
                    Fill out the form below to provide the necessary information for your store.
                </CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-6">
                        {/* email */}
                        < FormField
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
                                    {/* <FormDescription>Email must be valid email.</FormDescription> */}
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
                                    {/* <FormDescription>password must be storng and at least four.</FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <input className="cursor-pointer focus:outline-none rounded-sm outline-none" type="checkbox" name="rember" id="rember" />
                                <label className="cursor-pointer" htmlFor="rember">Remeber Me</label>
                            </div>
                            <Link className="no-underline cursor-pointer" href={'#'}>forgot password</Link>
                        </div>
                        <Button className='w-full'>{isLoading ? 'submiting ...' : 'Login'}</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className='block'>
                <p> have no account ? <Link className="text-blue-500" href={'/customers/auth/register'}>Create Account</Link> here </p>
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
                </p>
            </CardFooter>
        </Card>
    );
}
