import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { shopOwnerValidation } from "./user.validation";
import { shopOwnerController } from "./user.controller";
import { Role } from "../../generated/prisma/enums";

const router = Router();
router.post(
  "/",
  validateRequest(shopOwnerValidation.createShopOwnerValidation),
  shopOwnerController.createShopOwner,
);
// MY PROFILE
router.get("/me", auth(Role.OWNER), shopOwnerController.getMyProfile);

router.patch(
  "/me",
  auth(Role.OWNER),
  validateRequest(shopOwnerValidation.updateShopOwnerValidation),
  shopOwnerController.updateMyProfile,
);

router.delete("/me", auth(Role.OWNER), shopOwnerController.deleteMyAccount);

// ADMIN
router.get("/", auth(Role.ADMIN), shopOwnerController.getAllShopOwners);

router.get("/:ownerId", auth(Role.ADMIN), shopOwnerController.getShopOwnerById);

export const shopOwnerRouter = router;
