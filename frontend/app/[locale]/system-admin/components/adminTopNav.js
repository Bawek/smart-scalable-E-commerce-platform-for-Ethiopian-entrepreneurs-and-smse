'use client'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
const AdminTopNav = () => {
    const form = useForm();
    const handleSearch = () => {
        // Handle search functionality
    }

    return (
        <div className="py-2">
            <div className="max-w-screen-xl mx-auto flex items-center gap-10 lg:justify-between">
                {/* Sidebar Trigger */}
                <SidebarTrigger />

                {/* Search Form */}
                <div className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 mr-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-4 flex items-center gap-3">
                            <FormField
                                control={form.control}
                                name="search"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Search..."
                                                {...field}
                                                className="w-full px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-gray-700"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AdminTopNav;
