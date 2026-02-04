import { Request, Response } from "express";
import { shopOwnerServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const createShopOwner = catchAsync(
  async (req: Request, res: Response) => {
    console.log(req.body);
    const createShopOwnerData = await shopOwnerServices.createShopOwner(
      req.body,
    );

    sendResponse(res, {
      success: true,
      message: "Shop Owner Create Successfully",
      data: createShopOwnerData,
      // data: {},
    });
  },
);

export const shopOwnerController = {
  createShopOwner,
};
