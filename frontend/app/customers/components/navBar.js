"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShoppingBag, ShoppingCart, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowSize } from "@uidotdev/usehooks";
import ProfileMenu from "./profile";
import { useState } from "react";
import Logo from "@/components/ui/my-components/logo";
import { useSelector } from "react-redux";
// Platform information remains the same...
const companyLinks = [
  {
    title: "Products",
    href: "/customers/templates",
    description: "Explore our product catalog and offerings",
  },
  {
    title: "Support",
    href: "/customers/company/support",
    description: "Get technical support and assistance",
  },
  {
    title: "About",
    href: "/customers/company/about",
    description: "Learn more about our company and mission",
  },
  {
    title: "Contact Us",
    href: "/customers/company/contact",
    description: "Contact us By using this address list here.",
  },
];
const shopLinks = [
  {
    title: "Electronics",
    href: "/customers/shop/electronics?category=electronics",
    description: "Browse our selection of electronics including phones, laptops, and accessories",
  },
  {
    title: "Clothing",
    href: "/customers/shop/clothing?category=clothing",
    description: "Explore our clothing collection for men, women, and children",
  },
  {
    title: "Books",
    href: "/customers/shop/books?category=books",
    description: "Find a variety of books from different genres and authors",
  },
  {
    title: "Furniture",
    href: "/customers/shop/furniture?category= furniture",
    description: "Discover stylish and modern furniture for your home or office",
  },
  {
    title: "Groceries",
    href: "/customers/shop/groceries?category=groceries",
    description: "Shop for fresh groceries and daily essentials",
  },
  {
    title: "Sports & Fitness",
    href: "/customers/shop/sports-fitness?category=sports-fitness",
    description: "Get the latest sports gear and fitness equipment",
  },
  {
    title: "Beauty & Personal Care",
    href: "/customers/shop/beauty-care?category=beauty-care",
    description: "Explore beauty products and personal care essentials",
  },
];


export function CustomerNavigationMenu() {
    const cart = useSelector((state) => state.cart)
    console.log(cart, 'cart')

  const cartItems = cart?.totalQuantity||0;
  console.log(cartItems, 'cartItems')

  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const closeDrawer = () => setOpen(false);
  const { width } = useWindowSize();
  const account = useSelector((state) => state.account)
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
    <nav className={`sticky w-full top-0 z-50  dark:bg-black backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300 ${hasScrolled ? "shadow-md bg-white" : "bg-transparent"}`}>
      <div className="max-w-[98%] mx-auto flex h-16 items-center justify-between">
        <Logo />
        {/* mobile navbar */}
        {!isMobile ? (
          <DesktopMenu account={account} cartItems={cartItems} />
        ) : (
          <MobileMenu
  account={account}
  open={open}
  setOpen={setOpen}
  closeDrawer={closeDrawer}
  cartItems={cartItems}
/>

        )}
      </div>
    </nav>
  );
}

function DesktopMenu({ account, cartItems }) {
  return (
    <div className="container flex items-center h-16 gap-6">
      {/* Navigation Menu */}
      <NavigationMenu className="">
        <NavigationMenuList className="my-auto">
          <NavigationMenuItem className="bg-transparent">
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
      <NavigationMenu className="mr-1">
        <NavigationMenuList className="my-auto">
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm">shops</NavigationMenuTrigger>
            <NavigationMenuContent className="absolute left-0 w-[400px] md:w-[500px] lg:w-[500px] p-4">
              <ul className="grid gap-3 md:grid-cols-2">
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
        { href: "/customers/products", label: "Market Place" },
      ].map((navItem) => (
        <Link key={navItem.label} href={navItem.href} className="text-sm no-underline text-black dark:text-white">
          {navItem.label}
        </Link>
      ))}
      <div className="flex-1"></div>
      {/* Cart Button */}
<<<<<<< HEAD
      <Link href="/customers/cart" className="relative flex items-center text-sm no-underline text-black dark:text-white">
=======
      <Link href="/customers/cart" className="relative flex items-end text-sm no-underline text-black  dark:text-white">
>>>>>>> d2ce75aa1468cb7435f08f2d11fd68bd9e79a386
        <ShoppingCart className="h-8 w-8 mr-2" />
        {cartItems > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
            {cartItems}
          </span>
        )}
      </Link>

      {/* Right Section - User Profile / Authentication */}
      <div className="ml-auto flex items-center gap-2">
        {
          account?.accessToken ? (
            <ProfileMenu />

          ) : (
            <>
              <Link
                className="no-underline text-white bg-orange-700 hover:bg-orange-800 font-medium py-1 px-2 rounded-lg transition duration-300 ease-in-out"
                href="/customers/auth/login"
              >
                Login
              </Link>

              <Link
                className="no-underline text-white bg-orange-700 hover:bg-orange-800font-medium py-1 px-2 rounded-lg transition duration-300 ease-in-out"
                href="/customers/auth/register"
              >
                Register
              </Link>

            </>
          )}
      </div>
    </div>

  );
}

function MobileMenu({ account, open, setOpen, closeDrawer, cartItems }) {
  return (
    <Sheet aria-describedby={'mobile menu'} open={open} onOpenChange={setOpen}>
      <SheetTitle
        aria-describedby={'mobile menu'}
        className="text-sm font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent"
      >
        Menus
      </SheetTitle>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-transparent"
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="h-full w-[300px] p-0">
        {/* Drawer Content */}
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <Link
                href="/customers"
                onClick={closeDrawer}
                className="flex items-center gap-2 no-underline"
              >
                <Logo />
              </Link>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {/* Company Links */}
              <div className="space-y-2">
                <h3 className="px-2 text-sm font-semibold text-muted-foreground">Company</h3>
                <ul className="space-y-1">
                  {companyLinks.map((link) => (
                    <li key={link.title}>
                      <MobileLink href={link.href} onClick={closeDrawer}>
                        {link.title}
                      </MobileLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shop Links */}
              <div className="space-y-2">
                <h3 className="px-2 text-sm font-semibold text-muted-foreground">Shop</h3>
                <div className="space-y-1">
                  {shopLinks.map((platform) => (
                    <MobileLink
                      key={platform.title}
                      href={platform.href}
                      onClick={closeDrawer}
                    >
                      {platform.title}
                    </MobileLink>
                  ))}
                </div>
              </div>

              {/* Market Place Link */}
              <MobileLink
                href="/customers/products"
                onClick={closeDrawer}
                className="block py-2 font-medium"
              >
                Market Place
              </MobileLink>
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-4 border-t">
            <div className="flex items-center justify-between">
              {/* Cart Button */}
              <Link
                href="/customers/cart"
                onClick={closeDrawer}
                className="relative flex items-center gap-2"
              >
                <ShoppingCart className="h-8 w-8" />
                {cartItems > 0 && (
                  <span className="absolute -top-1 -right-2 w-5 h-5 flex items-center justify-center bg-red-600 text-white text-xs font-bold rounded-full">
                    {cartItems}
                  </span>
                )}
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2">
                {account?.accessToken ? (
                  <ProfileMenu onItemSelect={closeDrawer} />
                ) : (
                  <>
                    <Button asChild variant="ghost" className="px-4">
                      <Link href="/customers/auth/login" onClick={closeDrawer}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="px-4">
                      <Link href="/customers/auth/register" onClick={closeDrawer}>
                        Register
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

const MobileLink = ({ href, children, className }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center no-underline text-black rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-400 hover:text-accent-foreground",
        className
      )}
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
