"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import {
  useLoginMutation,
  useRegisterMutation,
} from "@/lib/features/auth/authMerchant";
import Loader from "../../components/Prompt/Loader";
import Auth from "../../layouts/Auth";
import { useRouter } from "next/navigation"; // Corrected import for useRouter
import axios from "axios";

export default function Login() {
  const [
    register,
    {
      isLoading: isRegistering,
      isError: registerError,
      error: registerErrorMessage,
    },
  ] = useRegisterMutation();
  const [
    login,
    { isLoading: isLoggingIn, isError: loginError, error: loginErrorMessage },
  ] = useLoginMutation();
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleUserSignIn = async () => {
      if (isSignedIn && user) {
        const formData = {
          unique_id: user.id,
          email: user.primaryEmailAddress.emailAddress,
          password: "1234", // Ensure secure handling of passwords in production
          role: "client",
        };

        // Attempt to log the user in
        try {
          await login(formData).unwrap();
          console.log("Login Success");
          router.push("/"); // Navigate to home page on success
        } catch (error) {
          console.log("Login Failed, proceeding with registration");

          // Proceed with registration if login fails
          try {
            await register(formData).unwrap();
            console.log("Registration Success");
            router.push("/"); // Navigate to home page after successful registration
          } catch (registrationError) {
            console.error("Registration Error:", registrationError);
            // Handle registration errors appropriately
          }
        }
      }
    };

    handleUserSignIn();
  }, [isSignedIn, user, register, login, router]);

  return (
    <Auth>
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    </Auth>
  );
}
