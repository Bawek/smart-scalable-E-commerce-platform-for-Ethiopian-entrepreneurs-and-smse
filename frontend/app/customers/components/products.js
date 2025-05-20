'use client';
import React from 'react'
import ProductItem from "./product-items";

const Products = ({ products }) => {

    
    console.log(products, 'products me')
    return (
        <div className="mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-y-auto min-h-0">
            {products && products.length > 0 ? (
                products.map((product) => <ProductItem key={product.id} product={product} />)
            ) : (
                <div className="min-w-full container mx-auto text-center">

                    <h3 className="text-2xl font-semibold text-orange-800 mb-2">
                        Oops! No Products Found
                    </h3>
                    <p className="text-orange-500 max-w-md mb-6">
                        We couldn't find any items matching your search. Try adjusting your filters or
                        search terms to discover amazing products.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Products
