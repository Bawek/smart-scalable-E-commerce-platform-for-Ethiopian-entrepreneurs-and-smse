"use client";
import React from "react";
import ShopItem from "./Shopitem";
import Searchbox from "./Searchbox";
import Banner from "./Banner";
import ProductSlider from "./ProductSlider";
import Footer from "../Footers/Footer";

import { useGetShopsQuery } from "@/lib/features/shop/publicShopSlice";


const ShopCategory = () => {
  const { data, error, isLoading } = useGetShopsQuery();
  console.log("shop list data", data);

  return (
    <>
      <div className="">
        <Banner />

        <div className="  max-w-[90vw] mx-auto mt-14">
          <div className="w-full ">
            <Searchbox shops={data} />{" "}
          </div>
        </div>
        <div className="group flex md:text-2xl items-center justify-center my-10 text-[#1E293B] sm:text-xl font-normal">
          <span className="w-[30%] border-[#1E293B] border-t-[1px] ">
            <hr className="border-none  " />
          </span>
          {/* <span className="border border-[#1E293B] py-2 px-4 rounded-full">
            Top Rated Shops{" "}
          </span> */}
          <span className="w-[30%] border-[#1E293B] border-t-[1px]">
            <hr className="border-none  " />
          </span>
        </div>
        {/* <div className="mx-auto  w-[95vw]">
          <ProductSlider />
        </div> */}
        <div className="  max-w-[90vw] mx-auto my-14">
          <div className="flex  items-center justify-center my-10 text-[#1E293B] md:text-2xl sm:xl font-normal">
            <span className="w-[30%] border-[#1E293B] border-t-[1px] ">
              <hr className="border-none" />
            </span>
            <span className="border border-[#1E293B] py-2 px-4 rounded-full">
              All shops{" "}
            </span>
            <span className="w-[30%] border-[#1E293B] border-t-[1px]">
              <hr />
            </span>
          </div>
          <div className="flex flex-wrap ">
            {data?.map((shop) => (
              <ShopItem key={shop.id} shop={shop} fullWidth={false} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopCategory;
