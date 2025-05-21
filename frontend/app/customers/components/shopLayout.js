'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Logs } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useGetProductsForSaleQuery } from '@/lib/features/products/products'

const ShopLayout = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [selectedTown, setSelectedTown] = useState('');
    const [sortOption, setSortOption] = useState('popularity');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const { data, isLoading, isError, error } = useGetProductsForSaleQuery()
    const category = useParams();
    const [selectedCategory, setSelectedCategory] = useState(category.category);
    console.log(data, error, isError, 'manner of geting the data of mathe')
    const [tempFilters, setTempFilters] = useState({
        categories: [],
        colors: [],
        sizes: [],
        priceRange: [0, 1000]
    });
    // Dynamic filter options
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    useEffect(() => {
        setProducts(data?.products)
        if (products.length === 0) return;
        // Calculate initial price range 
        const prices = products.map(p => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));

        setMinPrice(min);
        setMaxPrice(max);
        setTempFilters(prev => ({ ...prev, priceRange: [min, max] }));
        if (selectedCategory) {
            setTempFilters(prev => ({ ...prev, categories: [selectedCategory] }));
        }
    }, [selectedCategory, products]);
    console.log(products, 'products are here listed')

    useEffect(() => {
        if (products.length > 0) {
            const categoryCounts = products.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {});
            setCategories(Object.entries(categoryCounts).map(([value, count]) => ({
                label: value,
                value,
                count
            })));

            const colorCounts = products.reduce((acc, product) => {
                acc[product.color] = (acc[product.color] || 0) + 1;
                return acc;
            }, {});
            setColors(Object.entries(colorCounts).map(([value, count]) => ({
                label: value.charAt(0).toUpperCase() + value.slice(1),
                value,
                count
            })));

            const sizeCounts = products.reduce((acc, product) => {
                acc[product.size] = (acc[product.size] || 0) + 1;
                return acc;
            }, {});
            setSizes(Object.entries(sizeCounts).map(([value, count]) => ({
                label: value.charAt(0).toUpperCase() + value.slice(1),
                value,
                count
            })));
        }
    }, [products]);

    const filteredProducts = products && products?.filter(product => {
        // Town filter
        if (selectedTown && product.town !== selectedTown) return false;

        // Category filter
        if (tempFilters.categories.length > 0 &&
            !tempFilters.categories.includes(product.category)) return false;

        // Color filter
        if (tempFilters.colors.length > 0 &&
            !tempFilters.colors.includes(product.color)) return false;

        // Size filter
        if (tempFilters.sizes.length > 0 &&
            !tempFilters.sizes.includes(product.size)) return false;

        // Price filter
        if (product.price < tempFilters.priceRange[0] ||
            product.price > tempFilters.priceRange[1]) return false;

        return true;
    });

    // Sorting logic
    const sortedProducts = products.length > 0 && [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price_asc') return a.price - b.price;
        if (sortOption === 'price_desc') return b.price - a.price;
        return a.id - b.id; // Default sorting by ID
    });
    if (isLoading) {
        return (
            <div>
                loading...
            </div>
        )
    }
    if (isError) {
        return (
            <div>
                Some thing go wrong
            </div>
        )
    }
    return (
        <main className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="hidden md:block md:w-52 space-y-8 h-full">
                    <h2 className="text-xl font-bold">Filters</h2>

                    {/* Town Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Filter by Town</h3>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            onChange={(e) => setSelectedTown(e.target.value)}
                            value={selectedTown}
                        >
                            <option value="">All Towns</option>
                            {[...new Set(products.map(p => p.town))].map(town => (
                                <option key={town} value={town}>{town}</option>
                            ))}
                        </select>
                    </div>

                    {/* Categories Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Categories</h3>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div key={category.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${category.value}`}
                                        checked={tempFilters.categories.includes(category.value)}
                                        onCheckedChange={(checked) => {
                                            setTempFilters(prev => ({
                                                ...prev,
                                                categories: checked
                                                    ? [...prev.categories, category.value]
                                                    : prev.categories.filter(v => v !== category.value)
                                            }))
                                        }}
                                    />
                                    <Label htmlFor={`cat-${category.value}`} className="text-sm">
                                        {category.label} ({category.count})
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Color Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Colors</h3>
                        <div className="space-y-2">
                            {colors.map((color) => (
                                <div key={color.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`color-${color.value}`}
                                        checked={tempFilters.colors.includes(color.value)}
                                        onCheckedChange={(checked) => {
                                            setTempFilters(prev => ({
                                                ...prev,
                                                colors: checked
                                                    ? [...prev.colors, color.value]
                                                    : prev.colors.filter(v => v !== color.value)
                                            }))
                                        }}
                                    />
                                    <Label htmlFor={`color-${color.value}`} className="text-sm">
                                        {color.label} ({color.count})
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Sizes</h3>
                        <div className="space-y-2">
                            {sizes.map((size) => (
                                <div key={size.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`size-${size.value}`}
                                        checked={tempFilters.sizes.includes(size.value)}
                                        onCheckedChange={(checked) => {
                                            setTempFilters(prev => ({
                                                ...prev,
                                                sizes: checked
                                                    ? [...prev.sizes, size.value]
                                                    : prev.sizes.filter(v => v !== size.value)
                                            }))
                                        }}
                                    />
                                    <Label htmlFor={`size-${size.value}`} className="text-sm">
                                        {size.label} ({size.count})
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className="space-y-3">
                        <h3 className="font-semibold">Price Range</h3>
                        <div className="space-y-4 px-2">
                            <Slider
                                value={tempFilters.priceRange}
                                onValueChange={(value) => setTempFilters(prev => ({
                                    ...prev,
                                    priceRange: value
                                }))}
                                min={minPrice}
                                max={maxPrice}
                                step={1}
                            />
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>ETB{tempFilters.priceRange[0]}</span>
                                <span>ETB{tempFilters.priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-6 border rounded-md">
                        <div className="flex items-center gap-3">
                            <Logs className='pl-1' />
                            <p className="text-gray-400 text-sm">
                                Showing {sortedProducts.length} results
                            </p>
                        </div>
                        <select
                            className="flex h-10 w-[180px] items-center justify-between border-none rounded-md bg-background px-3 py-2 text-sm"
                            onChange={(e) => setSortOption(e.target.value)}
                            value={sortOption}
                        >
                            <option value="popularity">Sort by popularity</option>
                            <option value="price_asc">Price: Low to High</option>
                            <option value="price_desc">Price: High to Low</option>
                        </select>
                    </div>

                    <section>
                        {
                            React.Children.map(children, child => {
                                if (React.isValidElement(child)) {
                                    return React.cloneElement(child, {
                                        products: sortedProducts
                                    })
                                }
                                return child
                            })
                        }
                    </section>
                </div>
            </div>
        </main>
    )
}

export default ShopLayout;