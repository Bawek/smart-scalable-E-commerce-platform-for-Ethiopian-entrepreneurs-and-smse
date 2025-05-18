'use client'

import React from 'react'
import CardLineChart from '../components/Cards/CardLineChart'
import CardBarChart from '../components/Cards/CardBarChart'
import { SectionCards } from './components/merchantDaBoxs'
import { useGetMerchantDashboardInfoQuery } from '@/lib/features/merchant/registrationApi'
import { useSelector } from 'react-redux'

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
        <SectionCards statData={DashboardStatus} />

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
