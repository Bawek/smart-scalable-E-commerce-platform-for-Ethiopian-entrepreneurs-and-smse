import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/auth/",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: () => `customers/`,
      providesTags: ["Auth"],
    }),
    getCustomer: builder.query({
      query: (unique_id) => `customer/${unique_id}/`, // Ensure this endpoint matches your backend
      providesTags: ["Auth"],
    }),
    // Login mutation
    login: builder.mutation({
      query: (formData) => {
        return {
          url: "customer/login/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Registration mutation
    register: builder.mutation({
      query: (formData) => ({
        url: "customer/register/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetCustomerQuery,
  useRegisterMutation,
  useGetCustomersQuery,
} = authSlice;
