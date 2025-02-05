"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";

export default function Navbar() {
  const [uniqueId, setUniqueId] = useState();
  const [role, setRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true); // Set to true when scrolled down
      } else {
        setIsScrolled(false); // Reset to false when at the top of the page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setUniqueId(localStorage.getItem("uniqueId"));
    setRole(localStorage.getItem("role"));
  }, []);

  const navLinks = [
    ...(uniqueId
      ? [
          {
            name: "Profile",
            href: role === "merchant" ? "/admin/settings" : "/profile",
          },
          ...(role === "merchant"
            ? [{ name: "Dashboard", href: "/admin/dashboard" }]
            : []),
        ]
      : [
          { name: "Login", href: "/auth/customer-login" },
          { name: "Register", href: "/auth/customer-register" },
          { name: "Welcome", href: "/auth/customer-register" },
        ]),
  ];

  return (
    <header
      className={cn(
        "w-full backdrop-blur absolute top-0 z-50 transition-all",
        isScrolled ? "bg-gray-400 shadow-md fixed top-0 " : ""
      )}
    >
      <div className="container mx-auto px-5 flex h-16 items-center justify-between">
        {/* Desktop Logo */}
        <Link href="/" className="hidden md:flex items-center hover:text-orange-300 gap-2 font-bold">
          <span className="text-white">E-Commerce</span>
          <span className="text-white">Platform</span>
        </Link>

        {/* Mobile Hamburger Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6 text-white focus:outline-none" />
          </SheetTrigger>
          <SheetContent side="left">
          <SheetTitle> Menus</SheetTitle>
  
            <div className="flex flex-col gap-4 pt-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold mb-6 hover:text-orange-300"
              >
                <span className="text-white">E-Commerce</span>
                <span className="text-white">Platform</span>
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium w-full bg-gray-200 py-2 hover:bg-gray-400 text-center rounded-full transition-colors hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navLinks.map((link) => (
              <NavigationMenuItem key={link.name}>
                <Link href={link.href} legacyBehavior passHref>
                  <NavigationMenuLink className="lg:text-white lg:hover:text-orange-300 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                    {link.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          {uniqueId && (
            <DropdownMenu className="flex items-center">
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/login-my-image.jpg" />
                  <AvatarFallback>USR</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={role === "merchant" ? "/admin/settings" : "/profile"}>
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
