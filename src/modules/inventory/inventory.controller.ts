import { Request, Response } from "express";
import { inventoryServices } from "./inventory.services";
import catchAsync from "../../utils/catchAsync";

const createInventory = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.createInventory(req.body);

  res.status(201).json(result);
});

export const inventoryController = {
  createInventory,
};
