"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "../../layouts/Auth";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import Loader from "@/app/[locale]/components/Prompt/Loader";
import { useRegisterMutation } from "@/lib/features/auth/authMerchant";
import { useDispatch } from "react-redux";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
import Link from "next/link";
const i18nNamespaces = ["signup"];

export default function Register({ params: { locale } }) {
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "merchant");

      const response = await register(formData).unwrap();
      // Handle successful registration, e.g., redirect to login page
      console.log(response.message);
      // Store the merchant the response it returned to the slice
      if (response?.tokens) {
        console.log("uid", response?.data?.unique_id);
        localStorage.setItem("unique_id", response?.data?.unique_id);
        localStorage.setItem("role", response?.data?.user?.role);
        document.cookie = `access_token=${response?.tokens?.access}; path=/`;
        document.cookie = `refresh_token=${response?.tokens?.refresh}; path=/`;
        // Store tokens in localStorage
        localStorage.setItem("access_token", response.tokens?.access);
        localStorage.setItem("refresh_token", response.tokens?.refresh);
        dispatch(setMerchant(response?.data));
        router.push("/prompt/prompt");
        redirect;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Registration failed:", error.message);
      console.log("Response:", error?.response);
    }
  };

  const [translations, setTranslations] = useState({
    t: () => {}, // Placeholder function until translations are loaded
    resources: {},
  });

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const { t, resources } = await initTranslations(locale, i18nNamespaces);
        setTranslations({ t, resources });
        console.log("Translations initialized successfully");
      } catch (error) {
        console.error("Error initializing translations:", error);
        // Optionally, handle the error further here
      }
    };

    loadTranslations();
  }, [locale]);

  if (!translations.t) {
    return null; // Or a loading indicator
  }

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={translations.resources}
    >
      <Auth>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      {translations.t("sign_up_with")}
                    </h6>
                  </div>
                  <div className="btn-wrapper text-center">
                    <button
                      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                      type="button"
                    >
                      <img
                        alt="..."
                        className="w-5 mr-1"
                        src="/img/google.svg"
                      />
                      Google
                    </button>
                  </div>
                  <hr className="mt-6 border-b-1 border-blueGray-300" />
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>
                      {translations.t("or_sign_up_with_credentials")}
                    </small>
                  </div>
                  <form onSubmit={handleRegister}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {translations.t("email")}
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={translations.t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        {translations.t("password")}
                      </label>
                      <input
                        type="password"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder={translations.t("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          {translations.t("agree_with_privacy_policy")}{" "}
                          <Link
                            href="/auth/login"
                            className="text-lightBlue-500"
                            // onClick={(e) => e.preventDefault()}
                          >
                            {translations.t("privacy_policy")}
                          </Link>
                        </span>
                      </label>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading
                          ? translations.t("loading")
                          : translations.t("create_account")}
                      </button>
                    </div>
                  </form>
                  <div className="text-center mt-2">
                    <span className="text-sm">
                      {translations.t("already have account?")}{" "}
                      <Link
                        href="/auth/login"
                        className="font-bold text-lightBlue-500"
                      >
                        {translations.t("Sign in")}
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </TranslationsProvider>
  );
}
