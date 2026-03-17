import z from "zod";

const createShopSchema = z.object({
  shopName: z.string().min(3, "Shop name is required"),

  shopAddress: z.string().min(5, "Shop address is required"),

  shopPhone: z.string(),

  shopEmail: z.email("Invalid shop email"),

  shopType: z.string().min(3, "Shop type is required"),
});

export const updateShopSchema = z.object({
  shopName: z.string().min(3).optional(),
  shopAddress: z.string().min(5).optional(),
  shopPhone: z
    .string()
    .regex(/^\+8801[3-9]\d{8}$/)
    .optional(),
  shopEmail: z.string().email().optional(),
  shopType: z.string().min(3).optional(),
});

export const shopValidation = {
  createShopSchema,
  updateShopSchema,
};
