'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const GoodLuckOrderPage = () => {
  const cartItems = useSelector(state => state.cart.items)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const handleCheckout = () => {
    // Replace this with actual Chapa integration or redirect
    alert('Proceeding to Chapa checkout...')
  }

  return (
    <div className="p-4 md:p-8 lg:p-16 flex flex-col items-center gap-8">
      <Card className="shadow-lg max-w-lg text-center">
        <CardHeader>
          <CardTitle>🎉 Good Luck with Your Order! 🎉</CardTitle>
          <CardDescription>Your items are on the way!</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">Thank you for shopping with us! Your support means the world. We hope you love your new items!</p>
          <div className="space-y-2">
            <p>Total Items: {totalQuantity}</p>
            <p>Subtotal: ${totalAmount.toFixed(2)}</p>
            <p>Estimated Delivery: 03/31/2024</p>
          </div>
          <Button className="mt-4 w-full" onClick={handleCheckout}>Go to Chapa Checkout</Button>
        </CardContent>
      </Card>
      <div className="mt-4 text-sm text-blue-600 cursor-pointer">
        &lt;{' '}
        <Link className="no-underline" href="/customers/products">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default GoodLuckOrderPage
