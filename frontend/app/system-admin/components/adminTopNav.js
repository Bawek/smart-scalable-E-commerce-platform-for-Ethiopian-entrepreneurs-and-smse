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
import { useState } from 'react';
import { NotificationAdd } from '@mui/icons-material';
import NotificationTest from '@/app/components/systemAdmin/test';
import axios from 'axios';
const AdminTopNav = () => {
    const form = useForm();
    const [isOpened, setIsOpened] = useState(false)
    const handleSearch = () => {
        // Handle search functionality
    }
    const sendTestNotification = async () => {
        const testData = {
            message: 'Test merchant needs approval',
            merchantId: 'test-' + Math.random().toString(36).slice(2, 8),
            businessName: 'Test Business',
            timestamp: new Date().toISOString()
        };

        try {
            await axios.post('http://localhost:8000/iopost', testData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

        } catch (error) {
            console.error('Error:', error)
            alert(`Error: ${error.response?.data?.error || error.message}`)
        }
    };
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
                <div>

                    <NotificationAdd onClick={() => setIsOpened(true)} />
                    <button onClick={sendTestNotification}>toast</button>
                </div>
              
            </div>
        </div>
    )
}

export default AdminTopNav;
