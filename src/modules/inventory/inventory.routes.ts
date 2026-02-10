import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";
import validateRequest from "../../middlewares/validateRequest";
import { inventoryValidation } from "./inventory.validation";

const router = Router();

// GET all inventories of my shop
router.get("/", auth(Role.OWNER), inventoryController.getMyInventories);

router.post(
  "/out/product/:productId",
  auth(Role.OWNER),
  inventoryController.stockOutInventory,
);

// GET inventory by product
router.get(
  "/product/:productId",
  auth(Role.OWNER),
  inventoryController.getInventoryByProduct,
);

// UPDATE inventory
router.patch(
  "manually/:inventoryId",
  auth(Role.OWNER),
  validateRequest(inventoryValidation.updateInventorySchema),
  inventoryController.updateInventoryManually,
);

// DELETE inventory
router.delete(
  "/:inventoryId",
  auth(Role.OWNER),
  inventoryController.deleteInventory,
);

export const inventoryRouter = router;
