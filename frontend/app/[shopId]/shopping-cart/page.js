"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/[locale]/loading";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
import MenuBar from "../../components/MenuBar/MenuBar";

export default function cartPage({ params }) {
  const shopId = params.shopId;
  const [shopCartPage, setShopCartPage] = useState({});
  const { data, error, isLoading } = useGetshopQuery(shopId);
  const router = useRouter();
  const storedData = localStorage.getItem("cart");

  const uniqueId = localStorage.getItem("unique_id");

  let initialCartItems;
  try {
    initialCartItems = storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    initialCartItems = [];
  }

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [totalOrderPrice, setTotalOrderPice] = useState(0);

  console.log(cartItems, "cartitems cart item");
  useEffect(() => {
    if (data) {
      const shopCartPageData = data.find(
        (page) => page.name === "shopping-cart"
      );
      setShopCartPage(shopCartPageData);
    }
  }, []);

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

    if (checkOutLink) {
      if (uniqueId) {
        console.log("to checkout event");
        checkOutLink.addEventListener("click", (event) =>
          handleClick(event, "checkout")
        );
      } else {
        console.log("to register event");

        checkOutLink.addEventListener("click", (event) =>
          router.push(`/auth/customer-register`)
        );
      }
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
  }, [router, shopId, shopCartPage?.html, cartItems]);

  useEffect(() => {
    console.log(
      "inside use effect,  this is size of the cart",
      cartItems.length
    );
    const totalOrderPriceContainer =
      document.getElementById("total-order-price");
    const cartItemsContainer = document.getElementById("cart-items-container");

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = `<div class="title">Shopping Cart</div>`;
    }

    if (cartItems.length === 0) {
      console.log("no item in the cart executed");
      const cartItem = document.getElementById("empty-cart");
      if (cartItem) {
        cartItem.innerHTML += `<p>Your cart is empty.</p>`;
      }

      // totalOrderPriceContainer.innerText = "";
    }
    let totalPrice = 0;
    if (cartItems) {
      cartItems.forEach((item, index) => {
        console.log(`for each ${item}, ${index}`);
        const cartItem = document.createElement("div");
        cartItem.classList.add("item");
        cartItem.setAttribute("data-id", item.id);
        cartItem.innerHTML = `
        <div class="buttons">
          <span class="delete-item-btn" data-id="${item.id}"><button>Remove</button></span>
        </div>
        <div class="image" >
          <img src="http://localhost:8000/${item.image}" alt="${item.name}" />
        </div>
        <div class="description">
          <span class="name">${item.name}</span>
        </div>
        <div class="quantity">
          <button class="plus-btn" type="button" name="button">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
            </svg>
          </button>
          <input class="quantity_amount" type="text" name="name" value="${item.quantity}" />
          <button class="minus-btn" type="button" name="button">
           <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7"/>
          </svg>
          </button>
        </div>
        <div class="total-price">${item.price}</div>
      `;
        if (cartItemsContainer) {
          cartItemsContainer.appendChild(cartItem);
        }
        const itemTotalPrice = parseInt(item.quantity) * parseFloat(item.price);
        totalPrice += itemTotalPrice;
      });

      if (totalOrderPriceContainer) {
        if (cartItems.length === 0) {
          totalOrderPriceContainer.innerHTML = `<p class="capitalize text-xl text-green-600 font-bold">No item in the cart`;
        } else {
          totalOrderPriceContainer.innerHTML =
            cartItems
              .map(
                (item) =>
                  `<div class="display-container">
         <span>${item.name}</span>
         <span class="calculated-value"><span> <span class="product-name">${
           item.quantity
         } Items</span><span class="product-name"> price ${
                    item.price
                  }</span> <span class="product-name">Total ${
                    parseInt(item.quantity) * parseFloat(item.price)
                  }</span>  </span>
       </div>`
              )
              .join("") +
            `<div class="total-calculated calculated-value">Total Order Price  ${totalPrice}</div>`;
        }
      }
    }
    const deleteButtons = document.querySelectorAll(".item .delete-item-btn");
    deleteButtons.forEach((button, index) => {
      console.log(`${index} delete button render`);
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget.getAttribute("data-id");
        console.log(`${itemId} delete button event attached`);

        deleteCartItem(itemId);
      });
    });

    document.querySelectorAll(".plus-btn").forEach((button, index) => {
      console.log(`${index} plus button rendered`);

      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget
          .closest(".item")
          .getAttribute("data-id");
        updateCartItemQuantity(itemId, 1);
      });
    });
    const cartItemNumber = document.getElementById("cart-item-number");
    if (cartItemNumber) {
      cartItemNumber.textContent = cartItems.length;
    }

    document.querySelectorAll(".minus-btn").forEach((button, index) => {
      console.log(`${index} minus button rendered`);
      button.addEventListener("click", (event) => {
        const itemId = event.currentTarget
          .closest(".item")
          .getAttribute("data-id");
        updateCartItemQuantity(itemId, -1);
      });
    });
  }, [cartItems, shopCartPage.html]);

  const deleteCartItem = (itemId) => {
    let cartFiltered = cartItems.filter((item) => item.id !== itemId);

    localStorage.setItem("cart", JSON.stringify(cartFiltered));
    setCartItems(cartFiltered);
  };

  const updateCartItemQuantity = (itemId, change) => {
    const cartItemUpdateQuantity = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = parseInt(item.quantity) + parseInt(change);
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
        };
      }
      return item;
    });
    setCartItems(cartItemUpdateQuantity);
  };

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!shopCartPage) {
    return <div>No home page found.</div>;
  }

  return (
    <div className="relative">
      <div className="fixed rounded-full  z-[9999] bg-blueGray-800 top-12 left-0">
        <MenuBar />
      </div>
      <div dangerouslySetInnerHTML={{ __html: shopCartPage.html }} />
      <style>{shopCartPage.css}</style>
      <script>{shopCartPage.js}</script>
    </div>
  );
}
