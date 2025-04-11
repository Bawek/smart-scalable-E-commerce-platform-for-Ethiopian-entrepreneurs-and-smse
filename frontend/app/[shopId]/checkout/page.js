"use client";
import React, { useState, useEffect } from "react";
import Loading from "@/app/[locale]/loading";
import { useRouter } from "next/navigation";
import MenuBar from "../../components/MenuBar/MenuBar";
import {
  useGetShopQuery,
  useGetShopWithIdQuery,
} from "@/lib/features/shop/shop";
export default function Shop({ params }) {
  const shopId = params.shopId;
  const unique_id = localStorage.getItem("unique_id");
  const [checkOutPage, setCheckOutPage] = useState({});
  const { data, error, isLoading } = useGetShopQuery(shopId);
  const router = useRouter();
  const {
    data: shopsData,
    error: shopsError,
    isLoading: shopsLoading,
  } = useGetShopWithIdQuery(shopId);
  const [customerData, setCustomerData] = useState({});
  const storedData = localStorage.getItem("cart");
  let initialCartItems;
  try {
    initialCartItems = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    initialCartItems = [];
  }
  const [cartItems, setCartItems] = useState(initialCartItems);
  useEffect(() => {
    if (data) {
      console.log("website data ", data);
      const checkoutPageData = data.find((page) => page.name === "Checkout");
      setCheckOutPage(checkoutPageData);
    }
  }, [data]);
  useEffect(() => {
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }
  }, [cartItems]);
  useEffect(() => {
    const handleClick = (event, link) => {
      event.preventDefault();
      if (link === "contact") {
        router.push(`/${shopId}/contact`);
        return;
      } else if (link === "blog") {
        router.push(`/${shopId}/blog`);
        return;
      } else if (link === "about") {
        router.push(`/${shopId}/about`);
      } else if (link === "shopping-cart") {
        router.push(`/${shopId}/shopping-cart`);
      } else if (link === "checkout") {
        router.push(`/${shopId}/checkout`);
      } else if (link == "home") {
        router.push(`/${shopId}`);
      }
    };
    const checkOutLink = document.getElementById("checkout");
    const homeLink = document.getElementById("home");
    const blogLink = document.getElementById("blog");
    const contactLink = document.getElementById("contact");
    const aboutLink = document.getElementById("about");
    const shopCartLink = document.getElementById("shopping-cart");
    const proceedPaymentButton = document.getElementById("Proceed-payment-btn");
    if (proceedPaymentButton) {
      console.log("proceed to payment event listener add");
      proceedPaymentButton.addEventListener("click", handleSubmit);
    }
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      if (cartItems.length !== 0) {
        cartItemNumber.textContent = cartItems.length;
      } else {
        cartItemNumber.textContent = "";
      }
    }
    if (checkOutLink) {
      checkOutLink.addEventListener("click", (event) =>
        handleClick(event, "checkout")
      );
    }
    if (homeLink) {
      homeLink.addEventListener("click", (event) => handleClick(event, "home"));
    }
    if (blogLink) {
      blogLink.addEventListener("click", (event) => handleClick(event, "blog"));
    }
    if (contactLink) {
      contactLink.addEventListener("click", (event) =>
        handleClick(event, "contact")
      );
    }
    if (aboutLink) {
      aboutLink.addEventListener("click", (event) =>
        handleClick(event, "about")
      );
    }
    if (shopCartLink) {
      shopCartLink.addEventListener("click", (event) =>
        handleClick(event, "shopping-cart")
      );
    }
    console.log("cart items in the local storage checkout", cartItems);
    // Cleanup event listener on component unmount
    return () => {
      const blogLink = document.getElementById("blog");
      if (blogLink) {
        blogLink.removeEventListener("click", handleClick);
      }
      const addToCartButtons = document.querySelectorAll(
        ".product-cart button"
      );
      addToCartButtons.forEach((button, index) => {
        button.id = `${index}`;
        console.log("removed event to ", index);
      });
    };
  }, [router, shopId, checkOutPage?.html, cartItems]);
  useEffect(() => {
    const proceedPaymentButton = document.getElementById("Proceed-payment-btn");
    if (proceedPaymentButton) {
      console.log("proceed to payment event listener add in use Effect");
      proceedPaymentButton.addEventListener("click", handleSubmit);
    }

    return () => {
      if (proceedPaymentButton) {
        proceedPaymentButton.removeEventListener("click", handleSubmit);
      }
    };
  }, [customerData]);
  const handleSubmit = async () => {
    console.log("handle submit called");
    let first_name = document.getElementById("first-name-input")?.value;
    let last_name = document.getElementById("last-name-input")?.value;
    let phone_number = document.getElementById("phone-number-input")?.value;
    let address1 = document.getElementById("province-address-input")?.value;
    let address2 = document.getElementById("street-address-input")?.value;
    let city = document.getElementById("city-input")?.value;
    let country = document.getElementById("country-input").value;
    let state = document.getElementById("state-input")?.value;
    let zip_code = document.getElementById("zip-code-input")?.value;
    const checkoutData = {
      first_name,
      last_name,
      phone_number,
      address2,
      address1,
      country,
      city,
      state,
      zip_code,
    };
    setCustomerData(checkoutData);
    console.log("checkout data ", checkoutData);
    console.log("handle form submit called");
    try {
      const response = await fetch(
        `http://localhost:8000/auth/customer/update/${unique_id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...checkoutData }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();
      console.log("Customer created:", result);
      // Handle successful creation, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
    }
    console.log("handle order executed");
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-CfETTzkfDCrst9JDojVyqAW0lgPAepvD"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: "10",
      currency: "ETB",
      email: "abebech_bekele@gmail.com",
      first_name: "Bilen",
      last_name: "Gizachew",
      phone_number: "0912345678",
      tx_ref: "chewatatest-6669",
      callback_url: "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      return_url: "https://www.google.com/",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
      "meta[hide_receipt]": "true",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("fhfghdfgjdf");

    fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += parseFloat(item.price) * parseInt(item.quantity);
    });
    console.log(shopsData);
    const Order = {
      customer: unique_id,
      merchant: shopsData?.owner?.unique_id,
      total_amount: totalPrice,
      order_status: "Pending",
      payment_status: "Paid",
      payment_method: "Credit Card",
      shipping_option: 1,
      order_items: cartItems.map((item) => ({
        product: item.id,
        quantity_ordered: item.quantity,
      })),
    };
    console.log(Order);
    try {
      const response = await fetch(`http://localhost:8000/order/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Order),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      const result = await response.json();
      console.log("Customer created:", result);
      // Handle successful creation, e.g., redirect or show a success message
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message
    }
    router.push("/order-history");
  };
  const handleOrderData = () => {};
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!checkOutPage) {
    return <div>No home page found.</div>;
  }
  return (
    <div className="relative">
      <div className="fixed rounded-full z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: checkOutPage.html }} />
      <style>{checkOutPage.css}</style>
      <script>{checkOutPage.js}</script>
      <button
        onClick={handleSubmit}
        id="Proceed-payment-btn"
        type="button"
        class="px-6 py-3  absolute right-40 bottom-4 text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Proceed To Payment
      </button>
    </div>
  );
}
