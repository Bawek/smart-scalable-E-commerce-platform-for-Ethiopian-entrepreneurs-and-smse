import { appApi } from "@/lib/appApi";

export const shopApi = appApi.injectEndpoints({
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    getShop: builder.query({
      query: (shopId) => `getshop/${shopId}/`,
      // providesTags: ["customisedPage"],
    }),
    getShopByAccount: builder.query({
      query: (accountId) => `/shops/getby-account/${accountId}`,
      // providesTags: ["customisedPage"],
    }),
    getShopWithId: builder.query({
      query: (shopId) => `getshop-id/${shopId}/`,
      // providesTags: ["Shop"],
    }),
    createShop: builder.mutation({
      query: (formData) => ({
        url: "/shops/register",
        method: "POST",
        body: formData
      }),
      // invalidatesTags: ["Shop"],
    }),
  }),
});
export const {
  useCreateShopMutation,
  useGetShopByAccountQuery,
} = shopApi;

