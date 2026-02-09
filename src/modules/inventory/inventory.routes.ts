import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { inventoryValidation } from "./inventory.validation";

const router = Router();

// GET all inventories of my shop
router.get("/", auth(Role.OWNER), inventoryController.getMyInventories);

// GET inventory by product
router.get(
  "/product/:productId",
  auth(Role.OWNER),
  inventoryController.getInventoryByProduct,
);

// UPDATE inventory
router.patch(
  "/:inventoryId",
  auth(Role.OWNER),
  validateRequest(inventoryValidation.updateInventorySchema),
  inventoryController.updateInventory,
);

// DELETE inventory
router.delete(
  "/:inventoryId",
  auth(Role.OWNER),
  inventoryController.deleteInventory,
);

export const inventoryRouter = router;
