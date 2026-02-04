import validateRequest from "../../middlewares/validateRequest";
import { shopOwnerController } from "./user.controller";
import { Router } from "express";
import { shopOwnerValidation } from "./user.validation";
const router = Router();

router.post(
  "/",
  validateRequest(shopOwnerValidation.createShopOwnerValidation),
  shopOwnerController.createShopOwner,
);

export const shopOwnerRouter = router;
