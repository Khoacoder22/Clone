import { z } from "zod"

export const PostAdminCreateSupplier = z.object({
    name: z.string(),
    address: z.string().optional(),
    phone: z.string().optional(),
})

export const PostAdminUpdateSupplier = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
})