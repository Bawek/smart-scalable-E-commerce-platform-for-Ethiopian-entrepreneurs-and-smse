"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShoppingBag, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@uidotdev/usehooks";
import ProfileMenu from "./profile";

// Platform information remains the same...
const cartItems = 7;
const companyLinks = [
  {
    title: "Products",
    href: "/products",
    description: "Explore our product catalog and offerings",
  },
  {
    title: "Support",
    href: "/support",
    description: "Get technical support and assistance",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about our company and mission",
  },
  {
    title: "Solutions",
    href: "/solutions",
    description: "Industry-specific solutions and packages",
  },
];
const shopLinks = [
  {
    title: "Electronics",
    href: "/customers/shop/electronics",
    description: "Browse our selection of electronics including phones, laptops, and accessories",
  },
  {
    title: "Clothing",
    href: "/customers/shop/clothing",
    description: "Explore our clothing collection for men, women, and children",
  },
  {
    title: "Books",
    href: "/customers/shop/books",
    description: "Find a variety of books from different genres and authors",
  },
  {
    title: "Furniture",
    href: "/customers/shop/furniture",
    description: "Discover stylish and modern furniture for your home or office",
  },
  {
    title: "Groceries",
    href: "/customers/shop/groceries",
    description: "Shop for fresh groceries and daily essentials",
  },
  {
    title: "Sports & Fitness",
    href: "/customers/shop/sports-fitness",
    description: "Get the latest sports gear and fitness equipment",
  },
  {
    title: "Beauty & Personal Care",
    href: "/customers/shop/beauty-care",
    description: "Explore beauty products and personal care essentials",
  },
];


const profileLinks = [
  {
    title: "Manage Profile",
    dialogContent: (
      <div className="space-y-4">
        <p>Update your personal information and preferences.</p>
        <div className="flex flex-col gap-2">
          <Button variant="outline">Change Password</Button>
          <Button variant="outline">Update Email</Button>
          <Button asChild>
            <Link href="/customers/manageAccount">Edit Full Profile</Link>
          </Button>
        </div>
      </div>
    ),
  },
  {
    title: "Orders",
    dialogContent: (
      <div className="space-y-4">
        <p>Your recent orders:</p>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between">
            <span>Order #1234</span>
            <span className="text-green-600">Delivered</span>
          </div>
          <Button className="mt-4" asChild>
            <Link href="/customers/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    ),
  },
  {
    title: "Notifications",
    dialogContent: (
      <div className="space-y-4">
        <p>Unread notifications:</p>
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-blue-500 rounded-full" />
            <span>New message from support</span>
          </div>
          <Button className="mt-4" asChild>
            <Link href="/customers/notifications">View All Notifications</Link>
          </Button>
        </div>
      </div>
    ),
  },
];
export function CustomerNavigationMenu() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { width } = useWindowSize();
  const account = {
    accessToken: '1234567890',
    refreshToken: '0987654321',
    email: 'kskkk ',
    username: 'kskkk ',
  };
  const isMobile = (width || 0) < 768;

  const [hasScrolled, setHasScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  React.useEffect(() => {
    if (!isMobile && isOpen) setIsOpen(false);
  }, [isMobile, isOpen]);

  return (
    <nav className={`sticky w-full top-0 z-50 bg-white dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${hasScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-[95%] mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/customers"
          className="flex items-center flex-nowrap md:min-w-64 py-3 no-underline gap-2 font-semibold"
        >
          <ShoppingBag className="h-6 w-6 text-green-400" /> {/* Icon with a color */}
          <span className="bg-gradient-to-r capitalize from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
            E-Commerce plafform
          </span>
        </Link>

        <div>
          {!isMobile ? (
            <DesktopMenu account={account} />
          ) : (
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} account={account} />
          )}
        </div>
      </div>
    </nav>
  );
}

function DesktopMenu({ account }) {
  return (
    <div className="container flex items-center h-16 gap-4">
      {/* Navigation Menu */}
      <NavigationMenu className="mr-1">
        <NavigationMenuList className="my-auto">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm">Company</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 w-[400px] md:w-[500px] lg:w-[500px] p-4">
              <ul className="grid gap-3 md:grid-cols-2">
                {companyLinks.map((link) => (
                  <ListItem key={link.title} title={link.title} href={link.href}>
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* Navigation Menu */}
      <NavigationMenu className="-ml-20">
        <NavigationMenuList className="my-auto">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm">Shops</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 w-[400px] p-4">
              <ul className="grid gap-3">
                {shopLinks.map((link) => (
                  <ListItem key={link.title} title={link.title} href={link.href}>
                    {link.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Main Navigation Links */}
      {[
        { href: "/product-list", label: "Market Place" },
      ].map((navItem) => (
        <Link key={navItem.label} href={navItem.href} className="text-sm no-underline text-black dark:text-white">
          {navItem.label}
        </Link>
      ))}

      {/* Cart Button */}
      <Link href="/customers/cart" className="relative flex items-center text-sm no-underline text-black dark:text-white">
        <ShoppingCart className="h-8 w-8 mr-2" />
        {cartItems > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
            {cartItems}
          </span>
        )}
      </Link>

      {/* Right Section - User Profile / Authentication */}
      <div className="ml-auto flex items-center">
        {account?.accessToken ? (
          <ProfileMenu />

        ) : (
          <>
            <Button variant="ghost" asChild>
              <Link href="/customers/auth/register" className="no-underline text-black dark:text-white">Register</Link>
            </Button>
            <Button variant="ghost" asChild className="mr-2">
              <Link href="/customers/auth/login" className="no-underline text-black dark:text-white">Login</Link>
            </Button>
          </>
        )}
      </div>
    </div>

  );
}

function MobileMenu({ isOpen, setIsOpen, account }) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {isOpen && (
        <div className="absolute left-0 top-16 w-full border-b bg-background shadow-lg">
          <div className="container px-4 py-4">
            <div className="grid gap-2">
              <div className="pb-2">
                <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
                  Explore Platforms
                </h3>
                <div className="grid gap-1">
                  <MobileLink href="/marketplace">Marketplace</MobileLink>
                  <MobileLink href="/cart">Cart</MobileLink>
                  <MobileLink href="/order-history">Order History</MobileLink>
                </div>
              </div>

              <div className="pb-2">
                <h3 className="mb-2 px-2 text-sm font-semibold text-muted-foreground">
                  Your Account
                </h3>
                <div className="grid gap-1">
                  {companyLinks.map((platform) => (
                    <MobileLink key={platform.title} href={platform.href}>
                      {platform.title}
                    </MobileLink>
                  ))}
                </div>
              </div>

              <MobileLink href="/support" className="mt-2 border-t pt-2">
                Customer Support
              </MobileLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const MobileLink = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
};

// ListItem component remains the same...
// ListItem Component to render individual navigation links
const ListItem = React.forwardRef(({
  className,
  title,
  children,
  ...props
}, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem"; // Display name for debugging purposes

// Default export
export default CustomerNavigationMenu;
