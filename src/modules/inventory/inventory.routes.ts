import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { inventoryValidation } from "./inventory.validation";

const router = Router();

// deprecated route
router.post(
  "/",
  auth(Role.OWNER),
  validateRequest(inventoryValidation.createInventorySchema),
  inventoryController.createInventory,
);

export const inventoryRouter = router;
