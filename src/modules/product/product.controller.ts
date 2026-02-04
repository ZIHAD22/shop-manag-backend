import { Request, Response } from "express";
import { productServices } from "./product.services";
import catchAsync from "../../utils/catchAsync";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const result = await productServices.createProduct(req.body);
  res.status(201).json(result);
});

export const productController = {
  createProduct,
};
