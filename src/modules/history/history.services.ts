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
      actionType: payload.actionType,
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

const getHistoriesById = async (id: string) => {
  return await prisma.history.findFirst({
    where: {
      historyId: id,
    },
  });
};

const getHistoriesByInventoryId = async (id: string) => {
  return await prisma.history.findMany({
    where: {
      inventoryId: id,
    },
  });
};

const getHistoriesByProductId = async (id: string) => {
  return await prisma.history.findMany({
    where: {
      productId: id,
    },
  });
};

const getHistoriesByPerformer = async (email: string) => {
  return await prisma.history.findMany({
    where: {
      performerEmail: email,
    },
  });
};

const getHistoryByShopId = async (id: string) => {
  return prisma.history.findMany({
    where: {
      shopId: id,
    },
  });
};

export const historyServices = {
  createHistory,
  getHistoriesById,
  getHistoriesByInventoryId,
  getHistoriesByProductId,
  getHistoriesByPerformer,
  getHistoryByShopId,
};
