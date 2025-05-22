"use client";
import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetAllTemplatesQuery } from "@/lib/features/templates/templateApi";
import { Card } from "@/components/ui/card";
import { imageViewer } from "../../system-admin/lib/imageViewer";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProcessPayment } from "@/service/payment.service";
import { useToast } from "@/hooks/use-toast";
import { setSelectedTemplate } from "@/lib/features/templates/templateSlice";
const SelectTheme = () => {
  const { data, error, isLoading } = useGetAllTemplatesQuery();
  const account = useSelector((state) => state.account)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  useCheckUnauthorized(error);
  const { toast } = useToast()
  const { processPayment, isLoading: paymentLoading } = useProcessPayment();

  const handlePayment = async (theme) => {
    console.log(account, 'accoutn')
    if (!account?.email || !account?.firestName) {
      toast({
        title: "Missing Information",
        description: "Please ensure your profile information is complete before proceeding with payment.",
        variant: "destructive",
      });
      return;
    }
    localStorage.setItem("ccc_tem", theme?.id);
    const data = {
      amount: theme.basePrice,
      email: account.email,
      first_name: account.firestName,
      last_name: 'matebie',
      phone_number: "+251943597310",
    };
    const paymentData = {
      amount: 50,
      email: account.email,
      first_name: account.firestName,
      last_name: 'matebie',
      phone_number: "+251943597310",
      orderId: orderResponse?.data?.order?.id,
      FRONTEND_BASE_URL: `${window.location.origin}/customers/order-confirmation`,
      callback_url: "http://localhost:8000/api/orders/payment/callback",
    };
    try {
      const res = await processPayment(data);
    } catch (err) {
      console.error("Payment Error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "Something went wrong while processing your payment.",
        variant: "destructive",
      });
    }
  };

  const themes = data?.templates || [];
  const filteredThemes = useMemo(() => {
    return themes.filter(theme => {
      const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        theme.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" ||
        (selectedCategory === "free" ? !theme.premium : theme.premium);
      return matchesSearch && matchesCategory;
    });
  }, [themes, searchQuery, selectedCategory]);

  const debouncedSearch = useCallback(
    debounce((value) => setSearchQuery(value), 300),
    []
  );
  const categories = ["all", "free", "premium", "new", "popular"];

  return (
    <div className="min-h-screen  max-w-[95%] mx-auto flex flex-col">
      <div className="flex-grow">
        <div className="w-full mx-auto">
          {/* Search and Filter Section */}
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 bg-clip-text text-transparent">
            Find Your Perfect Theme
          </h1>
          <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-center py-6">
            <Input
              placeholder="Search themes..."
              className="w-full max-w-xl rounded-full px-6 py-4 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              onChange={(e) => debouncedSearch(e.target.value)}
              aria-label="Search themes"
            />

            <div className="w-full max-w-xs">
              {/* ShadCN Select component for filtering */}
              <Select onValueChange={setSelectedCategory} value={selectedCategory}>
                <SelectTrigger className="w-full rounded-full px-4 py-2 shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all"
                        ? "All Themes"
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Themes Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence>
              {isLoading ? (
                Array(8).fill().map((_, i) => <ThemeSkeleton key={i} />)
              ) : filteredThemes.length > 0 ? (
                filteredThemes.map((theme) => (
                  <motion.div
                    key={theme.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    layout
                  >
                    <Card key={theme.id} className="overflow-hidden hover:shadow-lg transition-shadow hover:scale-105 hover:opacity-65 cursor-pointer">
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={imageViewer(theme?.previewUrls)}
                          alt={theme.name}
                          className="w-full h-full object-cover"
                        />
                        {theme.category === "premium" && (
                          <Badge className="absolute top-2 right-2">Premium</Badge>
                        )}
                      </div>

                      <div className="grid gap-2">
                        <h3 className="text-xl text-center font-semibold mb-2">{theme?.name}</h3>
                        <p className="text-sm max-w-[80%] text-justify mx-auto font-semibold mb-2">{theme?.description}</p>
                        <div className="flex justify-between my-2 gap-2 items-center px-2">
                          <span className="text-muted-foreground">
                            {`$ ${theme?.basePrice}`}
                          </span>
                          <Button
                            onClick={() => handlePayment(theme)}
                            className="bg-orange-700 hover:bg-orange-800"
                          >
                            <ShoppingBag className="h-6 w-6 text-white" />
                            Buy
                          </Button>
                        </div>
                        <Button onClick={() => window.open(`/preview/${theme.id}`, '_blank')} className="w-full bg-orange-700">preview</Button>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-xl text-muted-foreground">
                    No themes found matching your criteria 😞
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Debounce utility
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

// Skeleton loader component
const ThemeSkeleton = () => (
  <div className="animate-pulse bg-muted rounded-xl p-4 h-[400px] space-y-4">
    <div className="h-48 bg-gray-300 rounded-lg" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  </div>
);

export default SelectTheme;