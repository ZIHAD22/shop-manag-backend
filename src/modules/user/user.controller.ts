import { Request, Response } from "express";
import { shopOwnerServices } from "./user.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import bcrypt from "bcryptjs";

export const createShopOwner = catchAsync(
  async (req: Request, res: Response) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const { result, refreshToken, accessToken } =
      await shopOwnerServices.createShopOwner(req.body);

    res.cookie("accessToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    res.cookie("refreshToken", accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60,
    });

    sendResponse(res, {
      success: true,
      message: "Shop Owner Create Successfully",
      data: result,
    });
  },
);

export const shopOwnerController = {
  createShopOwner,
};
