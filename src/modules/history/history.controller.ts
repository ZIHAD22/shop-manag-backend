import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createHistory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("History");
    sendResponse(res, {
      success: true,
      message: "Create History Successfully",
      data: {},
    });
  },
);

export const historyController = {
  createHistory,
};
