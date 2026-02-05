import { shopOwnerValidation } from "./user.validation";
import { Prisma, ShopOwner } from "@prisma/client";
import prisma from "../../config/db";
import z from "zod";
import { create } from "domain";
import { createAccessToken } from "../../utils/createAccessToken";

const createShopOwner = async (
  payload: z.infer<typeof shopOwnerValidation.createShopOwnerValidation>,
) => {
  const { name, email, userName, phone } = payload.shopOwner;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.auth.create({
      data: {
        userName,
        email,
        password: payload.password,
      },
    });
    const shopOwner = await tx.shopOwner.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return {
      ...shopOwner,
      role: user.role,
      otpVerified: user.otpVerified,
      status: user.status,
    };
  });

  const accessToken = createAccessToken(
    { email, role: result.role },
    "asdasq2323",
    "1d",
  );

  const refreshToken = createAccessToken(
    { email, role: result.role },
    "asawqeerrytttyb",
    "34d",
  );

  return { result, accessToken, refreshToken };
};

export const shopOwnerServices = {
  createShopOwner,
};
