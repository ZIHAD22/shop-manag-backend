import { Router } from "express";
import { shopController } from "./shop.controller";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { shopValidation } from "./shop.validation";
import { Role } from "../../generated/prisma/enums";

const router = Router();

// CREATE shop (owner can create only one)
router.post(
  "/",
  auth(Role.OWNER),
  validateRequest(shopValidation.createShopSchema),
  shopController.createShop,
);

// GET my shop (owner)
router.get("/me", auth(Role.OWNER), shopController.getMyShop);

// UPDATE my shop (owner)
router.patch(
  "/:shopId",
  auth(Role.OWNER),
  validateRequest(shopValidation.updateShopSchema),
  shopController.updateShop,
);

// DELETE my shop (admin)
router.delete("/:shopId", auth(Role.ADMIN), shopController.deleteShop);

// GET single shop (admin)
router.get("/:shopId", auth(Role.OWNER), shopController.getShopById);

// GET all shops (admin)
router.get("/", auth(Role.ADMIN), shopController.getAllShops);

export const shopRouter = router;
