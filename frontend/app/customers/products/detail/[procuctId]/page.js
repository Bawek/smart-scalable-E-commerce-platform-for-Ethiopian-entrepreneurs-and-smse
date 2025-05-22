'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Rating from "../../../components/Rating";
import { useGetProductsByIdQuery } from "@/lib/features/products/products";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import useCart from "@/hooks/use-cart";
import { formatCurrency } from "@/util/currency";
import { imageViewer } from "@/app/system-admin/lib/imageViewer";

export default function ProductDetailPage() {
  const params = useParams();
  const { procuctId } = params
  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError
  } = useGetProductsByIdQuery(procuctId);
  const product = productData?.product;
  const relatedProducts = []
  // const {
  //   data: relatedProducts = [],
  //   isLoading: isRelatedLoading,
  //   isError: isRelatedError
  // } = useGetRelatedProductsQuery(params.productId, {
  //   skip: !params.productId // Skip if no productId
  // });

  const {
    cart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    isLoading: isCartLoading
  } = useCart(); const { width } = useWindowSize();
  const isMobile = (width || 0) < 548;
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  // Find if product is in cart and get quantity
  const cartItem = cart.find(item => item.productId === product?.id);
  const cartQuantity = cartItem?.quantity || 0;
  const isInCart = cartQuantity > 0;
  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index) => {
    api?.scrollTo(index);
  };

  const handleAddToCart = async () => {
    // if (!selectedSize) {
    //   toast.warning("Please select a size");
    //   return;
    // }

    try {
      await addItemToCart({
        productId: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: 1,
        image: product.images?.[0],
        color: selectedColor,
        size: selectedSize,
        stock: product.quantity
      });
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error("Add to cart error:", error);
    }
  };

  const handleIncreaseQuantity = async () => {
    try {
      await updateItemQuantity(product.id, cartQuantity + 1);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (cartQuantity <= 1) {
      try {
        await removeItemFromCart(product.id);
        toast.info(`${product.name} removed from cart`);
      } catch (error) {
        toast.error("Failed to remove item");
        console.error("Remove item error:", error);
      }
      return;
    }

    try {
      await updateItemQuantity(product.id, cartQuantity - 1);
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error("Update quantity error:", error);
    }
  };

  if (isProductError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl font-bold text-red-600">Error Loading Product</h2>
        <p className="text-gray-600 mt-2">
          {productError?.message || "Failed to load product details"}
        </p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (isProductLoading || !product) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Image Gallery Skeleton */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-2">
            <div className="flex md:flex-col gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square min-w-[80px] md:min-w-[100px]" />
              ))}
            </div>
            <Skeleton className="aspect-square w-full" />
          </div>

          {/* Product Details Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-6 w-1/4" />

            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-10" />
                ))}
              </div>
            </div>

            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className={`${isMobile ? "max-w-[70%]" : "w-full"} grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8`}>
        {/* Product Images */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-2">
          {/* Thumbnails */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 order-1 md:order-1">
            {product.images?.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square min-w-[80px] md:min-w-[100px] cursor-pointer border-2 ${current === index ? 'border-primary' : 'border-transparent'
                  }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={imageViewer(img) || '/placeholder-product.jpg'}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="rounded-md object-cover"
                  sizes="(max-width: 768px) 20vw, 10vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Main Carousel */}
          <Carousel
            className="w-full h-full relative group order-1 md:order-2"
            setApi={setApi}
          >
            <CarouselContent>
              {product.images?.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={imageViewer(img) || '/placeholder-product.jpg'}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute top-1/2 -translate-y-1/2 w-full px-2 md:px-4 flex justify-between">
              <CarouselPrevious
                onClick={() => api?.scrollPrev()}
                className="static transform-none bg-white/80 hover:bg-white shadow-lg hover:shadow-xl h-8 w-8 md:h-10 md:w-10"
              />
              <CarouselNext
                onClick={() => api?.scrollNext()}
                className="static transform-none bg-white/80 hover:bg-white shadow-lg hover:shadow-xl h-8 w-8 md:h-10 md:w-10"
              />
            </div>
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="space-y-4 md:space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <Rating rating={product.rating || 4.2} />
              <Link href="#reviews" className="text-sm text-gray-600">
                ({product.reviewCount || 0} reviews)
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-xl md:text-2xl font-bold">
              {formatCurrency(product.discountPrice || product.price)}
            </p>
            {product.discountPrice && (
              <s className="text-sm text-gray-500">
                {formatCurrency(product.price)}
              </s>
            )}
            {product.discountPrice && (
              <Badge className="bg-orange-600 text-white">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </Badge>
            )}
          </div>

          <div className="space-y-3 md:space-y-4">
            {product.colors?.length > 0 && (
              <div>
                <p className="font-medium mb-1 md:mb-2">Color</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      className="h-10 w-10 md:h-12 md:w-12 rounded-full p-0"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color} color`}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div>
                <p className="font-medium mb-1 md:mb-2">Size</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      className="h-10 md:h-12 hover:bg-gray-100 text-sm md:text-base"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                <Link href="#" className="text-sm text-gray-600 mt-1 md:mt-2 inline-block underline">
                  Size Guide
                </Link>
              </div>
            )}

            <div className="space-y-2">
              {product.quantity <= 0 ? (
                <Button
                  className="w-full py-4 md:py-6 text-md md:text-lg"
                  variant="outline"
                  disabled
                >
                  Sold Out
                </Button>
              ) : isInCart ? (
                <div className="flex items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1"
                    onClick={handleDecreaseQuantity}
                    disabled={isCartLoading}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center font-medium text-lg">
                    {cartQuantity}
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 flex-1"
                    onClick={handleIncreaseQuantity}
                    disabled={isCartLoading || cartQuantity >= product.quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-orange-900 py-4 md:py-6 text-md md:text-lg"
                  onClick={handleAddToCart}
                  disabled={isCartLoading}
                >
                  {isCartLoading ? 'Adding...' : 'Add to Cart'}
                </Button>
              )}
              {product.quantity <= 0 && (
                <p className="text-sm text-red-600 text-center">This product is currently out of stock</p>
              )}
            </div>
            <div className="pt-3 md:pt-4 border-t">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-700 text-xs md:text-sm">✓ 19 ETB for Shipping</Badge>
                  <Badge className="bg-orange-700 text-xs md:text-sm">⏱️ Maximum 2-Day Delivery</Badge>
                  {product.discountPrice && (
                    <Badge className="bg-orange-700 text-xs md:text-sm">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Free returns and 100-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-8 md:mt-12">
        <TabsList className="flex overflow-x-auto">
          <TabsTrigger value="description" className="text-sm md:text-base px-3 md:px-4">
            Description
          </TabsTrigger>
          <TabsTrigger value="features" className="text-sm md:text-base px-3 md:px-4">
            Features
          </TabsTrigger>
          <TabsTrigger value="reviews" className="text-sm md:text-base px-3 md:px-4">
            Reviews ({product.reviewCount || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="mt-4">
          <p>{product.description || 'No description available'}</p>
        </TabsContent>
        <TabsContent value="features" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            {product.features?.length > 0 ? (
              product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))
            ) : (
              <li>No features listed</li>
            )}
          </ul>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          {product.reviews?.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-4">
                  <Rating rating={review.rating} />
                  <p className="font-medium mt-1">{review.title}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-500 mt-1">- {review.userName}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet</p>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Related Products</h2>
          {isRelatedLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-3 md:p-4">
                    <Skeleton className="aspect-square w-full mb-3 md:mb-4" />
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isRelatedError ? (
            <p className="text-gray-600">Failed to load related products</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {relatedProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-3 md:p-4">
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="relative aspect-square mb-3 md:mb-4">
                        <Image
                          src={imageViewer(product.images?.[0]) || '/placeholder-product.jpg'}
                          alt={product.name}
                          fill
                          className="rounded-lg object-cover"
                          sizes="(max-width: 640px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-base md:text-lg font-bold">
                          {formatCurrency(product.discountPrice || product.price)}
                        </p>
                        {product.discountPrice && (
                          <s className="text-sm text-gray-500">
                            {formatCurrency(product.price)}
                          </s>
                        )}
                      </div>
                    </Link>
                  </CardContent>
                  <CardFooter className="p-3 md:p-4 pt-0">
                    <Button className="w-full text-sm md:text-base" variant="outline">
                      Quick Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}