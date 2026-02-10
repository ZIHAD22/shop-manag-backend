import { Inventory } from "../../generated/prisma/client";
import prisma from "../../config/db";
import { PrismaTransactionalClient } from "../../types";
import AppError from "../../error/AppError";
import { inventoryValidation } from "./inventory.validation";
import z from "zod";

const createInventory = async ({
  tx,
  payload,
}: {
  tx: PrismaTransactionalClient;
  payload: {
    productId: string;
    shopId: string;
    availableQuantity: number;
    reOrderLevel: number;
  };
}): Promise<Inventory> => {
  return await tx.inventory.create({
    data: payload,
    include: {
      product: true,
      histories: true,
    },
  });
};

type UpdateInventoryPayload = z.infer<
  typeof inventoryValidation.updateInventorySchema
>;

const getInventoryByProductId = async (productId: string, ownerId: string) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      productId,
      shopId: shop.shopId,
    },
    include: { product: true },
  });

  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  return inventory;
};

const getMyInventories = async (ownerId: string) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  return prisma.inventory.findMany({
    where: { shopId: shop.shopId },
    include: { product: true },
  });
};

const updateInventory = async (
  inventoryId: string,
  ownerId: string,
  payload: UpdateInventoryPayload,
) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      inventoryId,
      shopId: shop.shopId,
    },
  });

  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  return prisma.inventory.update({
    where: { inventoryId },
    data: {
      ...(payload.availableQuantity !== undefined && {
        availableQuantity: payload.availableQuantity,
      }),
      ...(payload.reOrderLevel !== undefined && {
        reOrderLevel: payload.reOrderLevel,
      }),
    },
  });
};

const deleteInventory = async (inventoryId: string, ownerId: string) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      inventoryId,
      shopId: shop.shopId,
    },
  });

  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  return prisma.inventory.delete({
    where: { inventoryId },
  });
};

export const inventoryServices = {
  createInventory,
  getInventoryByProductId,
  getMyInventories,
  updateInventory,
  deleteInventory,
};
