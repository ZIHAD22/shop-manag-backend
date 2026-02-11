import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { inventoryServices } from "./inventory.services";
import sendResponse from "../../utils/sendResponse";

const stockOutInventory = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.stockOutInventory(
    {
      ...req.body,
      productId: req.params.productId,
    },
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Stock out successfully",
    data: result,
  });
});

const stockInInventory = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.stockInInventory(
    {
      ...req.body,
      productId: req.params.productId,
    },
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Stock in successfully",
    data: result,
  });
});

const getMyInventories = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.getMyInventories(req?.user?.ownerId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
});

const getInventoryByProduct = catchAsync(
  async (req: Request, res: Response) => {
    const result = await inventoryServices.getInventoryByProductId(
      req?.params?.productId as string,
      req?.user?.ownerId,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Data fetched successfully",
      data: result,
    });
  },
);

const updateInventoryManually = catchAsync(
  async (req: Request, res: Response) => {
    const result = await inventoryServices.updateInventory(
      req.params.inventoryId as string,
      req?.user?.ownerId,
      req.body,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Data updated successfully",
      data: result,
    });
  },
);

const deleteInventory = catchAsync(async (req: Request, res: Response) => {
  const result = await inventoryServices.deleteInventory(
    req.params.inventoryId as string,
    req?.user?.ownerId,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data deleted successfully",
    data: result,
  });
});

export const inventoryController = {
  getMyInventories,
  getInventoryByProduct,
  updateInventoryManually,
  deleteInventory,
  stockOutInventory,
  stockInInventory,
};
