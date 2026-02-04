import { Prisma, Product } from "@prisma/client";
import prisma from "../../config/db";

const createProduct = async (
  payload: Prisma.ProductCreateInput
): Promise<Product> => {
  const result = prisma.product.create({
    data: payload,
  });
  return result;
};

export const productServices = {
  createProduct,
};
