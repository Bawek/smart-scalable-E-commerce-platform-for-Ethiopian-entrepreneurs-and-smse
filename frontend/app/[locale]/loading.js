"use client";
import "../globals.css";

import { RotatingLines } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="loader-container">
      <Loader />
      <div className="w-20 h-20 animate-spin border border-b-blue-500"></div>
    </div>
  );
}

function Loader() {
  return (
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  );
}
