import React from "react";
// import { Inter } from "next/font/google";
import "../globals.css";
import { Inter } from 'next/font/google'
import AppProvider from "./AppProvider";
import ClientLayout from "./ClientLayout";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../../styles/bootstrap.scss'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suk-Bederete",
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

              <ClientLayout>
                {children}
                <Toaster />
                <ToastContainer />
              </ClientLayout>
            </div>
          </AppProvider>
        </body>
      </html>
  );
}
