import { Inventory, Prisma } from "@prisma/client";
import prisma from "../../config/db";

const createInventory = async (
  payload: Prisma.InventoryCreateInput
): Promise<Inventory> => {
  const result = await prisma.inventory.create({
    data: payload,
  });

  return result;
};

export const inventoryServices = {
  createInventory,
};
