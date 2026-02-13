import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.post(
  "/admin",
  validateRequest(userValidation.createAdminValidation),
  userController.createAdmin,
);

router.post(
  "/shopowner",
  validateRequest(userValidation.createShopOwnerValidation),
  userController.createShopOwner,
);
// MY PROFILE
router.get("/me", auth(Role.OWNER), userController.getMyProfile);

router.patch(
  "/me",
  auth(Role.OWNER),
  validateRequest(userValidation.updateShopOwnerValidation),
  userController.updateMyProfile,
);

router.delete("/me", auth(Role.OWNER), userController.deleteMyAccount);

// ADMIN
router.get("/", auth(Role.ADMIN), userController.getAllShopOwners);

router.get("/:ownerId", auth(Role.ADMIN), userController.getShopOwnerById);

export const userRouter = router;
