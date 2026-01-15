import { Request, Response } from "express";
import { shopOwnerServices } from "./shopOwner.services";

export const createShopOwner = async (req: Request, res: Response) => {
  try {
    const createShopOwner = await shopOwnerServices.createShopOwner(req.body);

    return res.status(201).json(createShopOwner);
  } catch (error) {
    console.log(error);
  }
};

export const shopOwnerController = {
  createShopOwner,
};
