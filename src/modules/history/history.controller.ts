import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { historyServices } from "./history.services";

// Get history by historyId
const getHistoryById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await historyServices.getHistoriesById(id as string);

    sendResponse(res, {
      success: true,
      message: "History retrieved successfully",
      data: result,
    });
  },
);

// Get history by inventoryId
const getHistoryByInventoryId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { inventoryId } = req.params;

    const result = await historyServices.getHistoriesByInventoryId(
      inventoryId as string,
    );

    sendResponse(res, {
      success: true,
      message: "History retrieved successfully",
      data: result,
    });
  },
);

// Get history by productId
const getHistoryByProductId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const result = await historyServices.getHistoriesByProductId(
      productId as string,
    );

    sendResponse(res, {
      success: true,
      message: "History retrieved successfully",
      data: result,
    });
  },
);

// Get history by performer email
const getHistoryByPerformer = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;

    const result = await historyServices.getHistoriesByPerformer(
      email as string,
    );

    sendResponse(res, {
      success: true,
      message: "History retrieved successfully",
      data: result,
    });
  },
);

export const historyController = {
  getHistoryById,
  getHistoryByInventoryId,
  getHistoryByProductId,
  getHistoryByPerformer,
};
