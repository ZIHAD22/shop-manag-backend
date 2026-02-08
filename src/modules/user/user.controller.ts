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
      statusCode: 201,
      success: true,
      message: "Shop Owner Create Successfully",
      data: result,
    });
  },
);

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await shopOwnerServices.getMyProfile(req?.user?.ownerId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await shopOwnerServices.updateMyProfile(
    req?.user?.ownerId,
    req.body,
  );

  res.status(200).json({
    success: true,
    data: result,
  });
});

const deleteMyAccount = catchAsync(async (req: Request, res: Response) => {
  await shopOwnerServices.deleteMyAccount(req?.user?.ownerId);

  res.status(204).json({
    success: true,
  });
});

const getAllShopOwners = catchAsync(async (_req: Request, res: Response) => {
  const result = await shopOwnerServices.getAllShopOwners();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getShopOwnerById = catchAsync(async (req: Request, res: Response) => {
  const { ownerId } = req.params;

  const result = await shopOwnerServices.getShopOwnerById(ownerId as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const shopOwnerController = {
  createShopOwner,
  getMyProfile,
  updateMyProfile,
  deleteMyAccount,
  getAllShopOwners,
  getShopOwnerById,
};
