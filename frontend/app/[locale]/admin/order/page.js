"use client";

import React, { useEffect, useState } from "react";

// components

import CardLineChart from "@/app/[locale]/components/Cards/CardLineChart.js";
import CardBarChart from "@/app/[locale]/components/Cards/CardBarChart.js";
import CardPageVisits from "@/app/[locale]/components/Cards/CardPageVisits.js";
import CardSocialTraffic from "@/app/[locale]/components/Cards/CardSocialTraffic.js";

// layout for page

import { AdminWithOutNav } from "@/app/[locale]/layouts/Admin";
import EnhancedTable from "@/app/[locale]/components/Tables/orderList";
import Order from "@/app/[locale]/components/Tables/orderDetial";
import { orderHeadCells } from "@/util/headCells";
import Loader from "@/app/[locale]/components/Prompt/Loader";
import { toast } from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState([]);

  const [sseConnection, setSseConnection] = useState(null);
  const storedmerchantId = localStorage.getItem("unique_id");

  function showOrderNotification() {
    toast.success("New Order", {
      description: "A new order has been placed.",
      duration: 5000, // Duration of the notification in ms
    });
  }

  // Fetch initial data
  useEffect(() => {
    fetch(`http://localhost:8000/order/orders/${storedmerchantId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Initial orders:", data); // Debugging
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching initial orders:", error));
  }, []);

  // Establish SSE connection
  useEffect(() => {
    console.log("New merchant Id:", storedmerchantId); // Debugging

    const url = `http://localhost:8000/order/stream/${storedmerchantId}/`;
    const eventSource = new EventSource(url);
    setSseConnection(eventSource);

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      console.log("New data:", newData); // Debugging
      //     // Determine if the data is new or an update

      if (newData) {
        const existing = orders?.findIndex(
          (order) => order.id === newData[0].id
        );
        console.log("existingIndex:", existing); // Debugging

        if (existing !== -1) {
          setNotification((prev) => [
            ...prev,
            { type: "Update", ...newData[0] },
          ]);
        } else {
          setNotification((prev) => [...prev, { type: "New", ...newData[0] }]);
        }
      }

      console.log("New Notification:", notification); // Debugging
      // showOrderNotification();

      setOrders((prevOrders) => {
        // Check if the order exists in the current state
        const existingIndex = prevOrders.findIndex(
          (order) => order?.id === newData[0]?.id
        );
        if (existingIndex !== -1) {
          console.log("New data:", newData[0]); // Debugging
          // Update the existing order
          console.log("existingIndex:", existingIndex); // Debugging

          const updatedOrders = [...prevOrders];
          updatedOrders[existingIndex] = { ...newData[0] };
          return updatedOrders;
        } else {
          // Add the new order
          return [...prevOrders, { ...newData[0] }];
        }
      });
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
      // Attempt to reconnect or notify the user here
    };

    return () => {
      eventSource.close();
    };
  }, []);
  useEffect(() => {
    console.log("New Notification:", notification); // Debugging
  }, [notification]);

  return (
    <AdminWithOutNav
      notification={notification}
      setNotification={setNotification}
    >
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        {orders?.length > 0 && (
          <EnhancedTable
            key={orders.length + 2}
            rows={orders}
            title={"Pending Order"}
            headCells={orderHeadCells}
            onButtonClick={(event, row) => console.log("Button clicked", row)} // Placeholder for button click handler
          />
        )}
      </div>
      <div className="flex flex-wrap mt-4">
        {orders?.length > 0 ? (
          <EnhancedTable
            key={orders.length + 1}
            rows={orders}
            title={" delivered Order"}
            headCells={orderHeadCells}
            onButtonClick={(event, row) => console.log("Button clicked", row)} // Placeholder for button click handler
          />
        ) : (
          <Loader />
        )}
      </div>
      {/* <Order /> */}
    </AdminWithOutNav>
  );
}
