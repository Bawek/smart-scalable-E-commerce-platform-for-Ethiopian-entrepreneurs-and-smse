// pages/cart/index.js
"use client";
import React, { useContext, useState } from "react";
import { ShopContext } from "../../contexts/ShopContext";
import CartItem from "../../components/CartItem";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, products, currency, updateQuantity, clearCart } = useContext(ShopContext);
  const [isUpdating, setIsUpdating] = useState(false);

  // Transform cart items into a manageable format
  const cartData = [];
  for (const productId in cartItems) {
    for (const size in cartItems[productId]) {
      if (cartItems[productId][size] > 0) {
        cartData.push({
          productId,
          size,
          quantity: cartItems[productId][size],
        });
      }
    }
  }

  const handleQuantityChange = (productId, size, newQuantity) => {
    setIsUpdating(true);
    updateQuantity(productId, size, newQuantity);
    setTimeout(() => setIsUpdating(false), 300);
  };

  const calculateTotal = () => {
    return cartData.reduce((total, item) => {
      const product = products.find(p => p._id === item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartData.length > 0 ? (
        <div className="mb-20">
          <div className="space-y-6">
            {cartData.map((item) => {
              const product = products.find(p => p._id === item.productId);
              if (!product) return null;

              return (
                <CartItem
                  key={`${item.productId}-${item.size}`}
                  product={product}
                  size={item.size}
                  quantity={item.quantity}
                  currency={currency}
                  onQuantityChange={handleQuantityChange}
                  disabled={isUpdating}
                />
              );
            })}
          </div>

          <div className="mt-10 border-t pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
                disabled={isUpdating}
              >
                Clear Cart
              </button>
            </div>

            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>{currency} {calculateTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>{currency} {calculateTotal().toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center bg-green-600 text-white py-3 rounded hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl mb-4">Your cart is empty</h2>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;