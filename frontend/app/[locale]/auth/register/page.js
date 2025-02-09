"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Auth from "../../layouts/Auth";
import { setMerchant } from "@/lib/features/auth/merchantSlice";
import { useRegisterMutation } from "@/lib/features/auth/authMerchant";
import { useDispatch } from "react-redux";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "../../components/Translation/TranslationsProvider";
import Link from "next/link";
import { fields } from "./data/formControls";
import { merchantRegistrationSchema } from "./data/schema";
import { CustomForm } from "../../components/forms/common-form/my-form";
const i18nNamespaces = ["signup"];

export default function Register() {
  const { locale } = useParams()

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
    t: () => { }, // Placeholder function until translations are loaded
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
        <CustomForm
          fields={fields}
          schema={merchantRegistrationSchema}
          onSubmit={handleRegister}

        />
      </Auth>
    </TranslationsProvider>
  );
}
