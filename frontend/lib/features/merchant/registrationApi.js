import { appApi } from "@/lib/appApi";

export const MerchantRegistrationApi = appApi.injectEndpoints({
    tagTypes: ["MerchantRegistration"],
    endpoints: (builder) => ({
        // getMerchants: builder.query({
        //     query: () => `/merchants/`,
        //     providesTags: ["MerchantRegistration"],
        // }),
        // getMerchant: builder.query({
        //     query: (unique_id) => `MerchantRegistration/merchant/${unique_id}/`, // Ensure this endpoint matches your backend
        //     providesTags: ["MerchantRegistration"],
        // }),
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
    useRegisterMerchantMutation
} = MerchantRegistrationApi;
