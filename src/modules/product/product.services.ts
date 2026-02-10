import prisma from "../../config/db";
import generateSkuId from "../../utils/generateSkuId";
import AppError from "../../error/AppError";
import { inventoryServices } from "../inventory/inventory.services";
import z from "zod";
import { productValidation } from "./product.validation";
import { historyServices } from "../history/history.services";
import { InventoryActionType } from "../../generated/prisma/enums";

const createProduct = async (
  {
    availableQuantity,
    category,
    costPrice,
    name,
    reOrderLevel,
    sellingPrice,
    texPercentage,
    variant,
  }: z.infer<typeof productValidation.createProduct>,
  user: any,
) => {
  const shop = await prisma.shop.findFirst({
    where: {
      ownerId: user.ownerId,
    },
  });

  if (!shop) {
    throw new AppError(400, "Please create a shop and try again!");
  }

  const result = prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: {
        category,
        sku: generateSkuId(category, name, variant),
        costPrice,
        name,
        sellingPrice,
        texPercentage,
        variant,
      },
    });

    const inventory = await inventoryServices.createInventory({
      tx,
      payload: {
        shopId: shop.shopId,
        productId: product.productId,
        availableQuantity,
        reOrderLevel,
      },
    });

    const history = await historyServices.createHistory({
      tx,
      payload: {
        inventoryId: inventory.inventoryId,
        productId: product.productId,
        actionType: InventoryActionType.INIT,
        quantityAfter: inventory.availableQuantity,
        quantityBefore: 0,
        quantityChange: inventory.availableQuantity,
        shopId: shop.shopId,
        note: "Init the inventory",
        referenceId: "Init the inventory",
        performerEmail: user.email,
      },
    });

    return inventory;
  });
  return result;
};

const findProductByProductId = async (id: string) => {
  return await prisma.product.findFirst({
    where: {
      productId: id,
    },
  });
};

export const productServices = {
  createProduct,
  findProductByProductId,
};
