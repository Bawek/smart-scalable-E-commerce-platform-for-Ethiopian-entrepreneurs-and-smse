
import { AppSidebar } from "@/components/ui/my-components/my-appsidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Alert from "./components/Alert";
import { MenuIcon } from "lucide-react";
export const metadata = {
  title: "Merchant page",
  description: "ecommerce application",
};
export default function MerchantLayout({ children }) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center justify-center gap-2 px-4">
              {/* Mobile-only sidebar trigger */}
              <div className="md:hidden">
                <SidebarTrigger>
                  <MenuIcon className="h-6 w-6 text-gray-600" />
                </SidebarTrigger>
              </div>
              <Alert />
            </div>
          </header>
          <main>
            {children}
          </main>
          <footer className="flex items-center justify-center">
            &copy; {" "} {new Date().getFullYear()} {" "} E.C {" "} e-commerce platform. All right Reserved.
          </footer>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
