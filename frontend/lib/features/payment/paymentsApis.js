import { appApi } from "@/lib/appApi";
// i will generate on the backend
// const generateTransactionRef = () => {
//     const timestamp = Date.now().toString(36);
//     const random = Math.random().toString(36).substr(2, 5);
//     return `tx_${timestamp}_${random}`;
// };

export const paymentApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (paymentData) => ({
                url: "/payment/pay",
                method: "POST",
                body: paymentData
            }),
        }),
    }),
});

export const { useInitiatePaymentMutation } = paymentApi;