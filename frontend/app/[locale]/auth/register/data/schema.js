import { z } from "zod";

// Define schema for validation based on fields array
export const merchantRegistrationSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  bankAccountNumber: z.string().min(1, {
    message: "Bank Account Number is required",
  }),
  hasPhysicalStore: z.boolean(),
  physicalShopName: z.string().optional(),
  physicalShopAddress: z.string().optional(),
  physicalShopCity: z.string().optional(),
  physicalShopPhoneNumber: z.string().optional(),
  onlineShopType: z.enum(["ECOMMERCE", "MARKETPLACE", "SUBSCRIPTION", "CUSTOM"]),
});
