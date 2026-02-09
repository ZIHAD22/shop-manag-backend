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

export const inventoryValidation = {
  createInventorySchema,
};
