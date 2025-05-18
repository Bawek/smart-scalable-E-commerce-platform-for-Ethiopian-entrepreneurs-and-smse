'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Download, ShoppingCart, TrendingUp, User } from "lucide-react";
import MetricCard from "../components/cardMatrics";
import CardLineChart from "@/app/components/Cards/CardLineChart";
import { Button } from "@/components/ui/button";
import { RecentSales } from "../components/resentSell";
// import { CalendarDateRangePicker } from "@/components/date-range-picker";
// import { OverviewChart } from "@/components/overview-chart";
// import { SalesByCategoryChart } from "@/components/sales-by-category";
// import { RecentSales } from "@/components/recent-sales";
// import { MetricCard } from "@/components/metric-card";

export default function AnalyticsPage() {
  // Sample data - replace with your API calls
  const metrics = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Orders",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: ShoppingCart
    },
    {
      title: "Avg. Order Value",
      value: "$89.34",
      change: "-2.3%",
      trend: "down",
      icon: TrendingUp
    },
    {
      title: "Returning Customers",
      value: "32%",
      change: "+5.1%",
      trend: "up",
      icon: User
    }
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          {/* Metric Cards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <MetricCard key={i} {...metric} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <OverviewChart /> */}
                <CardLineChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <RecentSales /> */}
                <RecentSales />
              </CardContent>
            </Card>
          </div>


        </TabsContent>
      </Tabs>
    </div>
  );
}