"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CardDescription, CardFooter, CardTitle } from "@/components/ui/card";

// Reusable Form Component
export function CustomForm({ fields, schema, onSubmit }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {}),
    });

    return (
        <Card className="max-w-[400px] flex flex-col items-center mx-auto">
            <CardHeader>
                <CardTitle>Merchant Registration</CardTitle>
                <CardDescription>
                    Create a new merchant account to start selling on our platform. 
                    Fill out the form below to provide the necessary information for your store.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        {/* Dynamically Render Fields */}
                        {fields.map((field, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={field.name}
                                render={({ field: formField }) => (
                                    <FormItem className='flex flex-col'>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            {/* Render the appropriate input type */}
                                            {field.type === "select" ? (
                                                <select {...formField} className="input-class">
                                                    {field.options?.map((option, idx) => (
                                                        <option key={idx} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : field.type === "checkbox" ? (
                                                <input {...formField} type="checkbox" className="input-class" />
                                            ) : (
                                                <Input
                                                    {...formField}
                                                    placeholder={field.placeholder || ""}
                                                    type={field.type || "text"}
                                                />
                                            )}
                                        </FormControl>
                                        {field.description && (
                                            <FormDescription>{field.description}</FormDescription>
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        {/* Submit Button */}
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </Form>

            </CardContent>
            <CardFooter>
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} E-commerce Platform. All rights reserved.
                </p>
            </CardFooter>
        </Card>
    );
}
