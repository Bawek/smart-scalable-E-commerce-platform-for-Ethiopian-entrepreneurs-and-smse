import { appApi } from "@/lib/appApi";

export const orderApi = appApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
    }),

    // Get a single order by its ID
    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
    }),

    // Get all orders by user/customer ID
    getOrdersByUserId: builder.query({
      query: (userId) => `/orders/get-by-account/${userId}`,
    }),

    // Update order status (e.g., pending -> completed)
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
    }),

    // Delete an order by ID
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks
export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersByUserIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
