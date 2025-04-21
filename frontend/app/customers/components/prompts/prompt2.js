'use client'
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { useCreateShopMutation, useGetShopByAccountQuery } from "@/lib/features/shop/shop";
import Link from "next/link";
import { useBuyTemplateMutation } from "@/lib/features/templates/templateApi";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// Enhanced validation schema
const shopSchema = z.object({
  slug: z.string()
    .min(3, "Shop slug must be at least 3 characters")
    .max(30, "Shop slug must be less than 30 characters")
    .regex(/^[a-z0-9-]+$/, "Shop slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(500, "Description must be less than 500 characters").optional(),
  businessHours: z.string()
    .refine(val => {
      try {
        const parsed = JSON.parse(val);
        return typeof parsed === 'object' && !Array.isArray(parsed);
      } catch {
        return false;
      }
    }, "Invalid business hours format. Please use valid JSON object format"),
  logoImageUrl: z.instanceof(File, "Shop logo is required")
    .refine(file => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      "Only JPEG, PNG & WEBP files are allowed")
    .refine(file => file.size <= 2 * 1024 * 1024, "File size must be less than 2MB")
});

const ShopRegistration = ({ accountId, editMode, setEditMode }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { data, isLoading, isError, error } = useGetShopByAccountQuery(accountId);
  const [imagePreview, setImagePreview] = React.useState("");
  const [createShop] = useCreateShopMutation();
  const [buyTemplate, { isLoading: isBuying }] = useBuyTemplateMutation();
  const mode = data?.merchantTemplateId ? 'update' : 'create';
  const router = useRouter()
  // Initialize form with proper default values
  const form = useForm({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      slug: data?.slug || "",
      description: data?.description || "",
      businessHours: data?.businessHours ? JSON.stringify(data.businessHours, null, 2) : "",
      logoImageUrl: undefined
    }
  });

  React.useEffect(() => {
    if (data?.logoImageUrl) {
      setImagePreview(data.logoImageUrl);
    }
  }, [data]);

  const handleBuy = async () => {
    try {
      const templateId = '0adf3a07-80de-433c-97ed-e6a29d69fcd8';
      await buyTemplate({ accountId, templateId }).unwrap();
      toast({
        title: "Template Purchased",
        description: "Template purchased successfully! You can now set up your shop.",
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        variant: "destructive",
        description: error.data?.message || "Failed to purchase template",
      });
    }
  };

  const handleFileChange = (e, field) => {
    try {
      const file = e.target.files[0];
      if (file) {
        field.onChange(file);
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
      }
    } catch (error) {
      toast({
        title: "File Error",
        variant: "destructive",
        description: "Failed to process selected file",
      });
    }
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const validatedData = shopSchema.parse(formData);
      const formPayload = new FormData();

      // Process business hours JSON
      let businessHours;
      try {
        businessHours = JSON.parse(validatedData.businessHours);
      } catch (error) {
        throw new Error("Invalid business hours format");
      }

      // Prepare form data
      Object.entries(validatedData).forEach(([key, value]) => {
        if (value instanceof File) {
          formPayload.append(key, value);
        } else if (key === 'businessHours') {
          formPayload.append(key, JSON.stringify(businessHours));
        } else if (value) {
          formPayload.append(key, value);
        }
      });

      formPayload.append('merchantTemplateId', 'cc52f716-3f85-40d9-842d-b2c81ff51eac');

      const response = await createShop(formPayload).unwrap();

      toast({
        title: "Success",
        description: `Shop ${mode === "create" ? 'created' : 'updated'} successfully`,
      });

      if (mode === "create") form.reset();

    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: error.data?.message || error.message || "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="w-full flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (isError) return <div>Error loading shop data: {error?.message}</div>;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      {!data?.merchantTemplateId && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            🎉 <strong>Congratulations!</strong> Your registration has been approved! Ready to take the next step and start building your shop?
            <br />
            <strong className="text-blue-900">Choose from a variety of customizable templates</strong> at an affordable price to kickstart your business journey. With just a few clicks, you can have your shop up and running in no time!
            <br />
            <Link href="/customers/templates" className="font-medium hover:text-orange-700 text-blue-900 underline">
              Explore Our Shop Templates
            </Link>{" "}
            and start building your dream business today!
          </p>
          <Button
            onClick={() => router.push('/customers/templates')}
            className="mt-4"
            disabled={isBuying}
          >
            {isBuying ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Purchase Starter Template for Only $29"
            )}
          </Button>
        </div>

      )}
      {
        data?.merchantTemplateId && (
          <Card className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">
                {mode === "create" ? "Register New Shop" : "Edit Shop Details"}
              </h1>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Slug <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="my-shop-slug"
                            pattern="[a-z0-9-]+"
                            title="Lowercase letters, numbers, and hyphens only"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            as="textarea"
                            rows={3}
                            {...field}
                            placeholder="Describe your shop..."
                            className="resize-none"
                          />
                        </FormControl>
                        <div className="text-sm text-gray-500 text-right">
                          {field.value?.length || 0}/500
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessHours"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Business Hours</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='{"monday": {"open": "09:00", "close": "18:00"}}'
                            className="font-mono text-sm"
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-sm text-gray-500 mt-1">
                          Use JSON format. Example:{" "}
                          <Link href="/examples/business-hours" target="_blank" className="text-blue-600 underline">
                            View format example
                          </Link>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoImageUrl"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Shop Logo <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, field)}
                                className="w-fit cursor-pointer"
                                aria-label="Upload shop logo"
                              />
                              <span className="text-sm text-gray-500 ml-2">
                                Max 2MB (JPEG, PNG, WEBP)
                              </span>
                            </div>
                            {imagePreview && (
                              <div className="relative w-20 h-20">
                                <img
                                  src={imagePreview}
                                  alt="Logo preview"
                                  className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                                  onError={() => setImagePreview("")}
                                />
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button
                    type="submit"
                    className="bg-orange-700 hover:bg-orange-800 min-w-[150px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : mode === "create" ? (
                      "Register Shop"
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </Card>
        )
      }

    </div>
  );
};

export default ShopRegistration;