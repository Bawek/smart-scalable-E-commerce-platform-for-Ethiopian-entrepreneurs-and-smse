"use client"

import * as React from "react"
import {
  ShoppingCart, Package, User, Settings, CreditCard,
  Truck, Lock, Store, FileText, LayoutDashboard,
  ShieldCheck, CheckCircle, XCircle
} from "lucide-react";
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "./logo";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@/lib/features/auth/accountApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { logOut } from "@/lib/features/auth/accountSlice";

// Sample data
const data = {
  templates: [
    {
      name: "Manage Buyed Template",
      logo: LayoutDashboard,
      category: "General",
      url: '#',
      status: "Published",
    }
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        { title: "Overview", url: "#" },
        { title: "Reports", url: "#" },
        { title: "Analytics", url: "#" },
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: Package,
      items: [
        { title: "All Products", url: "#" },
        { title: "Manage Products", url: "#" },
        { title: "Add New", url: "#" },
        { title: "Categories", url: "#" },
      ],
    },
    {
      title: "Orders",
      url: "#",
      icon: ShoppingCart,
      items: [
        { title: "All Orders", url: "#" },
        { title: "Pending", url: "#" },
        { title: "Completed", url: "#" },
        { title: "Cancelled", url: "#" },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: User,
      items: [
        { title: "Customer List", url: "#" },
        { title: "Reviews & Ratings", url: "#" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        { title: "Business Settings", url: "/merchant/business-setting" },
        { title: "Payment Settings", url: "#" },
        { title: "Shipping Settings", url: "#" },
        { title: "Security", url: "#" },
      ],
    },
  ],
  products: [
    { name: "Smartphone", category: "Electronics", price: "ETB 15,000", stock: 30, icon: Package },
    { name: "Office Chair", category: "Furniture", price: "ETB 5,000", stock: 15, icon: Package },
    { name: "Men’s Jacket", category: "Clothing", price: "ETB 2,500", stock: 50, icon: Package },
  ],
  orders: [
    { id: "#12345", customer: "John Doe", amount: "ETB 3,200", status: "Completed", icon: CheckCircle },
    { id: "#12346", customer: "Jane Smith", amount: "ETB 1,500", status: "Pending", icon: ShieldCheck },
    { id: "#12347", customer: "Ali Mohammed", amount: "ETB 4,000", status: "Cancelled", icon: XCircle },
  ],
  settings: {
    business: {
      storeName: "Merchant Store",
      storeLogo: "/logos/store-logo.png",
      currency: "ETB (Ethiopian Birr)",
      taxRate: 15, // In percentage
    },
    payment: {
      availableMethods: ["Credit Card", "Mobile Money", "Bank Transfer"],
      defaultMethod: "Mobile Money",
      transactionFee: "2%",
      icon: CreditCard,
    },
    shipping: {
      availableCouriers: ["DHL", "Ethiopian Post", "Zemen Express"],
      defaultCourier: "Zemen Express",
      deliveryTime: "2-5 Business Days",
      freeShippingThreshold: "ETB 2,000",
      icon: Truck,
    },
    security: {
      twoFactorAuth: true,
      allowedDevices: ["Laptop - Chrome", "Mobile - Safari"],
      icon: Lock,
    },
  },
};

export function AppSidebar(props) {
  const user = useSelector((state) => state.account)
  const [logout] = useLogoutMutation()
  const router = useRouter()
  const dispatch = useDispatch()
  const userLogout = async () => {
    // router.push('/customers')
    const response = await logout().unwrap()
    if (response.status !== 'success') {
      return toast.error("sorry something went wrong.");
    }
    window.location.href = '/customers'
    dispatch(logOut())
  }
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarGroup>
        <SidebarGroupLabel>
          <Logo
            hrefValue='/merchant'
          />
        </SidebarGroupLabel>
        <SidebarMenu className="m-0 p-0">
        </SidebarMenu>
      </SidebarGroup>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.templates} />
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser
         user={user}
         logout={userLogout}
         /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
