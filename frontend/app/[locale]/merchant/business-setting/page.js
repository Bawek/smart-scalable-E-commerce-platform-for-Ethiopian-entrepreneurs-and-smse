'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
const MerchantFullRegistration = () => {
    const features = ['Registration', 'shop creation']
    return (
        <div>
            <Tabs defaultValue="description" className="mt-8 md:mt-12">
                <TabsList className="flex overflow-x-auto">
                    <TabsTrigger value="description" className="text-sm md:text-base px-3 md:px-4">
                        Business Registration
                    </TabsTrigger>
                    <TabsTrigger value="features" className="text-sm md:text-base px-3 md:px-4">
                        shop creation
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
            </Tabs>    </div>
    )
}

export default MerchantFullRegistration
