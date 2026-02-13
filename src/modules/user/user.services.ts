import { tokenHelper } from "./../../utils/tokenHelper";
import { userValidation } from "./user.validation";
import { authServices } from "../auth/auth.services";
import prisma from "../../config/db";
import z from "zod";
import config from "../../config";
import AppError from "../../error/AppError";
import { Role } from "../../generated/prisma/enums";

const createAdmin = async (
  payload: z.infer<typeof userValidation.createAdminValidation>,
) => {
  const { name, email, userName, phone } = payload.admin;

  const result = await prisma.$transaction(async (tx) => {
    // call from auth module
    const user = await authServices.createAuthUser({
      tx,
      payload: {
        userName,
        email,
        password: payload.password,
        role: Role.ADMIN,
      },
    });

    const admin = await tx.admin.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return {
      ...admin,
      role: user.role,
      otpVerified: user.otpVerified,
      status: user.status,
    };
  });

  const accessToken = tokenHelper.createAccessToken(
    { userId: result.id, email: result.email, role: result.role },
    config.access_secret as string,
    config.accessTokenExpiresIn as string,
  );

  const refreshToken = tokenHelper.createAccessToken(
    { userId: result.id, email: result.email, role: result.role },
    config.refresh_secret as string,
    config.refreshTokenExpiresIn as string,
  );

  return { result, accessToken, refreshToken };
};

const createShopOwner = async (
  payload: z.infer<typeof userValidation.createShopOwnerValidation>,
) => {
  const { name, email, userName, phone } = payload.shopOwner;

  const result = await prisma.$transaction(async (tx) => {
    // call from auth module
    const user = await authServices.createAuthUser({
      tx,
      payload: {
        userName,
        email,
        password: payload.password,
        role: Role.OWNER,
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
    { userId: result.id, email: result.email, role: result.role },
    config.access_secret as string,
    config.accessTokenExpiresIn as string,
  );

  const refreshToken = tokenHelper.createAccessToken(
    { userId: result.id, email: result.email, role: result.role },
    config.refresh_secret as string,
    config.refreshTokenExpiresIn as string,
  );

  return { result, accessToken, refreshToken };
};
const getMyProfile = async (userId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: userId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return owner;
};

const updateMyProfile = async (
  userId: string,
  payload: z.infer<typeof userValidation.updateShopOwnerValidation>,
) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: userId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return prisma.shopOwner.update({
    where: { id: userId },
    data: {
      ...(payload.name !== undefined && { name: payload.name }),
      ...(payload.phone !== undefined && { phone: payload.phone }),
      ...(payload.profilePic !== undefined && {
        profilePic: payload.profilePic,
      }),
    },
  });
};

const deleteMyAccount = async (userId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: userId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  // Auth will be deleted automatically (onDelete: Cascade)
  return prisma.shopOwner.delete({
    where: { id: userId },
  });
};

const getAllShopOwners = async () => {
  return prisma.shopOwner.findMany();
};

const getShopOwnerById = async (userId: string) => {
  const owner = await prisma.shopOwner.findUnique({
    where: { id: userId },
  });

  if (!owner) {
    throw new AppError(404, "Shop owner not found");
  }

  return owner;
};

export const userServices = {
  createShopOwner,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  getAllShopOwners,
  getShopOwnerById,
  createAdmin,
};
