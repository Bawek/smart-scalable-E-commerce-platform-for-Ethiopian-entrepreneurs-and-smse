"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";
import { motion } from "framer-motion";

const ShopItem = ({ shop, fullWidth }) => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl dark:hover:shadow-gray-800/50 transition-all duration-300 ${fullWidth ? "w-full" : "w-full sm:w-[48%] lg:w-[31%]"
        } m-2`}
      onClick={() => router.push(`/customers/products?id=${shop?.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-72 w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
          src={imageViewer(shop?.logoImageUrl)}
          alt={shop?.name || "Shop image"}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="p-5 bg-white dark:bg-gray-800 transition-colors duration-300">
        {/* Title and Visit Button */}
        <div className="flex flex-col gap-4 items-center mb-3">
          <motion.p
            whileHover={{ x: 5 }}
            className="inline-block px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100 rounded-lg font-bold text-lg md:text-xl transition-colors duration-300"
          >
            {shop?.name || "Shop Name"}
          </motion.p>

          <button
   
            className="ml-auto w-full px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/customers/products?id=${shop?.id}`);
            }}
          >
            Visit →
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-4 line-clamp-2">
          {shop?.description}
        </p>

        {/* Footer - Category and Rating */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
            {shop?.category}
          </span>

          {/* Owner Information */}
          <motion.div
            className="flex items-center mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
              Owned by:
            </span>
            <div className="flex items-center group">
              <div className="relative">
                <div className="flex items-center">
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {shop?.merchant?.ownerName || "Anonymous Owner"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1 text-gray-400 group-hover:text-blue-500 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                {/* Tooltip on hover */}
                {/* <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 bottom-full mb-2 left-0 transform -translate-x-1/4 px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm transition-all duration-200">
                  Contitnue shoping with this Shop
                  <div className="absolute w-2 h-2 bg-gray-900 rotate-45 -bottom-1 left-1/4"></div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
      </div>
    </motion.div>
  );
};

export default ShopItem;