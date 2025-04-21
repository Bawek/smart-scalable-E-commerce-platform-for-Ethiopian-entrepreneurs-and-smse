import { AppSidebar } from "@/components/ui/my-components/my-appsidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Alert from "./components/Alert"
import { MenuIcon } from "lucide-react"
import React from "react"

export const metadata = {
  title: "Merchant page",
  description: "Ecommerce application",
}

export default function MerchantLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <SidebarProvider>
        {/* Sidebar on the left */}
        <AppSidebar />

        {/* Main Content */}
        <SidebarInset className="flex-1 flex flex-col">
          {/* Sticky header */}
          <header className="sticky top-0 z-40 flex h-16 items-center gap-4 bg-white border-b shadow-sm px-4 sm:px-6 md:px-8">
            {/* Mobile sidebar toggle */}
            <div className="md:hidden">
              <SidebarTrigger>
                <MenuIcon className="h-6 w-6 text-gray-600" />
              </SidebarTrigger>
            </div>

            {/* Fun Alert Message */}
            <div className="flex-1">
              <Alert />
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
