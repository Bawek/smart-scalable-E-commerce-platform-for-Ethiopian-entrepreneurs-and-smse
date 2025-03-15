'use client'
import React from 'react'
import ShopLayout from '../components/shopLayout'
import { useState } from 'react'
import { useEffect } from 'react'
import Products from '../components/products'

const MainMarketPage = () => {
      const [products, setProducts] = useState([]);
      const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      }
    
      useEffect(() => {
        fetchProducts();
      }, []);
  return (
<ShopLayout>
    <Products products={ products} />
</ShopLayout>
  )
}

export default MainMarketPage
