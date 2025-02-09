"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

import Loader from "../../components/Prompt/Loader";
import Auth from "../../layouts/Auth";
import { useRouter } from "next/navigation"; // Corrected import for useRouter
import { useRegisterMutation } from "@/lib/features/auth/authCustomer";

export default function Login() {
  const [
    register,
    {
      isLoading: isRegistering,
      isError: registerError,
      error: registerErrorMessage,
    },
  ] = useRegisterMutation()
  const { isSignedIn, user } = useUser();
  const router = useRouter(); 

  useEffect(() => {
    const handleUserSignIn = async () => {
      if (isSignedIn && user) {
        console.log(user,'after one')
        const formData = {
          clerkId: user.id,
          email: user.primaryEmailAddress.emailAddress,
        };
        try {
          await register(formData).unwrap();
          console.log("Registration Success");
          router.push("/"); // Navigate to home page after successful registration
        } catch (registrationError) {
          console.error("Registration Error:", registrationError);
          // Handle registration errors appropriately
        }
      }
    };

    handleUserSignIn();
  }, [isSignedIn, user, register, router]);

  return (
    <Auth>
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    </Auth>
  );
}
