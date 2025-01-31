"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Auth from "../../layouts/Auth";
import { useLoginMutation } from "@/lib/features/auth/authCustomer";
import { useRouter } from "next/navigation";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import { useDispatch } from "react-redux";
import { useGetCustomizedTemplateQuery } from "@/lib/features/shop/shop";
import { useGetshopMerchantQuery } from "@/lib/features/shop/publicShopSlice";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
import { Spinner } from "react-bootstrap"; // Assuming you have react-bootstrap installed

const i18nNamespaces = ["login"];

export default function Login({ params: { locale } }) {
  const [login, { isLoading }] = useLoginMutation();
  console.log(locale);
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
  }, [locale]); // Re-run the effect if the locale changes

  if (!translations.t) {
    return null; // Or a loading indicator
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const unique_id = localStorage.getItem("unique_id");
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: shopMerchant,
    error: shopError,
    isSuccess: isShopSuccess,
  } = useGetshopMerchantQuery(merchantId, {
    skip: !merchantId,
  });
  const {
    data: customizedTemplate,
    error: templateError,
    isSuccess: isTemplateSuccess,
  } = useGetCustomizedTemplateQuery(merchantId, {
    skip: !merchantId,
  });

  // useEffect(() => {
  //   if (unique_id) {
  //     router.back();
  //   }
  // }, [unique_id]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error states
    setEmailError(false);
    setPasswordError(false);

    // Validate inputs
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!email || !password) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", "client");

      const response = await login(formData).unwrap();

      console.log("Response:", response);

      if (response?.tokens) {
        if (response?.tokens) {
          console.log("role", response?.data?.user?.role);
          localStorage.setItem("unique_id", response?.data?.unique_id);
          localStorage.setItem("role", response?.data?.user?.role);
          document.cookie = `access_token=${response?.tokens?.access}; path=/`;
          document.cookie = `refresh_token=${response?.tokens?.refresh}; path=/`;
          // Store tokens in localStorage
          localStorage.setItem("access_token", response.tokens?.access);
          localStorage.setItem("refresh_token", response.tokens?.refresh);
          dispatch(setMerchant(response?.data));
          router.back();
        } else {
          throw new Error("Invalid response structure");
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setResponseMessage(
        error.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={translations.resources}
    >
      <Auth>
        <div className="container mx-auto px-4 h-full">
          <div className="flex content-center items-center justify-center h-full">
            <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                <div className="rounded-t mb-0 px-6 py-6">
                  <div className="text-center mb-3">
                    <h6 className="text-blueGray-500 text-sm font-bold">
                      {translations.t("sign_in_with")}
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
                  {responseMessage && (
                    <div className="text-center mt-4">
                      <p className="text-red-500">{responseMessage}</p>
                    </div>
                  )}
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <div className="text-blueGray-400 text-center mb-3 font-bold">
                    <small>
                      {translations.t("or_sign_in_with_credentials")}
                    </small>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        {translations.t("email")}
                      </label>
                      <input
                        type="email"
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          emailError ? "border-red-500" : ""
                        }`}
                        placeholder={translations.t("email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <p className="text-red-500 text-xs italic">
                          {translations.t("email_required")}
                        </p>
                      )}
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="password"
                      >
                        {translations.t("password")}
                      </label>
                      <input
                        type="password"
                        className={`border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 ${
                          passwordError ? "border-red-500" : ""
                        }`}
                        placeholder={translations.t("password")}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordError && (
                        <p className="text-red-500 text-xs italic">
                          {translations.t("password_required")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                        />
                        <span className="ml-2 text-sm font-semibold text-blueGray-600">
                          {translations.t("remember_me")}
                        </span>
                      </label>
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        ) : (
                          translations.t("sign_in")
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>{translations.t("forgot_password")}</small>
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link
                    href="/auth/customer-register"
                    className="text-blueGray-200"
                  >
                    <small>{translations.t("create_new_account")}</small>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auth>
    </TranslationsProvider>
  );
}
