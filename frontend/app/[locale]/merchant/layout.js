
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
            <SidebarTrigger />

              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink className='no-underline text-black' href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
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
