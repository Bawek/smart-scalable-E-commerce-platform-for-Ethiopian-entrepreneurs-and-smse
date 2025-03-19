'use client'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductItem = ({ product }) => {
    console.log(product,'product')
    return (
        <Link className="no-underline" href={`/customers/products/detail/${product?.id}`}>
            <Card key={product.id} className="group relative overflow-hidden transition-shadow hover:shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[500px] flex flex-col justify-between">
                <div className="relative">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="h-60 w-full object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute right-2 top-2 rounded-full bg-gray-400 px-3 py-1 text-sm font-bold text-white">
                        20% OFF
                    </div>
                </div>

                <div>
                    <CardHeader className="my-0 py-0">
                        <h3 className="text-lg font-bold text-gray-400 dark:text-white truncate">
                            {product.title}
                        </h3>

                        <div className="flex items-center mt-2 mb-4">
                            {[...Array(5)].map((_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={index < Math.round(product.rating?.rate) ? "#fbbf24" : "none"}
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-yellow-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 17.25L18.18 21l-1.64-7.03L22 9.25l-7.19-.61L12 2.25l-2.81 6.39L2 9.25l5.46 4.72L5.82 21z"
                                    />
                                </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-500">({product.rating?.rate})</span>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 flex flex-col flex-grow justify-between">
                        <p className="text-gray-400 text-sm dark:text-gray-300 mb-4 truncate">
                            {product.description}
                        </p>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-bold text-red-600">${product.price}</span>
                            <span className="text-gray-400 line-through">$2,281</span>
                        </div>
                        <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white transition-colors duration-300">
                            Add to Cart
                        </Button>
                    </CardContent>
                </div>
            </Card>
        </Link>
    )
}

export default ProductItem
