import { Request, Response } from "express";
import { productServices } from "./product.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProduct(req.body, req?.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data Created successfully",
    data: result,
  });
});

export const productController = {
  createProduct,
};
