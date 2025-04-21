import React from "react";
import "./globals.css";
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster";
// import "grapesjs/dist/css/grapes.min.css";
import { ToastContainer } from 'react-toastify';
// import "bootstrap";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import AppProvider from "./AppProvider";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "E-commerce platform",
  description: "ecommerce application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className={inter.className}>

        <AppProvider>
          <div className=" flex flex-col w-full min-h-screen">
            <div id="page-transition"></div>

            {children}
            <Toaster />
            <ToastContainer />
          </div>
          {/* <NotificationWidget /> */}
        </AppProvider>
      </body>
    </html>
  );
}
