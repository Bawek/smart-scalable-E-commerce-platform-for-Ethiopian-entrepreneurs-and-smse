"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  ShoppingBag,
  SquareTerminal,

} from "lucide-react"
import {
  ShoppingCart, Package, User, Settings, CreditCard,
  Truck, Lock, Store, FileText, LayoutDashboard,
  ShieldCheck, CheckCircle, XCircle
} from "lucide-react";
import { TeamSwitcher } from "./teams"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link";
import Logo from "./logo";

// Sample data
const data = {
  user: {
    name: "Merchant Name",
    email: "merchant@example.com",
    avatar: "/avatars/merchant.jpg",
    role: "Seller", // "Admin" or "Seller"
  },
  templates: [
    {
      name: "Fashion Store Template",
      logo: LayoutDashboard,
      category: "Clothing & Accessories",
      url: '#',
      status: "Published",
    },
    {
      name: "Electronics Shop",
      logo: Store,
      category: "Electronics & Gadgets",
      url: '#',
      status: "Draft",
    },
    {
      name: "Home & Furniture",
      logo: FileText,
      category: "Furniture & Home Decor",
      url: '#',
      status: "Published",
    },
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
        { title: "Business Settings", url: "business-setting" },
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
