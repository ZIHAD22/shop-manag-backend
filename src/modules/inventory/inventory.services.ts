import { Inventory, Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { PrismaTransactionalClient } from "../../types";

const createInventory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransactionalClient;
  payload: {
    productId: string;
    shopId: string;
    availableQuantity: string;
    reOrderLevel: string;
  };
}): Promise<Inventory> => {
  return await tx.inventory.create({
    data: payload,
    include: {
      product: true,
    },
  });
};

export const inventoryServices = {
  createInventory,
};
