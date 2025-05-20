'use client'

import React from 'react'
import CardLineChart from '../components/Cards/CardLineChart'
import CardBarChart from '../components/Cards/CardBarChart'
import { SectionCards } from './components/merchantDaBoxs'
import { useGetMerchantDashboardInfoQuery } from '@/lib/features/merchant/registrationApi'
import { useSelector } from 'react-redux'
const statsData = [
    {
        title: "Total Revenue",
        value: "$1,250.00",
        trend: "up",
        change: "+12.5%",
        footerTitle: "Trending up this month",
        footerSubtitle: "Compared to last month",
    },
    {
        title: "Total Orders",
        value: "356",
        trend: "up",
        change: "+8.2%",
        footerTitle: "Order volume increasing",
        footerSubtitle: "Avg. order value: $45.00",
    },
    {
        title: "Average Order Value (AOV)",
        value: "$45.00",
        trend: "down",
        change: "-5.3%",
        footerTitle: "Slightly lower than last month",
        footerSubtitle: "Promotions may help boost AOV",
    },
    {
        title: "New Customers",
        value: "124",
        trend: "up",
        change: "+15%",
        footerTitle: "Acquisition improving",
        footerSubtitle: "25% from referrals",
    },
    {
        title: "Inventory Alert",
        value: "12 items",
        trend: "up",
        change: "+3",
        footerTitle: "Low stock items",
        footerSubtitle: "Replenish soon",
    },
    {
        title: "Top Selling Product",
        value: "Premium Headphones",
        trend: "up",
        change: "+42%",
        footerTitle: "High demand item",
        footerSubtitle: "Restock recommended",
    },

];

const MerchantDashboard = () => {
  const accountId = useSelector((state) => state.account.id)
  const { data: DashboardStatus } = useGetMerchantDashboardInfoQuery(accountId)
  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8  space-y-6">

        {/* Dashboard Title */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center text-primary">
          Merchant Dashboard Overview
        </h1>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Section: Summary Cards */}
        <SectionCards statsData={DashboardStatus} />

        {/* Section: Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardLineChart />
          <CardBarChart />
        </div>
      </div>
    </div>
  )
}

export default MerchantDashboard
