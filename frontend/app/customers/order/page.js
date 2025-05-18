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
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-indigo-100 to-blue-50 p-4 md:p-8 lg:p-16">
      <Card className="shadow-2xl border border-indigo-200 rounded-2xl max-w-lg text-center bg-white">
        <CardHeader className="p-6">
          <CardTitle className="text-3xl font-bold text-indigo-600">🎉 Order Successful! 🎉</CardTitle>
          <CardDescription className="text-lg text-gray-600">Your items are on the way!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4 text-xl">Thank you for shopping with us! Your support means the world. We hope you love your new items!</p>
          <div className="space-y-2">
            <p className="text-lg text-gray-600 font-semibold">Total Items: <span className="text-indigo-700">{totalQuantity}</span></p>
            <p className="text-lg text-gray-600 font-semibold">Subtotal: <span className="text-indigo-700">${totalAmount.toFixed(2)}</span></p>
            <p className="text-lg text-gray-600 font-semibold">Estimated Delivery: <span className="text-indigo-700">03/31/2024</span></p>
          </div>
          <Button
            className="mt-6 w-full py-3 text-lg font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={handleCheckout}
          >
            Go to Chapa Checkout
          </Button>
        </CardContent>
      </Card>

      <div className="mt-4 text-lg text-blue-600 hover:text-blue-800 transition duration-200">
        &lt;{' '}
        <Link className="no-underline" href="/customers/products">
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default GoodLuckOrderPage
