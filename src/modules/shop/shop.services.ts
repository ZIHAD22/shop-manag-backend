import prisma from "../../config/db";
import z from "zod";
import { shopValidation } from "./shop.validation";
import AppError from "../../error/AppError";

type CreateShopPayload = z.infer<typeof shopValidation.createShopSchema> & {
  ownerId: string;
};

type UpdateShopPayload = z.infer<typeof shopValidation.updateShopSchema>;

const createShop = async (payload: CreateShopPayload) => {
  const existingShop = await prisma.shop.findFirst({
    where: { ownerId: payload.ownerId },
  });

  if (existingShop) {
    throw new AppError(409, "User already has a shop");
  }

  return prisma.shop.create({
    data: {
      ownerId: payload.ownerId,
      shopName: payload.shopName,
      shopAddress: payload.shopAddress,
      shopPhone: payload.shopPhone,
      shopEmail: payload.shopEmail,
      shopType: payload.shopType,
    },
  });
};

const findMyShop = async (ownerId: string) => {
  return prisma.shop.findFirst({
    where: { ownerId },
  });
};

const findShopById = async (shopId: string) => {
  const shop = await prisma.shop.findUnique({
    where: { shopId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found");
  }

  return shop;
};

const findAllShop = async () => {
  return prisma.shop.findMany();
};

const updateShop = async (
  shopId: string,
  ownerId: string,
  payload: UpdateShopPayload,
) => {
  const shop = await prisma.shop.findFirst({
    where: { shopId, ownerId },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found or unauthorized");
  }

  return prisma.shop.update({
    where: { shopId },
    data: {
      ...(payload.shopName !== undefined && {
        shopName: payload.shopName,
      }),
      ...(payload.shopAddress !== undefined && {
        shopAddress: payload.shopAddress,
      }),
      ...(payload.shopPhone !== undefined && {
        shopPhone: payload.shopPhone,
      }),
      ...(payload.shopEmail !== undefined && {
        shopEmail: payload.shopEmail,
      }),
      ...(payload.shopType !== undefined && {
        shopType: payload.shopType,
      }),
    },
  });
};

const deleteShop = async (shopId: string, ownerId: string) => {
  const shop = await prisma.shop.findFirst({
    where: {
      id: shopId,
      ownerId,
    },
  });

  if (!shop) {
    throw new AppError(404, "Shop not found or unauthorized");
  }

  return prisma.shop.delete({
    where: { shopId },
  });
};

export const shopServices = {
  createShop,
  findMyShop,
  findShopById,
  findAllShop,
  updateShop,
  deleteShop,
};
