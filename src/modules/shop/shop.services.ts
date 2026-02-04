import { Prisma, Shop } from "@prisma/client";
import prisma from "../../config/db";

const createShop = async (payload: Prisma.ShopCreateInput): Promise<Shop> => {
  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

export const shopServices = {
  createShop,
};
