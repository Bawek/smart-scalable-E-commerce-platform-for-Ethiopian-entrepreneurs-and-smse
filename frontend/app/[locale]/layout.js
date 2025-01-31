import React from "react";
// import { Inter } from "next/font/google";
import "../globals.css";
import { Inter} from 'next/font/google'
// import { ClerkProvider } from "@clerk/nextjs";
import AppProvider from "./AppProvider";
import ClientLayout from "./ClientLayout";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Suk-Bederete",
  description: "ecommerce application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning={true}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body className={inter.className}>
        <AppProvider>
          <div className=" flex flex-col w-full min-h-screen">
            <div id="page-transition"></div>

            <ClientLayout>{children}</ClientLayout>
          </div>
        </AppProvider>
      </body>
    </html>
   </ClerkProvider>
  );
}
