import { Prisma, Shop } from "@prisma/client";
import prisma from "../../config/db";
import z from "zod";
import { shopValidation } from "./shop.validation";
import AppError from "../../error/AppError";

const createShop = async (
  payload: z.infer<typeof shopValidation.createShopSchema> & {
    ownerId: string;
  },
) => {
  const findShop = await prisma.shop.findFirst({
    where: {
      ownerId: payload.ownerId as string,
    },
  });

  if (findShop) {
    throw new AppError(409, "User already has a shop");
  }

  const result = await prisma.shop.create({
    data: payload,
  });

  return result;
};

export const shopServices = {
  createShop,
};
