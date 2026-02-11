import { number, z } from "zod";

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
  availableQuantity: z.number().optional(),
  reOrderLevel: z.number().optional(),
});

export const stockOutSchema = z.object({
  quantity: z.number(),
  note: z.string().optional(),
  referenceId: z.string().optional(),
});

const stockInSchema = stockOutSchema;

export const inventoryValidation = {
  createInventorySchema,
  updateInventorySchema,
  stockOutSchema,
  stockInSchema,
};
