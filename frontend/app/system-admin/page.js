import React from "react";
import CardLineChart from "../components/Cards/CardLineChart";
import CardBarChart from "../components/Cards/CardBarChart";
import CardPageVisits from "../components/Cards/CardPageVisits";
import CardSocialTraffic from "../components/Cards/CardSocialTraffic";
import { SectionCards } from "./components/dashbard-cards";

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full text-foreground flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-6">

        {/* Dashboard Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-primary">
          Admin Dashboard Overview
        </h1>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-4  md:gap-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <CardLineChart />
          </div>
          <CardBarChart />
        </div>
        <div className="flex flex-wrap mt-4">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
            <CardPageVisits />
          </div>
          <div className="w-full xl:w-4/12 px-4">
            <CardSocialTraffic />
          </div>
        </div>
      </div>
    </div>
  );
}
