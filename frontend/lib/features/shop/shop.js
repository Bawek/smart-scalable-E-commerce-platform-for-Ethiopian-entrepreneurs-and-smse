import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopSlice = createApi({
  reducerPath: "shop",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/shop/",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("access_token"); // Adjust based on your token storage strategy
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Shop", "CustomizedTemplate", "customisedPage", "WebBuilders"],
  endpoints: (builder) => ({
    getCustomizedTemplate: builder.query({
      query: (merchantId) => `getcustomized_template/${merchantId}/`,
      providesTags: ["CustomizedTemplate"],
    }),
    customisedTemplate: builder.mutation({
      query: ({ originalTemplateId, modifiedMerhant, modifiedPages }) => ({
        url: `customized_template/`,
        method: "POST",
        body: {
          original_template: originalTemplateId,
          modifiedby: modifiedMerhant,
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ["CustomizedTemplate"],
    }),
    getCustomisedPages: builder.query({
      query: (merchantId) => `getcustomised_pages/${merchantId}/`,
      providesTags: ["customisedPage"],
    }),
    getCustomisedPage: builder.query({
      query: ({ templateId, pageName }) =>
        `getcustomised_page/${templateId}/${pageName}/`,
      providesTags: ["customisedPage"],
    }),
    getShop: builder.query({
      query: (shopId) => `getshop/${shopId}/`,
      providesTags: ["customisedPage"],
    }),
    getShopWithId: builder.query({
      query: (shopId) => `getshop-id/${shopId}/`,
      providesTags: ["Shop"],
    }),
    updatecustomizedTemplate: builder.mutation({
      query: ({ customised_templateId, ...modifiedPages }) => ({
        url: `updatecustomised_pages/${customised_templateId}/`,
        method: "POST",
        body: {
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ["customisedPage"],
    }),
    createShop: builder.mutation({
      query: ({ name, templateId }) => ({
        url: "publishshop/",
        method: "POST",
        body: {
          name,
          customised_template: templateId,
        },
      }),
      invalidatesTags: ["Shop"],
    }),
    updateShop: builder.mutation({
      query: ({ shopId, name, templateId, modifiedPages }) => ({
        url: `updateshop/${shopId}/`,
        method: "PUT",
        body: {
          name,
          template: templateId,
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});
export const {
  useCreateShopMutation,
  useUpdateShopMutation,
  useGetShopQuery,
  useGetShopsQuery,
  useGetShopWithIdQuery,
  useGetCustomisedPagesQuery,
  useGetCustomisedPageQuery,
  useUpdatecustomizedTemplateMutation,
  useGetCustomizedTemplateQuery,
  useCustomisedTemplateMutation,
  useGetshopMerchantQuery,
} = shopSlice;
// export const selectGetCustomizedTemplateResult =
// 	webBuilder.endpoints.getCustomizedTemplate.select();
//   export const selectCustomisedTemplateResult =
// 	webBuilder.endpoints.customisedTemplate.select();
// export const selectGetCustomisedPagesResult =
// 	webBuilder.endpoints.getCustomisedPages.select();
// export const selectGetCustomisedPageResult =
// 	webBuilder.endpoints.getCustomisedPage.select();
// export const selectUpdatecustomizedTemplateResult =
// 	webBuilder.endpoints.updatecustomizedTemplate.select();
