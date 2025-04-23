import { appApi } from "@/lib/appApi";
export const paymentApi = appApi.injectEndpoints({
    overrideExisting: true, 
    endpoints: (builder) => ({
        verifyPayment: builder.mutation({
            query: (tx_ref) => ({
                url: `/verify/${tx_ref}`,
                method: "GET",
            }),
        }),
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: "/pay",
                method: "POST",
                body: paymentData
            }),
        }),
    }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentMutation } = paymentApi;