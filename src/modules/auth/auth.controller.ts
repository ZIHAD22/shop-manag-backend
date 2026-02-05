import { authServices } from "./auth.services";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const authLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await authServices.authLogin(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login Successfully",
      data: result,
    });
  },
);

export const authController = {
  authLogin,
};
