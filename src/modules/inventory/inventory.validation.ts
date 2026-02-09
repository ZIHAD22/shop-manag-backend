import { z } from "zod";

export const createInventorySchema = z.object({
  shopId: z.string().uuid("Invalid shopId"),

  availableQuantity: z
    .string()
    .regex(/^\d+$/, "availableQuantity must be a numeric string"),

  reOrderLevel: z
    .string()
    .regex(/^\d+$/, "reOrderLevel must be a numeric string"),
});

export const updateInventorySchema = z.object({
  availableQuantity: z.string().regex(/^\d+$/).optional(),
  reOrderLevel: z.string().regex(/^\d+$/).optional(),
});

export const inventoryValidation = {
  createInventorySchema,
  updateInventorySchema,
};
