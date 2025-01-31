"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useGetMerchantQuery } from "@/lib/features/auth/authMerchant";
import { useGetCustomerQuery } from "@/lib/features/auth/authCustomer";

export default function Navbar({ setNavbarOpen, navbarOpen }) {
  // const [navbarOpen, setNavbarOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUniqueId(localStorage.getItem("unique_id"));
      setRole(localStorage.getItem("role"));
    }
  }, []);

  const {
    data: merchant,
    error: merchantError,
    isLoading: isLoadingMerchant,
  } = useGetMerchantQuery(uniqueId);
  const {
    data: customer,
    error: customerError,
    isLoading: isLoadingCustomer,
  } = useGetCustomerQuery(uniqueId);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              href="/"
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              Suk-Bederete
            </Link>
            <div onClick={() => setNavbarOpen(false)} className=" w-full"></div>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={(e) => {
                setNavbarOpen(!navbarOpen);
              }}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto sm:pl-10 pb-10">
              {uniqueId && (
                <>
                  <li className="flex items-center">
                    <button className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                      <Link
                        href={
                          role === "merchant" ? "/admin/settings" : "/profile"
                        }
                      >
                        Profile
                      </Link>
                    </button>
                  </li>
                  {role === "merchant" && (
                    <li className="flex items-center">
                      <button className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                        <Link href="/admin/dashboard" className={""}>
                          Dashboard
                        </Link>
                      </button>
                    </li>
                  )}
                </>
              )}

              {!uniqueId && (
                <li className="flex items-center">
                  <button className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                    <Link href="/auth/customer-login" className={""}>
                      Login
                    </Link>
                  </button>
                </li>
              )}
              {!uniqueId && (
                <li className="flex items-center">
                  <button className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                    <Link href="/auth/customer-register" className={""}>
                      Register
                    </Link>
                  </button>
                </li>
              )}
              <li className="flex items-center">
                <button className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 mx-3 lg:py-2 flex items-center text-xs uppercase font-bold">
                  <Link href="/auth/register" className={""}>
                    Welcome to Suk-Bederete
                  </Link>
                </button>
              </li>
              <li className="flex items-center">
                <LanguageSwitcher />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
