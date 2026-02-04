import { shopOwnerValidation } from "./user.validation";
import { Prisma, ShopOwner } from "@prisma/client";
import prisma from "../../config/db";
import z from "zod";
import { create } from "domain";

const createShopOwner = async (
  payload: z.infer<typeof shopOwnerValidation.createShopOwnerValidation>,
): Promise<ShopOwner> => {
  const { name, email, userName, phone } = payload.shopOwner;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.auth.create({
      data: {
        userName,
        email,
        password: payload.password,
      },
    });
    return await tx.shopOwner.create({
      data: {
        name,
        email,
        phone,
      },
    });
  });

  return result;
};

export const shopOwnerServices = {
  createShopOwner,
};
