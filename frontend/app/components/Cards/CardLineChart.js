
"use client";
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function CardLineChart({ revenueData }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!revenueData) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    
    const labels = revenueData.map(item => item.month.trim());
    const currentYearData = revenueData.map(item => item.current_year || 0);
    const previousYearData = revenueData.map(item => item.previous_year || 0);

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: currentYearData,
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: previousYearData,
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
            position: "bottom",
          },
        },
        scales: {
          x: {
            ticks: { color: "rgba(255,255,255,.7)" },
            grid: { display: false },
          },
          y: {
            ticks: { color: "rgba(255,255,255,.7)" },
            grid: { color: "rgba(255, 255, 255, 0.15)" },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [revenueData]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Overview</h6>
            <h2 className="text-white text-xl font-semibold">Sales Value</h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-[350px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}

//

// import React, { useEffect, useRef } from "react";
// import Chart from "chart.js/auto";

// export default function CardLineChart() {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const ctx = chartRef.current.getContext("2d");
//     chartInstance.current = new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [
//           {
//             label: new Date().getFullYear(),
//             backgroundColor: "#4c51bf",
//             borderColor: "#4c51bf",
//             data: [65, 78, 66, 44, 56, 67, 75],
//             fill: false,
//           },
//           {
//             label: new Date().getFullYear() - 1,
//             backgroundColor: "#fff",
//             borderColor: "#fff",
//             data: [40, 68, 86, 74, 56, 60, 87],
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         plugins: {
//           legend: {
//             labels: {
//               color: "white",
//             },
//             position: "bottom",
//           },
//         },
//         scales: {
//           x: {
//             ticks: { color: "rgba(255,255,255,.7)" },
//             grid: { display: false },
//           },
//           y: {
//             ticks: { color: "rgba(255,255,255,.7)" },
//             grid: { color: "rgba(255, 255, 255, 0.15)" },
//           },
//         },
//       },
//     });

//     return () => {
//       chartInstance.current.destroy();
//     };
//   }, []);

//   return (
//     <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
//       <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//         <div className="flex flex-wrap items-center">
//           <div className="relative w-full max-w-full flex-grow flex-1">
//             <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">Overview</h6>
//             <h2 className="text-white text-xl font-semibold">Sales Value</h2>
//           </div>
//         </div>
//       </div>
//       <div className="p-4 flex-auto">
//         <div className="relative h-[350px]">
//           <canvas ref={chartRef}></canvas>
//         </div>
//       </div>
//     </div>
//   );
// }
