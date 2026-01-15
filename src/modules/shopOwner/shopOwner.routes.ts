import { shopOwnerController } from "./shopOwner.controller";
import { Router } from "express";
const router = Router();

router.post("/", shopOwnerController.createShopOwner);

export const shopOwnerRouter = router;
