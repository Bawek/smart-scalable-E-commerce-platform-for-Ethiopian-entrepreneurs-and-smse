'use client'

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, ShoppingCart, TrendingUp, User } from "lucide-react";
import MetricCard from "../components/cardMatrics";
import CardLineChart from "@/app/components/Cards/CardLineChart";
import { RecentSales } from "../components/resentSell";

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState([
    {
      title: "Total Revenue",
      value: "$0.00",
      icon: DollarSign
    },
    {
      title: "Orders",
      value: "0",
      icon: ShoppingCart
    },
    {
      title: "Avg. Order Value",
      value: "$0.00",
      icon: TrendingUp
    },
    {
      title: "Returning Customers",
      value: "0%",
      icon: User
    }
  ]);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard/analytics');
        const data = await res.json();

        if (data && Array.isArray(data)) {
          setMetrics(data.map((metric, index) => ({
            ...metrics[index],
            value: metric?.value ?? metrics[index].value,
            trend: metric?.trend ?? metrics[index].trend
          })));
        }
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
        // fallback remains
      }
    }

    fetchMetrics();
  }, []);

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

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, i) => (
              <MetricCard key={i} {...metric} />
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <CardLineChart />
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
