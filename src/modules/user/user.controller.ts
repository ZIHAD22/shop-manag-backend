import { Request, Response } from "express";
import { shopOwnerServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import bcrypt from "bcryptjs";

export const createShopOwner = catchAsync(
  async (req: Request, res: Response) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

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
