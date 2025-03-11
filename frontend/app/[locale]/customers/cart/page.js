'use client'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

// const sampleCartItems = [
//   {
//     id: 1,
//     name: "Wireless Headphones",
//     price: 199.99,
//     quantity: 1,
//     image: "/images/headphones.jpg",
//     sku: "SKU-1234",
//     category: "Electronics",
//     brand: "Sony"
//   },
//   {
//     id: 2,
//     name: "Smartwatch Pro",
//     price: 299.99,
//     quantity: 2,
//     image: "/images/smartwatch.jpg",
//     sku: "SKU-5678",
//     category: "Wearables",
//     brand: "Samsung"
//   },
//   {
//     id: 3,
//     name: "Bluetooth Speaker",
//     price: 129.99,
//     quantity: 1,
//     image: "/images/speaker.jpg",
//     sku: "SKU-9012",
//     category: "Audio",
//     brand: "JBL"
//   },
// ];

const ResponsiveCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [Loading,setLoading] = useState(false);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const fetchCartItems = async () => {
    // Fetch cart items from the server
    const response = await fetch('https://fakestoreapi.com/products');

    const data = await response.json();
    console.log(data, 'sample data')
    setCartItems(data);
    setLoading(true);
  };
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <div className="p-4 md:p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Product Details Section */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <h1>Your Cart page </h1>
            <CardTitle>FedEx Small Delivery</CardTitle>
            <CardDescription>Expected delivery on or before 03/31/2024</CardDescription>
            <div className="flex justify-between p-4 border-b font-semibold text-gray-600">
              <p className="w-3/5 text-xl">Product</p>
              <p className="w-2/4 text-sm">Price</p>
              <p className="w-1/5 text-sm">Quantity</p>
              <p className="w-1/5 text-sm">Total Price</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center max-h-52 gap-4 p-4 border-b">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p>NAME: <span className="text-sm text-gray-400">{item.title}</span></p>
                    <p>Brand: <span className="text-sm text-gray-400">{item.category}</span></p>
                    <p className="text-red-600">Category: <span className="text-sm text-gray-400">{item.category}</span></p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-red-600 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="outline"><Minus size={16} /></Button>
                    <p className='text-center py-2 px-3'>2</p>
                    <Button variant="outline"><Plus size={16} /></Button>
                  </div>
                  <div>${(item.price * 2).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p className="text-center text-xl font-semibold text-gray-600 mt-10">
                No items in your cart
              </p>
            )}
            
            {/* Skeleton Loading */}
            {!Loading && cartItems.length === 0 && (
              <>
                <Skeleton className="h-6 w-3/5 mb-4" />
                <Skeleton className="h-6 w-2/4 mb-4" />
                <Skeleton className="h-6 w-1/5 mb-4" />
                <Skeleton className="h-6 w-1/5 mb-4" />
              </>
            )}
          </CardContent>
        </Card>
    
        <div className="mt-4 text-sm text-blue-600 cursor-pointer">&lt; Continue Shopping</div>
      </div>
    
      {/* Summary Section */}
      <div>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>FedEx Small Delivery:</span>
                <span>$19.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>--</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Estimated Total:</span>
                <span>${(subtotal + 19).toFixed(2)}</span>
              </div>
              <Button className="w-full mt-4">CHECKOUT</Button>
            </div>
          </CardContent>
        </Card>
    
        <Card className="shadow-lg mt-4">
          <CardContent>
            <div className="space-y-2">
              <p>HAVE A PROMO CODE?</p>
              <div className="flex gap-2">
                <Input placeholder="PROMO CODE" className="flex-grow" />
                <Button>Apply</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveCartPage;