'use client'
import React from 'react'
import CardLineChart from '../components/Cards/CardLineChart'
import CardBarChart from '../components/Cards/CardBarChart'
import CardPageVisits from '../components/Cards/CardPageVisits'
import CardSocialTraffic from '../components/Cards/CardSocialTraffic'

const MerchantDashbord = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {/* <Admin> */}
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
      {/* </Admin> */}
    </div>
  )
}

export default MerchantDashbord
