import { z } from "zod";

const createProduct = z.object({
  name: z.string().min(3, "Product name is required"),

  category: z.string().min(2, "Category is required"), // rice, beverage, personal care

  variant: z.string().min(1, "Variant is required"), // 5kg, 1L, 500ml, packet, bottle

  costPrice: z
    .string()
    .regex(/^\d+$/, "Cost price must be a number")
    .transform(Number),

  sellingPrice: z
    .string()
    .regex(/^\d+$/, "Selling price must be a number")
    .transform(Number),

  texPercentage: z
    .string()
    .regex(/^\d+%$/, "Tax must be like 5%")
    .transform((v) => Number(v.replace("%", ""))),
});

export const productValidation = {
  createProduct,
};
