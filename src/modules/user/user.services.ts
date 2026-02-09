import { tokenHelper } from "./../../utils/tokenHelper";
import { shopOwnerValidation } from "./user.validation";
import { authServices } from "../auth/auth.services";
import prisma from "../../config/db";
import z from "zod";
import config from "../../config";
import AppError from "../../error/AppError";

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

type UpdateShopOwnerPayload = z.infer<
  typeof shopOwnerValidation.updateShopOwnerValidation
>;

const getMyProfile = async (ownerId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return owner;
};

const updateMyProfile = async (
  ownerId: string,
  payload: UpdateShopOwnerPayload,
) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return prisma.shopOwner.update({
    where: { id: ownerId },
    data: {
      ...(payload.name !== undefined && { name: payload.name }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.profilePic !== undefined && {
        profilePic: payload.profilePic,
      }),
    },
  });
};

const deleteMyAccount = async (ownerId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  // Auth will be deleted automatically (onDelete: Cascade)
  return prisma.shopOwner.delete({
    where: { id: ownerId },
  });
};

const getAllShopOwners = async () => {
  return prisma.shopOwner.findMany();
};

const getShopOwnerById = async (ownerId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: ownerId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return owner;
};

export const shopOwnerServices = {
  createShopOwner,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  getAllShopOwners,
  getShopOwnerById,
};
