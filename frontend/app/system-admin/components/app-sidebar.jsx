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
import Logo from "@/components/ui/my-components/logo"
import { logOut, selectLogInUser } from "@/lib/features/auth/accountSlice"
import { useSelector } from "react-redux"
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
        { title: "Manage Shops", url: "/system-admin/manage-shops" }, // For approval/suspension (BR-04, UC-11)
        { title: "Manage Templates", url: "/system-admin/manage-template" }, // UC-10
        { title: "Manage Merchants", url: "/system-admin/manage-merchants" }, // Merchants & customers (Actors section)
        // { title: "Manage Orders", url: "/admin/manage-orders" }, // UC-05
        // { title: "Product Categories", url: "/admin/manage-categories" }, // Implicit from product management scope
        { title: "Analytics & Reports", url: "/system-admin" }, // Functional req: Sales/visitor stats
        { title: "System Settings", url: "/system-admin" }, // Payment config, platform rules (Business Rules)
        { title: "Compliance & Logs", url: "/system-admin" }, // Legal feasibility (BR-01, BR-04)
      ],
    },
  ],
};

export function AppSidebar({
  ...props
}) {
  // const user = useSelector(selectLogInUser)
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
                  <SidebarMenuButton className="-ml-6 p-0" tooltip={'Go home page'}>
                    <Logo />
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
        <NavUser user={user} logout={logOut} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
