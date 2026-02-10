import { z } from "zod";

export const createHistorySchema = z.object({
  shopId: z.uuid(),

  inventoryId: z.uuid(),
  productId: z.uuid(),

  actionType: z.enum([
    "INIT",
    "MANUAL_UPDATE",
    "STOCK_IN",
    "STOCK_OUT",
    "ADJUSTMENT",
  ]),

  quantityBefore: z.number().int(),
  quantityChange: z.number().int(),
  quantityAfter: z.number().int(),

  referenceId: z.string().optional(),
  note: z.string().optional(),

  performerEmail: z.email(),
});

export const historyValidation = {
  createHistorySchema,
};
