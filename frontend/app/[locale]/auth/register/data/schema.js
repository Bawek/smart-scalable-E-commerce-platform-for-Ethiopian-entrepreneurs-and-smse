import { z } from "zod";

// Define schema for validation based on fields array
export const merchantRegistrationSchema = z.object({
    bankAccountNumber: z.string().min(1, {
        message: "Bank Account Number is required",
    }),
    hasPhysicalStore: z.boolean().optional(),
    physicalShopName: z.string().optional(),
    physicalShopAddress: z.string().optional(),
    physicalShopCity: z.string().optional(),
    physicalShopPhoneNumber: z.string().optional(),
    onlineShopType: z.enum(["Jewelry and cosmetics", "Electronics", "Cloth", "Shoes"]),
});
