import { appApi } from "@/lib/appApi";

export const MerchantRegistrationApi = appApi.injectEndpoints({
    tagTypes: ["MerchantRegistration"],
    endpoints: (builder) => ({
        getAllMerchants: builder.query({
            query: () => `/merchant/get-all`,
            // providesTags: ["MerchantRegistration"],
        }),
        getMerchantById: builder.query({
            query: (merchantId) => `merchant/get/${merchantId}/`,
        }),
        // getAllOrders: builder.query({
        //     query: () => `order/all-orders/`,
        //     providesTags: ["Shop"],
        // }),
        // Login mutation
        registerMerchant: builder.mutation({
            query: (formData) => {
                return {
                    url: "/merchant/register",
                    method: "POST",
                    body: formData,
                };
            },
            // invalidatesTags: ["MerchantRegistration"],
        }),

        // Registration mutation
        //     registerMerchantRegistration: builder.mutation({
        //         query: (formData) => ({
        //             url: "/MerchantRegistrations/register",
        //             method: "POST",
        //             body: formData,
        //         }),
        //         invalidatesTags: ["MerchantRegistration"],
        //     }),
    }),
});

export const {
    useRegisterMerchantMutation,
    useGetAllMerchantsQuery,
    useGetMerchantByIdQuery
} = MerchantRegistrationApi;
