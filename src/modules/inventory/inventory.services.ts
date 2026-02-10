import { Inventory, InventoryActionType } from "../../generated/prisma/client";
import prisma from "../../config/db";
import { PrismaTransactionalClient } from "../../types";
import AppError from "../../error/AppError";
import { inventoryValidation } from "./inventory.validation";
import z from "zod";
import { productServices } from "../product/product.services";
import { historyServices } from "../history/history.services";

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

const stockOutInventory = async (
  payload: z.infer<typeof inventoryValidation.stockOutSchema> & {
    productId: string;
  },
  user: any,
) => {
  const { productId, quantity, referenceId, note } = payload;

  const product = await productServices.findProductByProductId(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }
  const inventory = await prisma.inventory.findFirst({
    where: {
      productId: product.productId,
    },
  });
  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  if (inventory.availableQuantity < quantity) {
    throw new Error("Insufficient stock");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedInventory = await tx.inventory.update({
      where: { inventoryId: inventory.inventoryId },
      data: {
        availableQuantity: {
          decrement: quantity,
        },
      },
    });

    await historyServices.createHistory({
      tx,
      payload: {
        inventoryId: inventory.inventoryId,
        productId: product.productId,
        actionType: InventoryActionType.STOCK_OUT,
        quantityBefore: inventory.availableQuantity,
        quantityChange: quantity,
        quantityAfter: updatedInventory.availableQuantity,
        shopId: inventory.shopId,
        note: note,
        referenceId: referenceId,
        performerEmail: user?.email,
      },
    });

    return updatedInventory;
  });
};

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
    include: { product: true, histories: true },
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
  payload: z.infer<typeof inventoryValidation.updateInventorySchema>,
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
  stockOutInventory,
};
