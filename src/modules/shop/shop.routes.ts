import { Router } from "express";
import { shopController } from "./shop.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { shopValidation } from "./shop.validation";

const router = Router();

router.post(
  "/",
  auth(Role.OWNER),
  validateRequest(shopValidation.createShopSchema),
  shopController.createShop,
);

export const shopRouter = router;
