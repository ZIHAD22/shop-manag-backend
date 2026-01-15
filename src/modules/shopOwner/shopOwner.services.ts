import { Prisma, ShopOwner } from "@prisma/client";
import prisma from "../../config/db";

const createShopOwner = async (
  payload: Prisma.ShopOwnerCreateInput
): Promise<ShopOwner> => {
  const result = await prisma.shopOwner.create({
    data: payload,
  });

  return result;
};

export const shopOwnerServices = {
  createShopOwner,
};
