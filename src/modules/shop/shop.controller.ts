import { Request, Response } from "express";
import { shopServices } from "./shop.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.createShop({
    ...req.body,
    ownerId: req?.user?.ownerId,
  });

  console.log(result);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Data created successfully",
    data: result,
  });
});

const getMyShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.findMyShop(req?.user?.ownerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const getShopById = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;

  const result = await shopServices.findShopById(shopId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const getAllShops = catchAsync(async (_req: Request, res: Response) => {
  const result = await shopServices.findAllShop();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data updated successfully",
    data: result,
  });
});

const deleteShop = catchAsync(async (req: Request, res: Response) => {
  const { shopId } = req.params;

  const result = await shopServices.deleteShop(
    shopId as string,
    req?.user?.ownerId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data deleted successfully",
    data: result,
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
