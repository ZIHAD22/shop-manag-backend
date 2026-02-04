import { Router } from "express";
import { inventoryController } from "./inventory.controller";

const router = Router();

router.post("/", inventoryController.createInventory);

export const inventoryRouter = router;
