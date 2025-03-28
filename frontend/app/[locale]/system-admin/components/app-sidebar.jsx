"use client"

import * as React from "react"
import {
  Collapsible,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Settings,
  ShoppingBag,
} from "lucide-react"
// import SidebarSearch from '@/components/nav-main'
// import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroup,
  SidebarTrigger
} from "@/components/ui/sidebar"

import { NavUser } from "./nav-user"
import { NavMain } from "./nav-main"
const logout = () => {

}
const user = {
  name: 'mebrat',
  email: 'maytotmat@gmail.com',
  photoURL: './electronics.jpg'
}
const data = {
  navMain: [
    {
      title: "Administration",
      url: "#",
      icon: Settings,
      isActive: true,
      items: [
        { title: "Dashboard", url: "/system-admin" },
        { title: "Manage Shops", url: "/admin/manage-shops" }, // For approval/suspension (BR-04, UC-11)
        { title: "Manage Templates", url: "/system-admin/manage-template" }, // UC-10
        { title: "Manage Users", url: "/admin/manage-users" }, // Merchants & customers (Actors section)
        // { title: "Manage Orders", url: "/admin/manage-orders" }, // UC-05
        // { title: "Product Categories", url: "/admin/manage-categories" }, // Implicit from product management scope
        { title: "Analytics & Reports", url: "/admin/analytics" }, // Functional req: Sales/visitor stats
        { title: "System Settings", url: "/admin/settings" }, // Payment config, platform rules (Business Rules)
        { title: "Compliance & Logs", url: "/admin/compliance" }, // Legal feasibility (BR-01, BR-04)
      ],
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* header */}
        <SidebarGroup>
          <SidebarMenu className="m-0 p-0">
            <Collapsible
              asChild
              className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={'Go home page'}>
                    <ShoppingBag className="-ml-2 text-green-600" />
                    <span> Admin Dashboard</span>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
