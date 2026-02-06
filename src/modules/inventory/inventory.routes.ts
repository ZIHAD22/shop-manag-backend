import { Router } from "express";
import { inventoryController } from "./inventory.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post("/", auth(Role.OWNER), inventoryController.createInventory);

export const inventoryRouter = router;
