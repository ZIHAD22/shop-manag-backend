import { z } from "zod";

const createProduct = z.object({
  name: z.string().min(3, "Product name is required"),

  category: z.string().min(2, "Category is required"), // rice, beverage, personal care

  variant: z.string().min(1, "Variant is required"), // 5kg, 1L, 500ml, packet, bottle

  costPrice: z.number(),

  sellingPrice: z.number(),

  texPercentage: z.number(),
  availableQuantity: z.number(),
  reOrderLevel: z.number(),
});

export const productValidation = {
  createProduct,
};
