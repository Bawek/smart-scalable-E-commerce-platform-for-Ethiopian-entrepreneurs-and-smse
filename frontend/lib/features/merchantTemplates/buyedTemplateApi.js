import { appApi } from "@/lib/appApi";

export const merchantTemplateApi = appApi.injectEndpoints({
    tagTypes: ["MerchantTemplate"],
    overrideExisting:true,
    endpoints: (builder) => ({
        getAllMerchantTemplates: builder.query({
            query: () => '/merchantTemplates/get-all'
        }),
        getMerchantTemplateByDomain: builder.query({
            query: (domain) => `/merchantTemplates/merchant-template/${domain}`,
            // providesTags: (result, error, id) => [{ type: 'Location', id }], // Provides the location data tag with the ID
        }),

        changeMerchantTemplate: builder.mutation({
            query: (id) => ({
                url: `merchantTemplates/change-template/${id}`,
                method: "GET",
            }),
            // invalidatesTags: ["Shop"],
        }),
    }),
});
export const {
    useGetAllMerchantTemplatesQuery,
    useChangeMerchantTemplateMutation,
    useGetMerchantTemplateByDomainQuery,
} = merchantTemplateApi;

