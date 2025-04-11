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

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect } from "react";
import Rating from "../../../components/Rating";

export default function ProductDetailPage() {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const { width } = useWindowSize();
  const isMobile = (width || 0) < 548;
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleThumbnailClick = (index) => {
    api?.scrollTo(index);
  };

  const colors = { black: "#000000", navy: "#000080", beige: "#f5f5dc" };
  const [productRating, setProductRating] = useState(4.2);

  const relatedProducts = [
    { id: 1, name: "Urban Trekker Jacket", price: "$399", image: "/images/products/f5.jpg" },
    { id: 2, name: "Mountain Explorer Parka", price: "$459", image: "/images/products/f6.jpg" },
    { id: 3, name: "City Light Windbreaker", price: "$299", image: "/images/products/f7.jpg" },
    { id: 4, name: "Alpine Adventure Shell", price: "$429", image: "/images/products/f8.jpg" },
  ];
  const images = [
    "/images/products/f3.jpg",
    "/images/products/f1.jpg",
    "/images/products/f2.jpg",
    "/images/products/f4.jpg"
  ];
  const features = [
    "Water-resistant poly blend",
    "Adjustable hood",
    "Multiple pockets",
    "Breathable lining"
  ];
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
      <div className={`${isMobile ? "max-w-[70%]" : "w-full"} grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8`}>
        {/* Product Images */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-2">
          {/* Thumbnails */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-2 order-1 md:order-1">
            {images.map((img, index) => (
              <div
                key={index}
                className={`relative aspect-square min-w-[80px] md:min-w-[100px] cursor-pointer border-2 ${current === index ? 'border' : 'border-transparent'
                  }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
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
            className={`w-full h-full relative group order-1 md:order-2`}
            setApi={setApi}
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={img}
                      alt={`Product view ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
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
            <h1 className="text-2xl md:text-3xl font-bold">Bailey Poly Jacket</h1>
            <div className="flex items-center gap-2 mt-1 md:mt-2">
              <Rating
                rating={productRating}
                onRatingChange={setProductRating}
              />

              <Link href="#reviews" className="text-sm text-gray-600">
                (128 reviews)
              </Link>
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold">$370</p>

          <div className="space-y-3 md:space-y-4">
            <div>
              <p className="font-medium mb-1 md:mb-2">Color</p>
              <div className="flex gap-2 flex-wrap">
                {Object.keys(colors).map((color) => (
                  <Button
                    key={color}
                    variant="outline"
                    className="h-10 w-10 md:h-12 md:w-12 rounded-full p-0"
                    style={{ backgroundColor: colors[color] }}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium mb-1 md:mb-2">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className="h-10 md:h-12 hover:bg-gray-100 text-sm md:text-base"
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <Link href="#" className="text-sm text-gray-600 mt-1 md:mt-2 inline-block underline">
                Size Guide
              </Link>
            </div>

            <div className="space-y-2">
              <Button className="w-full bg-orange-900 py-4 md:py-6 text-md md:text-lg">
                Add to Cart
              </Button>
            </div>

            <div className="pt-3 md:pt-4 border-t">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-orange-700 text-xs md:text-sm">✓ Free Shipping</Badge>
                  <Badge className="bg-orange-700 text-xs md:text-sm">⏱️ 2-Day Delivery</Badge>
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
            Reviews (128)
          </TabsTrigger>
          <TabsTrigger value="shipping" className="text-sm md:text-base px-3 md:px-4">
            Shipping & Returns
          </TabsTrigger>
        </TabsList>

        {/* Tabs content remains same with responsive spacing */}
        <TabsContent value="description">
          <p>The Bailey Poly Jacket combines urban style with outdoor functionality. Designed for transitional weather, featuring water-resistant fabric and modern minimalist design.</p>
        </TabsContent>
        <TabsContent value="features">
          <ul>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="reviews">Reviews will be displayed here.</TabsContent>
        <TabsContent value="shipping">Shipping & Return details will be displayed here.</TabsContent>
      </Tabs>

      {/* Related Products Section */}
      <section className="mt-12 md:mt-16">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Related Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-3 md:p-4">
                <div className="relative aspect-square mb-3 md:mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1">{product.name}</h3>
                <p className="text-base md:text-lg font-bold">{product.price}</p>
              </CardContent>
              <CardFooter className="p-3 md:p-4 pt-0">
                <Button className="w-full text-sm md:text-base" variant="outline">
                  Quick Add
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
