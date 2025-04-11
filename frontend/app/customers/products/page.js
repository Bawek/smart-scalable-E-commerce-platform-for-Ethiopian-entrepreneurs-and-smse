'use client'
import React from 'react'
import ShopLayout from '../components/shopLayout'
import { useState } from 'react'
import { useEffect } from 'react'
import Products from '../components/products'

const MainMarketPage = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ShopLayout>
      <Products products={products} />
    </ShopLayout>
  )
}

export default MainMarketPage
