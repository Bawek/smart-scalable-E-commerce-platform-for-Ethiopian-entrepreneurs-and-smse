'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const ShopPage = () => {
  const [products, setProducts] = useState( [
    { name: "Nike Air Force LUS", description: "University RedConnecty RedTruck", price: 110.00 },
    { name: "Nike LeBron T7 Low", description: "University RedAtlantic Coat", price: 140.00 },
    { name: "Nike LeBron T7", description: "University RedWhiteBliss", price: 200.00 },
    { name: "Nike Blazer Mid-Suche", description: "RedWhite", price: 100.00 },
  ]);
  const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen"];
  const brands = [
    { name: "adidas Originals", count: 1 },
    { name: "Cement", count: 2 },
    { name: "Jordan", count: 4 },
    { name: "Nike", count: 8 },
    { name: "POW", count: 7 },
    { name: "PGAK", count: 5 },
    { name: "ResNet", count: 2 },
    { name: "Under Armour", count: 1 },
  ];
  const fetchProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-full grid grid-cols-2 gap-2 ">
      {/* Filters Sidebar */}
      <div className="w-full md:w-64 space-y-6">
        <Card>
          <CardHeader className="text-lg font-bold">Refine Results</CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="pickup-store" />
                <Label htmlFor="pickup-store">Pick Up In Store</Label>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">GENDER</h3>
                <Input placeholder="Product Type" />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">BRAND</h3>
                {brands.map((brand) => (
                  <div key={brand.name} className="flex items-center space-x-2">
                    <Checkbox id={brand.name} />
                    <Label htmlFor={brand.name} className="text-sm">
                      {brand.name} ({brand.count})
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="">STOREFY</h3>
            {/* Add store location components here */}
          </CardContent>
        </Card>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          products && products.length > 0 ? (
            products.map(product => (
              <Link className="no-underline" key={product.id} href={`/products/${product.id}`}>
                <Card key={product.id} className="group relative overflow-hidden transition-shadow hover:shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 h-[500px] flex flex-col justify-between">
                  <div className="relative">
                    <img
                      src={product.image}
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
            ))
          )
            :
            (
              <p> NO Product Found </p>
            )
        }
      </div>
    </div>
  );
};

export default ShopPage;
