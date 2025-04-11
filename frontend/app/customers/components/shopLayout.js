'use client'
import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ShopLayout = ({ children }) => {
    const [search, setSearch] = useState(
        {
            name: '',
            location: '',
            price: '',
            shopName: ''
        }
    )
    return (
        <main className="w-full px-4 sm:px-6 lg:px-8">
            {/* Main Content Area */}
            <section className="flex-1">

                {/* Top Control Bar */}
                <div className="flex items-center justify-between sticky top-16 z-50 bg-white shadow-md p-3 mb-8">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Show Filters
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle> Filter Your Product</DialogTitle>
                            </DialogHeader>
                            <section className="w-full md:w-64 space-y-8">

                                {/* Product Name Filter */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg">Product Name</h3>
                                    <Input placeholder="Search products..." className="w-full" />
                                </div>

                                {/* Shop Location Filter */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg">Shop Location</h3>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {['Addis Ababa', 'Bahir Dar', 'Dire Dawa', 'Hawassa', 'Mekelle'].map((location) => (
                                                    <SelectItem key={location} value={location}>{location}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Shop Name Filter */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg">Shop Name</h3>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select shop" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {['Best Shop', 'Top Merchants', 'Quality Stores', 'Local Market'].map((shop) => (
                                                    <SelectItem key={shop} value={shop}>{shop}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Price Range Filter */}
                                <div className="space-y-3">
                                    <h3 className="font-bold text-lg">Price Range</h3>
                                    <div className="px-4">
                                        <Slider defaultValue={[15, 25]} min={0} max={100} step={5} className="w-full" />
                                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                                            <span>$15</span>
                                            <span>$25</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </DialogContent>
                    </Dialog>
                    <Select>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Sort by popularity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popularity">Sort by popularity</SelectItem>
                            <SelectItem value="low">Sort by price: low to high</SelectItem>
                            <SelectItem value="high">Sort by price: high to low</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Products Grid */}
                <section className='overflow-y-auto'>
                    {children}
                </section>
            </section>
        </main>
    );
};

export default ShopLayout;
