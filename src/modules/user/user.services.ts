import { tokenHelper } from "./../../utils/tokenHelper";
import { shopOwnerValidation } from "./user.validation";
import { authServices } from "../auth/auth.services";
import { Prisma, ShopOwner } from "@prisma/client";
import prisma from "../../config/db";
import z from "zod";
import config from "../../config";

const createShopOwner = async (
  payload: z.infer<typeof shopOwnerValidation.createShopOwnerValidation>,
) => {
  const { name, email, userName, phone } = payload.shopOwner;

  const result = await prisma.$transaction(async (tx) => {
    // call from auth module
    const user = await authServices.createAuthUser({
      tx,
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

  const accessToken = tokenHelper.createAccessToken(
    { ownerId: result.id, email: result.email, role: result.role },
    config.access_secret as string,
    config.accessTokenExpiresIn as string,
  );

  const refreshToken = tokenHelper.createAccessToken(
    { ownerId: result.id, email: result.email, role: result.role },
    config.refresh_secret as string,
    config.refreshTokenExpiresIn as string,
  );

  return { result, accessToken, refreshToken };
};

export const shopOwnerServices = {
  createShopOwner,
};
