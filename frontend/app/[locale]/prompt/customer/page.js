"use client";
import React from "react";
import MerchantForm from "../../components/Prompt/MerchantForm";
import CustomerForm from "../../components/Prompt/CustomerForm";
import Loader from "../../components/Prompt/Loader";

const MerchantSignup = () => {
  const unique_id = localStorage.getItem("unique_id");
  // const uid = localStorage.getItem("uid");
  const handleFormSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:8000/auth/customer/update/${unique_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, uid: uid }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log("Customer created:", result);
      // Handle successful creation, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4"> "Customer Signup"</h1>

      <CustomerForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default MerchantSignup;
