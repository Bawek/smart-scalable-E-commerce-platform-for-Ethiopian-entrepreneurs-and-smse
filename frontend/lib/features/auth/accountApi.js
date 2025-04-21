import { appApi } from "@/lib/appApi";

export const accountApi = appApi.injectEndpoints({
    // tagTypes: ["Account"],
    endpoints: (builder) => ({
        getMerchants: builder.query({
            query: () => `/merchants/`,
        }),
        getMerchant: builder.query({
            query: (unique_id) => `Account/merchant/${unique_id}/`, // Ensure this endpoint matches your backend
            // providesTags: ["Account"],
        }),
        getAllOrders: builder.query({
            query: () => `order/all-orders/`,
            // providesTags: ["Shop"],
        }),
        // Login mutation
        login: builder.mutation({
            query: (formData) => {
                return {
                    url: "/accounts/login",
                    method: "POST",
                    body: formData,
                };
            },
            // invalidatesTags: ["Account"],
        }),
        logout: builder.mutation({
            query: () => {
                return {
                    url: "/accounts/logout",
                    method: "POST",
                };
            },
        }),
        // Registration mutation
        registerAccount: builder.mutation({
            query: (formData) => ({
                url: "/accounts/register",
                method: "POST",
                body: formData,
            }),
            // invalidatesTags: ["Account"],
        }),
        // update Accout mutation
        updateAccount: builder.mutation({
            query: (formData) => {
                console.log(formData,'form data se')
                return {
                    url: `/accounts/update/${formData.id}`,
                    method: "POST",
                    body: formData.formData,
                }
            },
            // invalidatesTags: ["Account"],
        }),
    }),
});

export const {
    useLoginMutation,
    useGetMerchantQuery,
    useRegisterAccountMutation,
    useGetMerchantsQuery,
    useGetAllOrdersQuery,
    useLogoutMutation,
    useUpdateAccountMutation
} = accountApi;
