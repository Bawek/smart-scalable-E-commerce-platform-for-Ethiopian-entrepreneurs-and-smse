"use client";
import React, { useState, useEffect } from "react";
import { useGetshopQuery } from "@/lib/features/shop/publicShopSlice";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";

export default function BlogPage({ params }) {
  const shopId = params.shopId;
  const [blogpage, setBlogpage] = useState({});
  const { data, error, isLoading } = useGetShopQuery(shopId);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const homePageData = data.find((page) => page.name === "product-list");
      setBlogpage(homePageData);
    }
  }, [data]);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: blogpage.html }} />
      <style>{blogpage.css}</style>
      <script>{blogpage.js}</script>
    </div>
  );
}
