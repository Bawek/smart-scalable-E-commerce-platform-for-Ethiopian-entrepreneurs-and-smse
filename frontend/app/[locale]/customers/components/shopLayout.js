import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ShopLayout = ({ children }) => {
    return (
        <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Filter Sidebar */}
                <section className="">
                    <div className='w-full md:w-64 space-y-8 sticky top-16'>
                        {/* Categories Filter */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Categories</h3>
                            {['Fashion (1)', 'Feeding (5)', 'Health & Safety (1)', 'Nursery (1)', 'On the go (5)', 'Toys (3)'].map((category) => (
                                <Card key={category} className="hover:bg-gray-50">
                                    <CardContent className="flex items-center justify-between p-2">
                                        <span className="text-sm">{category.replace(')', '')}</span>
                                        <span className="text-gray-500 text-xs">{
                                            category.match(/\((\d+)\)/)?.[1]
                                        }</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Color Filter */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Filter by Color</h3>
                            {['Blue (2)', 'Grey (2)', 'Green (2)', 'Red (1)'].map((color) => (
                                <Card key={color} className="hover:bg-gray-50">
                                    <CardContent className="flex items-center justify-between p-2">
                                        <span className="text-sm">{color.replace(')', '')}</span>
                                        <span className="text-gray-500 text-xs">{
                                            color.match(/\((\d+)\)/)?.[1]
                                        }</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Size Filter */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Filter by Size</h3>
                            {['Large (1)', 'Medium (1)', 'Small (1)'].map((size) => (
                                <Card key={size} className="hover:bg-gray-50">
                                    <CardContent className="flex items-center justify-between p-2">
                                        <span className="text-sm">{size.replace(')', '')}</span>
                                        <span className="text-gray-500 text-xs">{
                                            size.match(/\((\d+)\)/)?.[1]
                                        }</span>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Price Filter */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg">Filter by Price</h3>
                            <Card className="p-2">
                                <CardContent>
                                    <p className="text-sm">Price: EGP15 — EGP25</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <section className="flex-1">
                    {/* Top Control Bar */}
                    <div className="flex flex-col sm:flex-row sticky top-16 z-50 bg-white p-3 justify-between items-start sm:items-center mb-8 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-full flex items-center gap-2">
                                <Select className="w-12">  {/* Reduced the width to 12 for a smaller size */}
                                    <SelectTrigger className="bg-gray-100 text-sm">
                                        <SelectValue placeholder="All" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Input
                                    placeholder="Search here!"
                                    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <Select>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue placeholder="Sort by popularity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popularity">Sort by popularity</SelectItem>
                                    <SelectItem value="low">Sort by price: low to high</SelectItem>
                                    <SelectItem value="high">Sort by price: high to low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <section className='overflow-y-auto'>
                        {children}
                    </section>
                </section>
            </div>
        </main>
    );
};

export default ShopLayout;
