"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Reusable Form Component
export function CustomForm({ fields, schema, onSubmit, title, description, file, setFile }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {}),
    });

    return (
        <Card className="max-w-[400px] flex flex-col items-center mx-auto">
            <CardHeader className='text-center'>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {description}
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
                                            )
                                                : field.type === 'file' ? (
                                                    <div>
                                                        <Input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(event) => {
                                                                const file = event.target.files?.[0];
                                                                if (file) {
                                                                    formField.onChange(file);
                                                                    setFile(file);
                                                                }
                                                            }}
                                                        />
                                                        {
                                                            file &&
                                                            <img src={URL.createObjectURL(file || './computer.png')} alt="privew" />
                                                        }
                                                    </div>
                                                )
                                                    : (
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
