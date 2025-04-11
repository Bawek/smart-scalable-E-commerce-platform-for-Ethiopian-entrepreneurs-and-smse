import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-sidebar";
import AdminTopNav from "./components/adminTopNav";
import Notification from "../components/systemAdmin/Notification";
import path from 'path'
import NotificationTest from "../components/systemAdmin/test";
export const metadata = {
    title: "System Admin",
    description: "ecommerce application",
};
const adminEvents = [
    { name: 'newMerchantRegistration' },
];
const audioPath = path.join(__dirname, '..', 'components', 'systemAdmin', 'notify.mp3')
export default function RootLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full h-screen'>
                <header className="sticky top-0 z-50 bg-white shadow-md">
                    <AdminTopNav />
                </header>
                <section className='w-full h-full p-3'>
                    {children}
                </section>
            </main>
        </SidebarProvider>

    );
}
