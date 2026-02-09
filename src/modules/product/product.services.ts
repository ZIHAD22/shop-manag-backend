import prisma from "../../config/db";
import generateSkuId from "../../utils/generateSkuId";
import AppError from "../../error/AppError";
import { inventoryServices } from "../inventory/inventory.services";
import z from "zod";
import { productValidation } from "./product.validation";

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

  // const result = prisma.product.create({
  //   data: {
  //     ...payload,
  //     sku: generateSkuId(payload.category, payload.name, payload.variant),
  //   },
  // });

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

    return inventory;
  });
  return result;
};

export const productServices = {
  createProduct,
};
