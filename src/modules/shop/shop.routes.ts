import { Router } from "express";
import { shopController } from "./shop.controller";

const router = Router();

router.post("/", shopController.createShop);

export const shopRouter = router;
