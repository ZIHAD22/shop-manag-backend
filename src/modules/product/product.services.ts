import { Prisma, Product } from "@prisma/client";
import prisma from "../../config/db";
import generateSkuId from "../../utils/generateSkuId";
import AppError from "../../error/AppError";

const createProduct = async (
  payload: Prisma.ProductCreateInput,
  user: any,
): Promise<Product> => {
  const shop = await prisma.shop.findFirst(user.id);

  if (!shop) {
    throw new AppError(400, "Please create a shop and try again!");
  }

  const result = prisma.product.create({
    data: {
      ...payload,
      sku: generateSkuId(payload.category, payload.name, payload.variant),
    },
  });
  return result;
};

export const productServices = {
  createProduct,
};
