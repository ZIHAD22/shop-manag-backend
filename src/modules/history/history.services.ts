import z from "zod";
import { PrismaTransactionalClient } from "../../types";
import { historyValidation } from "./history.validation";
import prisma from "../../config/db";

const createHistory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransactionalClient;
  payload: z.infer<typeof historyValidation.createHistorySchema>;
}) => {
  return await tx.history.create({
    data: {
      actionType: "INIT",
      inventoryId: payload.inventoryId,
      productId: payload.productId,
      performerEmail: payload.performerEmail,
      shopId: payload.shopId,
      quantityAfter: payload.quantityAfter,
      quantityBefore: payload.quantityBefore,
      quantityChange: payload.quantityChange,
      note: payload.note ?? null,
      referenceId: payload.referenceId ?? null,
    },
  });
};

export const historyServices = {
  createHistory,
};
