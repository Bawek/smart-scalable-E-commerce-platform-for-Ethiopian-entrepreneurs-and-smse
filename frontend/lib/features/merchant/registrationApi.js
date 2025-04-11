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
        // change merchant status
        changeMerchantStatus: builder.mutation({
            query: (data) => {
                return {
                    url: `/merchant/updateStatus/${data.id}`,
                    method: "PUT",
                    body: data.status,
                };
            },
            // invalidatesTags: ["MerchantRegistration"],
        }),
        deleteMerchant: builder.mutation({
            query: (id) => ({
                url: `/merchant/delete/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useRegisterMerchantMutation,
    useGetAllMerchantsQuery,
    useGetMerchantByIdQuery,
    useDeleteMerchantMutation,
    useChangeMerchantStatusMutation
} = MerchantRegistrationApi;
