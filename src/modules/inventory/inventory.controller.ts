import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { inventoryServices } from "./inventory.services";

const getMyInventories = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.getMyInventories(req?.user?.ownerId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getInventoryByProduct = catchAsync(
  async (req: Request, res: Response) => {
    const result = await inventoryServices.getInventoryByProductId(
      req?.params?.productId as string,
      req?.user?.ownerId,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  },
);

const updateInventory = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.updateInventory(
    req.params.inventoryId as string,
    req?.user?.ownerId,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

const deleteInventory = catchAsync(async (req: Request, res: Response) => {
  await inventoryServices.deleteInventory(
    req.params.inventoryId as string,
    req?.user?.ownerId,
  );

  res.status(204).json({ success: true });
});

export const inventoryController = {
  getMyInventories,
  getInventoryByProduct,
  updateInventory,
  deleteInventory,
};
