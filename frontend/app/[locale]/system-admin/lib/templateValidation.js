import { z } from "zod";

// Define schema for validation based on fields array
export const pageSchema = z.object({
    templateName: z.string().min(1, {
        message: "page name is required",
    }),
    status: z.string().min(1, {
        message: "page name is required",
    }),
    PreviewImage: z.instanceof(File).optional(),
    templatePrice: z.string().min(1, {
        message: "page name is required",
    }),
    description: z.string().min(1, {
        message: "page name is required",
    }),
});
