'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/util/currency';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/lib/features/cart/cartSlice';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';


const ProductItem = ({ product }) => {
    const dispatch = useDispatch();  
    const [quantity, setQuantity] = useState(product.quantity)

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addItemToCart({ ...product }));
        setQuantity(quantity > 0 ? quantity - 1 : 0)
    };
    const {
        id,
        name,
        description,
        price,
        discountPrice,
        brand,
        images = []
    } = product;
    return (
        <div className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg rounded-xl border-2 border-gray-100 bg-white dark:bg-gray-800 h-[300px] flex flex-col hover:border-primary/20 hover:scale-[1.02]">
            {/* Product Image with Fun Elements */}
            <Link href={`/products/${id}`} className="no-underline flex-1 flex flex-col">
                <div className="relative h-16 w-full overflow-hidden rounded-t-lg">
                    <img
                        src={imageViewer(images[0]) || '/placeholder-product.jpg'}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Fun Stock Indicator */}
                    <div className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-xs font-bold ${quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {quantity > 0 ? `🚀 ${quantity} available` : '😢 Sold out'}
                    </div>

                    {/* Playful Discount Tag */}
                    {discountPrice && (
                        <div className="absolute top-2 right-2 rotate-12 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-extrabold shadow-md">
                            SAVE {Math.round(((price - discountPrice) / price) * 100)}%
                        </div>
                    )}
                </div>

                {/* Product Info with Fun Typography */}
                <div className="flex-1 flex flex-col px-3 pt-3 gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-extrabold text-gray-800 dark:text-white line-clamp-2 font-[Poppins]">
                            {name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic"> {brand}</p>
                    </div>

                    {/* Emoji Rating */}
                    <div className="flex items-center my-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-lg">
                                {i < 4 ? '⭐' : '☆'}
                            </span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 20})</span>
                    </div>
                    {/* Description with Fun Icon */}
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 flex items-start">
                        {description}
                    </p>

                    {/* Price with Bounce Animation */}
                    <div className="py-2">
                        <div className="flex items-center justify-between  gap-2 group-hover:animate-bounce">
                            <span className="text-xl font-black text-gray-900 dark:text-white">
                                {formatCurrency(discountPrice || price)}
                            </span>
                            {discountPrice && (
                                <s className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatCurrency(price)}
                                </s>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
            {/* Action Buttons - Themed */}
            <div className="flex gap-1 py-2">
                {/* Add to Cart Button */}
                <Button
                    onClick={handleAddToCart}
                    disabled={quantity <= 0}
                    className={`flex-1 transition-all flex items-center justify-center gap-1 
    }`}
                >
                    <ShoppingCart className="w-4 h-4" />
                    {quantity > 0 ? 'Add to Cart' : 'Sold Out'}
                </Button>

                {/* Quick View Button */}
                <Button
                    className="flex-1  transition-all flex items-center justify-center gap-1
              "
                >
                    <Eye className="w-4 h-4" />
                    Quick View
                </Button>
            </div>
        </div>

    );
};

export default ProductItem;
