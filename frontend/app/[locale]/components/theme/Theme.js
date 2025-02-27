"use client";
import Image from "next/image";

import Link from "next/link";
import React from "react";

function Theme({ theme }) {
  return (
    <div className=" w-80  text-black pb-6 bg-blueGray-200 border rounded-md">
      <div className=" w-[300px] h-[270px]">
        <Link href={`site-builder/${theme.id}`}>
          <img
            src='./computer.png'
            alt={theme.name}
            width={300}
            height={270}
            className="   "
          />
        </Link>
      </div>

      <div className=" flex justify-between mt-2 mx-1">
        <div className=" flex flex-col">
          <p className="text-black underline text-sm capitalize hidden lg:inline-block font-semibold">
            {theme.name}
          </p>
          <p className=" mt-3">By Suk Bederete</p>
        </div>
        <Link
          href={`site-builder/${theme.id}`}
          className="bg-blueGray-800 text-white hover:bg-blue-200 h-8 active:bg-blueGray-600  active:bg-opacity-100 text-sm font-bold uppercase px-3  rounded shadow hover:shadow-lg outline-none  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Select{" "}
        </Link>
      </div>
    </div>
  );
}

export default Theme;
