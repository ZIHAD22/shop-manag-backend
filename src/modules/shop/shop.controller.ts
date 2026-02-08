import { Request, Response } from "express";
import { shopServices } from "./shop.services";
import catchAsync from "../../utils/catchAsync";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.createShop({
    ...req.body,
    ownerId: req?.user?.ownerId,
  });

  res.status(201).json({
    success: true,
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.findMyShop(req?.user?.ownerId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getShopById = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;

  const result = await shopServices.findShopById(shopId as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getAllShops = catchAsync(async (_req: Request, res: Response) => {
  const result = await shopServices.findAllShop();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateShop = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;

  const result = await shopServices.updateShop(
    shopId as string,
    req?.user?.ownerId,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;

  await shopServices.deleteShop(shopId as string, req?.user?.ownerId);

  res.status(204).json({
    success: true,
  });
});

export const shopController = {
  createShop,
  getMyShop,
  getShopById,
  getAllShops,
  updateShop,
  deleteShop,
};
