'use client'
import React from 'react'
import ShopLayout from '../components/shopLayout'
import Products from '../components/products'

const MainMarketPage = ({ products }) => {
  console.log(products, 'my products')

  console.log(products, 'products are here listed')
  return (
    <ShopLayout>
      <Products products={products} />
    </ShopLayout>
  )
}

export default MainMarketPage
