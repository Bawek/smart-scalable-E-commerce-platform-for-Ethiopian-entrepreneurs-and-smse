"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "@/lib/features/cart/cartSlice";
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
import axios from "axios"; // Import Axios

const ResponsiveCartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const [isLogin, setIsLogin] = useState(true)
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [loading, setLoading] = useState(true);
  const account = useSelector((state) => state.account);
  const userId = account.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter()
  const userId = account.id; //  Replace with actual user ID,  Important
  console.log(account, 'acccoutn')
  const fetchCart = async () => {
    try {
      console.log("message before error")
      const response = await axios.get(`http://localhost:8000/api/cart/${userId}`);
      const cartData = response.data;
      console.log("Fetched cart data:   balemlay", response);
      dispatch(clearCart());

      cartData.items.forEach((item) => {
        dispatch(
          addItemToCart({
            id: item.productId,
            title: item.product.title,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })
        );
      });

      setLoading(false);
    } catch (err) {
      console.error("Fetch Cart Error", err);
      setError("Failed to fetch cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCart();
    } else {
      setIsLogin(false)
    }
  }, []);

  const handleDecreaseQuantity = async (productId) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (!existingItem) return;

    try {
      await axios.delete("http://localhost:8000/api/cart/remove", {
        data: { userId, productId },
      });
      dispatch(removeItemFromCart(productId));
    } catch (err) {
      console.error("Error decreasing/removing item:", err);
      setError("Failed to update cart");
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;

    try {
      const response = await axios.post("http://localhost:8000/api/cart/add", {
        userId,
        productId: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1,
      });

      const updatedCart = response.data;

      dispatch(clearCart());
      updatedCart.items.forEach((item) => {
        dispatch(
          addItemToCart({
            id: item.productId,
            title: item.product.title,
            price: item.product.price,
            image: item.product.image,
            quantity: item.quantity,
            totalPrice: item.totalPrice,
          })
        );
      });
    } catch (err) {
      console.error("Error increasing quantity:", err);
      setError("Failed to increase quantity");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete("http://localhost:8000/api/cart/remove", {
        data: { userId, productId },
      });
      dispatch(removeItemFromCart(productId));
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError("Failed to remove from cart");
    }
  };

  const subtotal = totalAmount;
  const shippingFee = 19;

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error loading cart: {error}</p>;

  return (
    <div className="p-4 md:p-8 lg:p-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Product Details Section */}
      <div className="lg:col-span-2">
        <Card className="shadow-lg">
          <CardHeader>
            <h1>Your Cart Page</h1>
            <CardTitle>FedEx Small Delivery</CardTitle>
            <CardDescription>
              Expected delivery on or before 03/31/2024
            </CardDescription>
            <div className="flex justify-between p-4 border-b font-semibold text-gray-600">
              <p className="w-3/5 text-xl">Product</p>
              <p className="w-2/4 text-sm">Price</p>
              <p className="w-1/5 text-sm">Quantity</p>
              <p className="w-1/5 text-sm">Total Price</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-xl font-semibold text-gray-600 mt-10">
                No items in your cart
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center max-h-52 gap-4 p-4 border-b"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p>
                      Category:{" "}
                      <span className="text-sm text-gray-400">N/A</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-red-600 font-bold">
                      ${item.price?.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <Minus size={16} />
                    </Button>
                    <p className="text-center py-2 px-3">{item.quantity}</p>
                    <Button
                      variant="outline"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <Plus size={16} />
                    </Button>
                  </div>
                  <div>${item.totalPrice?.toFixed(2)}</div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="mt-4 text-sm text-blue-600 cursor-pointer">
          &lt;{" "}
          <Link className="no-underline" href="/customers/products">
            Continue Shopping
          </Link>
        </div>
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
                <span>Total Items:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal?.toFixed(2)}</span>
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
                <span>${(subtotal + 19)?.toFixed(2)}</span>
              </div>
              <Link href="/customers/placeorder">
                <Button className="w-full mt-4">CHECKOUT</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-4">
          <CardContent>
            <div className="space-y-2">
              {/* <p>HAVE A PROMO CODE?</p>
              <div className="flex gap-2">
                <Input placeholder="PROMO CODE" className="flex-grow" />
                <Button>Apply</Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResponsiveCartPage;
