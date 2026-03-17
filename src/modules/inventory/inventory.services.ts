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

  return await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findFirst({
      where: {
        productId: product.productId,
      },
    });
    if (!inventory) {
      throw new AppError(404, "Inventory not found");
    }

    const updated = await tx.inventory.updateMany({
      where: {
        inventoryId: inventory.inventoryId,
        availableQuantity: {
          gte: quantity,
        },
      },
      data: {
        availableQuantity: {
          decrement: quantity,
        },
      },
    });

    if (updated.count === 0) {
      throw new AppError(400, "Insufficient stock");
    }

    const updatedInventory = await tx.inventory.findUnique({
      where: { inventoryId: inventory.inventoryId },
    });

    if (!updatedInventory) {
      throw new AppError(404, "Inventory not found");
    }

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

const stockInInventory = async (
  payload: z.infer<typeof inventoryValidation.stockInSchema> & {
    productId: string;
  },
  user: any,
) => {
  const { productId, quantity, referenceId, note } = payload;

  const product = await productServices.findProductByProductId(productId);
  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findFirst({
      where: { productId: product.productId },
    });

    if (!inventory) {
      throw new AppError(404, "Inventory not found");
    }

    const updatedInventory = await tx.inventory.update({
      where: { inventoryId: inventory.inventoryId },
      data: {
        availableQuantity: {
          increment: quantity,
        },
      },
    });

    await historyServices.createHistory({
      tx,
      payload: {
        inventoryId: inventory.inventoryId,
        productId: product.productId,
        actionType: InventoryActionType.STOCK_IN,
        quantityBefore: inventory.availableQuantity,
        quantityChange: quantity,
        quantityAfter: updatedInventory.availableQuantity,
        shopId: inventory.shopId,
        note,
        referenceId,
        performerEmail: user?.email,
      },
    });

    return updatedInventory;
  });
};

const getInventoryByProductId = async (productId: string, userId: string) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      productId,
      shopId: shop.shopId,
    },
    include: {
      product: true,
      histories: {
        orderBy: {
          performedAt: "desc",
        },
      },
    },
  });

  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  return inventory;
};

const getMyInventories = async (userId: string) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
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
  user: any,
  payload: z.infer<typeof inventoryValidation.updateInventorySchema>,
) => {
  const result = prisma.$transaction(async (tx) => {
    const shop = await tx.shop.findFirst({
      where: { ownerId: user?.userId },
    });

    if (!shop) {
      throw new AppError(404, "Shop not found");
    }

    const inventory = await tx.inventory.findFirst({
      where: {
        inventoryId,
        shopId: shop.shopId,
      },
    });

    if (!inventory) {
      throw new AppError(404, "Inventory not found");
    }

    const updatedInventoryData = await tx.inventory.update({
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

    const history = await historyServices.createHistory({
      tx,
      payload: {
        inventoryId: inventory.inventoryId,
        productId: inventory.productId,
        actionType: InventoryActionType.MANUAL_UPDATE,
        quantityBefore: inventory.availableQuantity,
        quantityChange:
          inventory.availableQuantity > updatedInventoryData.availableQuantity
            ? inventory.availableQuantity -
              updatedInventoryData.availableQuantity
            : updatedInventoryData.availableQuantity -
              inventory.availableQuantity,
        quantityAfter: updatedInventoryData.availableQuantity,
        shopId: shop.shopId,
        note: "Manually Update Inventory Data",
        referenceId: "Manually Update Inventory Data",
        performerEmail: user.email,
      },
    });

    return updatedInventoryData;
  });

  return result;
};

const deleteInventoryByProductId = async (
  productId: string,
  userId: string,
) => {
  const shop = await prisma.shop.findFirst({
    where: { ownerId: userId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      productId: productId,
      shopId: shop.shopId,
    },
  });

  if (!inventory) {
    throw new AppError(404, "Inventory not found");
  }

  return prisma.product.delete({
    where: { productId },
  });
};

export const inventoryServices = {
  createInventory,
  getInventoryByProductId,
  getMyInventories,
  updateInventory,
  deleteInventoryByProductId,
  stockOutInventory,
  stockInInventory,
};
