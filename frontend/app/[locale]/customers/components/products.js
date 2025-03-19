'use client';
import React from 'react'
import ProductItem from "./product-items";

const Products = ({ products }) => {
    console.log(products, 'products me')
    return (
        <div className="mx-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
                products && products.length > 0 ?
                    products.map((product) => <ProductItem key={product.id} product={product} />)
                    :
                    <p> NO Product Found </p>
            }
        </div>
    )
}

export default Products
