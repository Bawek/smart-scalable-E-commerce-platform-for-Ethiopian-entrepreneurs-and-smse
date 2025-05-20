import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-sidebar";
import AdminTopNav from "./components/adminTopNav";
import AdminNotificationProvider from "./AdminNotificationProvider";
export const metadata = {
    title: "System Admin",
    description: "ecommerce application",
};
export default function RootLayout({ children }) {
    return (
        <AdminNotificationProvider>
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
        </AdminNotificationProvider>
    );
}
