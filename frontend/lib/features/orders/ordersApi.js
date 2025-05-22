import { appApi } from "@/lib/appApi";

export const orderApi = appApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: "/orders",
                method: "POST",
                body: orderData,
            }),
        }),

        getOrderById: builder.query({
            query: (orderId) => `/orders/${orderId}`,
        }),

        getUserOrders: builder.query({
            query: (userId) => `/orders/user/${userId}`,
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
        }),

        deleteOrder: builder.mutation({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useGetUserOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} = orderApi;
