"use client";
import React from "react";

// components

import CardSettings from "@/app/[locale]/components/Cards/CardSettings.js";
import CardProfile from "@/app/[locale]/components/Cards/CardProfile.js";
import ClientProfile from "../../components/ClientProfile/ClientProfile";
import OrderHistory from "../../components/ClientProfile/OrderHistory";
// layout for page

import { Admin } from "@/app/[locale]/layouts/Admin";
import ProfileContainer from "../../components/ClientProfile/ProfileContainer";
export default function Settings() {
  return (
    <Admin>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">{/* <CardProfile /> */}</div>
      </div>
    </Admin>
  );
}
