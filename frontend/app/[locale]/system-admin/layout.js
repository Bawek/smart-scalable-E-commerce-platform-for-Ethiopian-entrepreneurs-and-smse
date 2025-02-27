import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./components/app-sidebar";
export const metadata = {
    title: "System Admin",
    description: "ecommerce application",
};

export default function RootLayout({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='w-full h-screen'>
                <SidebarTrigger />
                <section className='w-full h-full p-5'>
                    {children}
                </section>
            </main>
        </SidebarProvider>

    );
}
