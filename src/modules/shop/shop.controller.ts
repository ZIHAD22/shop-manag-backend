import { Request, Response } from "express";
import { shopServices } from "./shop.services";
import catchAsync from "../../utils/catchAsync";

const createShop = catchAsync(async (req: Request, res: Response) => {
  const result = await shopServices.createShop({
    ...req.body,
    ownerId: req?.user?.ownerId,
  });

  return res.status(201).json(result);
});

export const shopController = {
  createShop,
};
