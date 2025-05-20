'use client'
import React, { useState, useCallback, useEffect } from 'react'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Logs } from 'lucide-react'
import { useParams } from 'next/navigation'

const ShopLayout = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [selectedTown, setSelectedTown] = useState('');
    const [sortOption, setSortOption] = useState('popularity');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);
    const category = useParams();
    const [selectedCategory, setSelectedCategory] = useState(category.category);

    const [tempFilters, setTempFilters] = useState({
        categories: [],
        colors: [],
        sizes: [],
        priceRange: [0, 1000]
    });
    // fetching Products
    const fetchProducts = async () => {
        try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            console.log(data.products, 'Products fetched successfully');  // Check what is being fetched
            setProducts(data.products);  // Update state with the 'products' array
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    // Dynamic filter options
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    // town sample
    const sampleProducts = [
        { id: 1, name: "Product 1", price: 29.99, town: "Addis Ababa", category: "Cloths", color: "blue", size: "medium" },
        { id: 2, name: "Product 2", price: 49.99, town: "Dire Dawa", category: "Electronics", color: "gray", size: "large" },
        { id: 3, name: "Product 3", price: 19.99, town: "Bahir Dar", category: "Health & Safety", color: "green", size: "small" },
        { id: 4, name: "Product 4", price: 79.99, town: "Addis Ababa", category: "Cloths", color: "red", size: "medium" },
        { id: 5, name: "Product 5", price: 39.99, town: "Gondar", category: "Electronics", color: "blue", size: "large" },
        { id: 6, name: "Product 6", price: 59.99, town: "Hawassa", category: "Mechanics", color: "gray", size: "small" },
        { id: 7, name: "Product 7", price: 89.99, town: "Mekelle", category: "Health & Safety", color: "green", size: "medium" },
        { id: 8, name: "Product 8", price: 24.99, town: "Addis Ababa", category: "Cloths", color: "red", size: "large" },
        { id: 9, name: "Product 9", price: 69.99, town: "Bahir Dar", category: "Electronics", color: "blue", size: "small" },
        { id: 10, name: "Product 10", price: 44.99, town: "Adama", category: "Mechanics", color: "gray", size: "medium" },
    ];

    useEffect(() => {
        // For demo purposes, use sample data
        // setProducts(sampleProducts);
        fetchProducts()
        // Calculate initial price range
        const prices = sampleProducts.map(p => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));

        setMinPrice(min);
        setMaxPrice(max);
        setTempFilters(prev => ({ ...prev, priceRange: [min, max] }));
        if (selectedCategory) {
            setTempFilters(prev => ({ ...prev, categories: [selectedCategory] }));
        }
    }, [selectedCategory]);

    useEffect(() => {
        // Update filter options based on products
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

    const filteredProducts = products.filter(product => {
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
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === 'price_asc') return a.price - b.price;
        if (sortOption === 'price_desc') return b.price - a.price;
        return a.id - b.id; // Default sorting by ID
    });

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