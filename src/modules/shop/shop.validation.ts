import z from "zod";

const createShopSchema = z.object({
  shopName: z.string().min(3, "Shop name is required"),

  shopAddress: z.string().min(5, "Shop address is required"),

  shopPhone: z
    .string()
    .regex(/^\+8801[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

  shopEmail: z.email("Invalid shop email"),

  shopType: z.string().min(3, "Shop type is required"),
});

export const shopValidation = {
  createShopSchema,
};
