"use client";

import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  addItemToCart,
  removeItemFromCart,
} from "@/lib/features/cart/cartSlice"; // adjust path if needed

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Minus, Plus } from "lucide-react";

import Link from "next/link";

const ResponsiveCartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [loading, setLoading] = useState(true); // Fetch products once and add to cart with quantity 1 initially (if empty)

  const fetchCartItems = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");

      const data = await response.json();

      data.forEach((item) => {
        dispatch(addItemToCart(item)); // Adds each product with quantity=1
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);

      setLoading(false);
    }
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      fetchCartItems();
    } else {
      setLoading(false);
    }
  }, []);

  const handleDecreaseQuantity = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const handleIncreaseQuantity = (id) => {
    // Find the product in cart to dispatch addItemToCart with full data

    const item = cartItems.find((i) => i.id === id);

    if (item) {
      dispatch(addItemToCart(item));
    }
  };

  const subtotal = totalAmount; // already calculated in Redux slice

  return (
    <div className="p-4 md:p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Details Section */}     {" "}
      <div className="lg:col-span-2">
               {" "}
        <Card className="shadow-lg">
                   {" "}
          <CardHeader>
                        <h1>Your Cart Page</h1>           {" "}
            <CardTitle>FedEx Small Delivery</CardTitle>           {" "}
            <CardDescription>
              Expected delivery on or before 03/31/2024
            </CardDescription>
                       {" "}
            <div className="flex justify-between p-4 border-b font-semibold text-gray-600">
                            <p className="w-3/5 text-xl">Product</p>           
                <p className="w-2/4 text-sm">Price</p>             {" "}
              <p className="w-1/5 text-sm">Quantity</p>             {" "}
              <p className="w-1/5 text-sm">Total Price</p>           {" "}
            </div>
                     {" "}
          </CardHeader>
                   {" "}
          <CardContent className="space-y-4">
                       {" "}
            {loading ? (
              <p>Loading cart items...</p>
            ) : cartItems.length === 0 ? (
              <p className="text-center text-xl font-semibold text-gray-600 mt-10">
                                No items in your cart              {" "}
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center max-h-52 gap-4 p-4 border-b"
                >
                                   {" "}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded"
                  />
                                   {" "}
                  <div className="flex-grow">
                                       {" "}
                    <h3 className="font-semibold text-lg">{item.title}</h3>     
                                 {" "}
                    <p>
                      Category:{" "}
                      <span className="text-sm text-gray-400">
                        {item.category}
                      </span>
                    </p>
                                     {" "}
                  </div>
                                   {" "}
                  <div className="flex items-center gap-4">
                                       {" "}
                    <p className="text-red-600 font-bold">
                      ${item.price.toFixed(2)}
                    </p>
                                     {" "}
                  </div>
                                   {" "}
                  <div className="flex items-center justify-center gap-2">
                                       {" "}
                    <Button
                      variant="outline"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                                            <Minus size={16} />                 
                       {" "}
                    </Button>
                                       {" "}
                    <p className="text-center py-2 px-3">{item.quantity}</p>   
                                   {" "}
                    <Button
                      variant="outline"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                                            <Plus size={16} />                 
                       {" "}
                    </Button>
                                     {" "}
                  </div>
                                    <div>${item.totalPrice.toFixed(2)}</div>   
                             {" "}
                </div>
              ))
            )}
                     {" "}
          </CardContent>
                 {" "}
        </Card>
               {" "}
        <div className="mt-4 text-sm text-blue-600 cursor-pointer">
                    &lt;          {" "}
          <Link className="no-underline" href="/customers/products">
                        Continue Shopping          {" "}
          </Link>
                 {" "}
        </div>
             {" "}
      </div>
            {/* Summary Section */}     {" "}
      <div>
               {" "}
        <Card className="shadow-lg">
                   {" "}
          <CardHeader>
                        <CardTitle>Summary</CardTitle>         {" "}
          </CardHeader>
                   {" "}
          <CardContent>
                       {" "}
            <div className="space-y-4">
                           {" "}
              <div className="flex justify-between">
                                <span>Total Items:</span>               {" "}
                <span>{totalQuantity}</span>             {" "}
              </div>
                           {" "}
              <div className="flex justify-between">
                                <span>Subtotal:</span>               {" "}
                <span>${subtotal.toFixed(2)}</span>             {" "}
              </div>
                           {" "}
              <div className="flex justify-between">
                                <span>FedEx Small Delivery:</span>             
                  <span>$19.00</span>             {" "}
              </div>
                           {" "}
              <div className="flex justify-between">
                                <span>Tax:</span>                <span>--</span>
                             {" "}
              </div>
                           {" "}
              <div className="flex justify-between font-bold">
                                <span>Estimated Total:</span>               {" "}
                <span>${(subtotal + 19).toFixed(2)}</span>             {" "}
              </div>
                           {" "}
              <Link href="/customers/placeorder">
                               {" "}
                <Button className="w-full mt-4">
                                    CHECKOUT                {" "}
                </Button>
                             {" "}
              </Link>
                         {" "}
            </div>
                     {" "}
          </CardContent>
                 {" "}
        </Card>
               {" "}
        <Card className="shadow-lg mt-4">
                   {" "}
          <CardContent>
                       {" "}
            <div className="space-y-2">
                           {" "}
              {/* <p>HAVE A PROMO CODE?</p>

              <div className="flex gap-2">

                <Input placeholder="PROMO CODE" className="flex-grow" />

                <Button>Apply</Button>



              </div> */}
                         {" "}
            </div>
                     {" "}
          </CardContent>
                 {" "}
        </Card>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default ResponsiveCartPage;
