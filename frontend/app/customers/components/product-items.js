'use client';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/util/currency';
import { ShoppingCart, Eye, Minus, Plus, Loader2 } from 'lucide-react';
import { imageViewer } from '@/app/system-admin/lib/imageViewer';
import { toast } from 'react-toastify';
import useCart from '@/hooks/use-cart';
import Rating from './Rating';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from 'next/navigation';

const ProductItem = ({ product }) => {
    const {
        id,
        name,
        description,
        price,
        discountPrice,
        brand,
        images = [],
        quantity: stockQuantity
    } = product;
    const searchParams = useSearchParams();

    const shopId = useMemo(() => searchParams.get('id'), [searchParams]);
    const {
        cart,
        isLoading,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        loadCart
    } = useCart();
    useEffect(() => {
        loadCart();
    }, []);

    // Find the cart item if it exists
    const cartItem = cart.find(item => item.productId === id);
    const currentQuantity = cartItem?.quantity || 0;
    const isInCart = currentQuantity > 0;

    const handleAddToCart = async (e) => {
        e.stopPropagation();
        localStorage.setItem('shopId', shopId)
        if (stockQuantity <= 0) {
            toast.warning('This product is out of stock');
            return;
        }

        try {
            await addItemToCart({
                productId: id,
                name,
                price: price,
                quantity: 1,
                discountPrice,
                image: images[0],
                stock: stockQuantity
            });
        } catch (error) {
            console.error('Add to cart failed:', error);
            toast.error(error.message || 'Could not add to cart.');
        }
    };

    const handleIncreaseQuantity = async () => {
        if (currentQuantity >= stockQuantity) {
            toast.warning(`Only ${stockQuantity} items available`);
            return;
        }

        try {
            await updateItemQuantity(cartItem?.id, currentQuantity + 1);
        } catch (error) {
            console.error('Failed to increase quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    const handleDecreaseQuantity = async (e) => {
        e.stopPropagation();
        console.log(id, 'id of the items')
        if (currentQuantity <= 1) {
            console.log('current id less', id)
            try {
                await removeItemFromCart(cartItem?.id);
            } catch (error) {
                console.error('Failed to remove item:', error);
                toast.error('Failed to remove item');
            }
            return;
        }

        try {
            await updateItemQuantity(cartItem?.id, currentQuantity - 1);
        } catch (error) {
            console.error('Failed to decrease quantity:', error);
            toast.error('Failed to update quantity');
        }
    };

    return (
        <div className="group relative transition-all duration-300 hover:shadow-lg rounded-xl border-2 border-gray-100 bg-white dark:bg-gray-800 h-[400px] flex flex-col hover:border-primary/20 hover:scale-[1.02]">
            <div className="no-underline flex-1 flex flex-col">
                <Link href={`/customers/products/detail/${id}`} className="flex-1 flex items-center flex-nowrap hover:text-orange-600 hover:underline justify-center gap-1 transition-all text-sm font-medium">
                    <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
                        <img
                            src={imageViewer(images[0]) || '/placeholder-product.jpg'}
                            alt={name}
                            className="h-full w-full object-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* <div className={`absolute bottom-2 left-2 rounded-full px-2 py-1 text-xs font-bold ${stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {stockQuantity > 0 ? `🚀 ${stockQuantity} available` : '😢 Sold out'}
                        </div> */}
                        {Math.round(discountPrice) > 0 && (
                            <div className="absolute top-2 right-2 rotate-12 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-extrabold shadow-md">
                                {Math.round(discountPrice)}% TAKEOFF
                            </div>
                        )}
                    </div>
                </Link>

                <div className="flex-1 flex flex-col px-3 pt-3 gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-extrabold text-gray-800 dark:text-white line-clamp-2 font-[Poppins]">
                            {name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic"> {brand}</p>
                    </div>

                    <div className="flex items-center my-2">
                        <Rating />
                        <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 100) + 20})</span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-300  line-clamp-1 truncate flex items-start">
                        {description}
                    </p>

                    <div className="py-2">
                        <div className="flex items-center justify-between gap-2 group-hover:animate-bounce">
                            <span className="text-xl font-black text-gray-900 dark:text-white">
                                {formatCurrency(Math.round(discountPrice) > 0 ? price - ((price * Math.round(discountPrice)) / 100) : price)}
                            </span>
                            {Math.round(discountPrice) > 0 && (
                                <s className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatCurrency(price)}
                                </s>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 py-2 px-2 justify-between items-center">
                {isInCart ? (
                    <div className="flex items-center justify-center gap-2">
                        <Badge
                            size="sm"
                            onClick={handleDecreaseQuantity}
                            disabled={isLoading}
                            className="cursor-pointer bg-secondary hover:bg-slate-300 rounded-md"
                        >
                            <Minus className="h-4 w-4 text-orange-600" />
                        </Badge>
                        <p className="flex-1 text-center font-medium  dark:text-white">
                            {isLoading ? <Loader2 className='w-4 h-4 animate-spin' /> : currentQuantity}
                        </p>
                        <Badge
                            size="sm"
                            onClick={handleIncreaseQuantity}
                            disabled={isLoading || currentQuantity >= stockQuantity}
                            className="cursor-pointer bg-secondary hover:bg-slate-300 rounded-full"
                        >
                            <Plus className="h-4 w-4 text-orange-600" />
                        </Badge>
                    </div>
                ) : (
                    <Button
                        onClick={handleAddToCart}
                        disabled={stockQuantity <= 0 || isLoading}
                        className="flex-1 transition-all flex items-center justify-center gap-1 w-full bg-slate-400 h-10"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        {stockQuantity <= 0 ? 'Sold Out' : isLoading ? 'Adding...' : 'Add to Cart'}
                    </Button>
                )}
            </div>

        </div>
    );
};

export default ProductItem;